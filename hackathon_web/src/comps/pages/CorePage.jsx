import React from 'react';
// import buildQuery from 'odata-query';
// import PropTypes from 'prop-types';
import { Grid, Header, Segment, Image, Button, Dropdown, Label } from 'semantic-ui-react';
// import { ComposedChart, Area, Line, CartesianGrid, YAxis, XAxis, Tooltip, Legend } from 'recharts';
import SumChart from '../charts/SumChart';
import './AllPage.css';
import RightHeader from '../RightHeader';
import GetAPI from '../API';
import pie from '../../img/pieBg@2x.png';
import croissant from '../../img/croissantBg@2x.png';
import cookie from '../../img/cookieBg@2x.png';
import LineMockData from '../../data/Mock_Sales_36996.json';
import sections from '../../data/sections.json';
import itemListBK from '../../data/itemList.json';

const getAPI = new GetAPI();
const itemImgs = [pie, croissant, cookie];

class CorePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: LineMockData,
      coreItems: [],
      coreItemNames: [],
      fullItems: [],
      isShow: false,
      defaultListMax: 2,
      options: [],
      isUpdated: false,
      chartKeys: {
        xAxisKey: "SALES_DATE",
        areaUpKey: 'TOTAL_FORECAST_REVENUE_UP',
        areaKey: 'TOTAL_FORECAST_REVENUE',
        saleKey: 'TOTAL_SALE_REVENUE',
        forecastKey: 'TOTAL_FORECAST_REVENUE' // areaKey
      }
    };
    this.udpateChartData = this.udpateChartData.bind(this);
    this.eachItem = this.eachItem.bind(this);
    this.getNewItem = this.getNewItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.handleDropdownDisplay = this.handleDropdownDisplay.bind(this);
  }
  /* --------- Lifecycle: Get list and coreitem's data from API.js ---------- */
  componentWillMount() {
    this.setState({
      windowWidth: window.innerWidth - 40
    });
    getAPI.getItemListPromise()
      .then(response => {
        return response.value || itemListBK.value;
      }, error => {
        console.log('getAveMapePromise:', error);
      })
      .then(itemlist =>
        new Promise(resolve => getAPI.getItemMAPEPromise(resolve)
          .then(response => {
            const resVal = response ? response.value : [];
            const itemNumberList = itemlist.map(item => item.ITEM_NUM);
            const filtedItems = resVal.filter(item => itemNumberList.includes(item.ITEM_NUM));
            // console.log( `ItemList has #: ${itemNumberList.length}`, filtedItems );

            const roundItemList = filtedItems.map((item) => {
              return { ...item,
                MAPE: getAPI.roundNumber(item.MAPE),
                imgID: getAPI.getRandomInt(3)
              };
            });
            const coreItemList = roundItemList.slice(0, this.state.defaultListMax);
            // this.udpateChartData();
            /* ----------- Udpate ITEM LIST for options ----------- */
            const itemList = filtedItems.filter(item => itemNumberList.includes(item.ITEM_NUM));
            const _options = itemList.map(item => ({
              key: item.ITEM_NUM,
              text: item.DESCRIPTION,
              value: item.ITEM_NUM
            }));
            this.setState({
              fullItems: roundItemList,
              coreItems: coreItemList,
              coreItemNames: coreItemList.map(item => item.ITEM_NUM),
              isUpdated: true,
              options: _options
            });
          }))); // .then()
  }
  componentDidMount() {}
  /* --------- Lifecycle: Get list and coreitem's data from API.js ---------- */
  componentDidUpdate() { // prevProps, prevState
    if (this.state.isUpdated) {
      this.udpateChartData();
      // this.setState( {
      //   isUpdated: false
      // } );
    }
  }
  getNewItem(e, { value }) {
    const newItem = this.state.fullItems.filter(item => item.ITEM_NUM === value)[0];
    if (newItem) { // newItem.length > 0
      this.setState(preState => ({
        isUpdated: true,
        coreItems: [...preState.coreItems, newItem],
        coreItemNames: [...preState.coreItemNames, newItem.ITEM_NUM]
      }));
    } else {
      console.log("getNewItem - NO Data:", newItem);
    }
    console.log(`getNewItem - ${this.state.isUpdated} - newItem ${newItem.ITEM_NUM}: `, this.state.coreItems);
    this.udpateChartData();
    this.handleDropdownDisplay(); // Hide Dropdown Selection
  }
  removeItem(e, { index }) {
    const newItem = this.state.coreItems.filter(item => item.ITEM_NUM !== index);
    const newNames = this.state.coreItemNames.filter(id => id !== index);
    this.setState({
      coreItems: newItem,
      coreItemNames: newNames,
      isUpdated: true
    });
  }
  udpateChartData() {
    getAPI.getCoreChartVal(this.state.coreItemNames, '2018-01-15', '2018-02-15')
      .then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
        const upChartData = getAPI.insertUPValue(response.value, 'TOTAL_FORECAST_REVENUE', 0.3);
        const sortedData = getAPI.sortByDate(upChartData);
        this.setState({
          data: sortedData,
          isUpdated: false
        });
      });
  }
  eachItem(items, i) {
    return (
      <Grid.Column key={i}>
        <Label circular color='teal' index={items.ITEM_NUM} floating onClick={this.removeItem}>x</Label>
        <Image circular src={itemImgs[items.imgID]} size='tiny' />
        <p className="itemImageTag">{items.MAPE}</p>
        <p className="itemImageTagUnit">YDA MAPE</p>
        <p className="itemImageName">{items.DESCRIPTION}</p>
        {/* <Button size="huge" circular color='orange' icon='add'>{items.MAPE} MAPE</Button> */}
      </Grid.Column>
    );
  }
  handleDropdownDisplay() {
    return this.setState({
      isShow: !this.state.isShow
    });
  }
  render() {
    const { itemList, coreItems } = this.state;
    return (
      <div className="rightContainer">
      <RightHeader sectionType={sections.core} itemNumber={this.state.coreItemNames.length} />

      <Segment attached="top" className="corelistSection">
        <Header className="overallKpi" textAlign="left">
          <Header.Content as="h3" className="overallKpiTitle">Followed core items({coreItems.length})</Header.Content>
        </Header>
        <Grid>
          <Grid.Row columns={10} className="itemSelectionHeader">
            <Grid.Column>
              <Button className="itemSeleAddBtn" size="huge"
                onClick={this.handleDropdownDisplay}
                circular color='teal' icon='add' />
            </Grid.Column>
            {this.state.coreItems.map( this.eachItem )}
          </Grid.Row>
        </Grid>
        { this.state.isShow ?
          <Dropdown placeholder="Add Core Item" open fluid search
            selection value={itemList} options={this.state.options}
            onChange={this.getNewItem} /> : null}
        {/* <Dropdown placeholder='Skills' fluid multiple selection options={this.state.options} /> */}
      </Segment>

      <div className="linechart-container">
        <SumChart chartData={this.state.data}
            itemsArr={this.state.coreItems}
            isTotal={false}
            chartKeys={this.state.chartKeys} />
      </div>
    </div>);
  }
}
export default CorePage;
