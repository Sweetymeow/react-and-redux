import React from 'react';
import PropTypes from 'prop-types';
// import buildQuery from 'odata-query';
import moment from 'moment';
import { Icon, Table, Grid, Header, Segment, Image, Dropdown } from 'semantic-ui-react';
import ProdSales from '../../data/MOCKDATA_DAYSALE.json';
import GetAPI from '../API';
import './AllPage.css';
import ItemChart from '../charts/ItemChart';
import RightHeader from '../RightHeader';
import pie from '../../img/pieBg@2x.png';
import croissant from '../../img/croissantBg@2x.png';
import cookie from '../../img/cookieBg@2x.png';
import itemlistSample from '../../data/itemList_Sample.json';
import sections from '../../data/sections.json';
import itemListBK from '../../data/itemList.json';

const itemImgs = [pie, croissant, cookie];
const getAPI = new GetAPI();

class IndividualPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItemNum: itemlistSample.value[0].ITEM_NUM || "33336",
      prodSalesData: props.salesData || ProdSales,
      itemData: itemlistSample.value[0],
      currentItemIndex: 0,
      tableStyle: {
        tableTitle: 'Product Sales Revenue',
        columnNum: 2,
        celled: false,
        striped: true
      },
      cellStyle: {
        collapsing: true,
        textAlign: 'left',
        textAlignLast: 'center'
      },
      chartKeys: {
        xAxisKey: "SALES_DATE",
        areaUpKey: 'SALES_FORECAST_UP',
        areaKey: 'SALES_FORECAST',
        saleKey: 'UNIT_SALES',
        forecastKey: 'SALES_FORECAST' // areaKey
      },
      options: [{
        key: 1, text: "by Name", value: "name"
      }, {
        key: 2, text: "by Mape", value: "mape"
      }],
      sortMethod: ""
    }
    this.eachRow = this.eachRow.bind(this);
    this.clickTableRow = this.clickTableRow.bind(this);
    // this.getItemQuery = this.getItemQuery.bind( this );
    this.getDropdown = this.getDropdown.bind(this);
    this.sortProdList = this.sortProdList.bind(this);
    this.updateMAPENumber = this.updateMAPENumber.bind(this);
  }
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
            const itemNumlist = itemlist.map(item => Number(item.ITEM_NUM));
            const yesterdayData = (response ? response.value : "")
              .map(item => ({ ...item,
                ImgID: getAPI.getRandomInt(3),
                CALENDAR_DATE: moment(item.CALENDAR_DATE).format('ll')
              }))
              .filter(item => itemNumlist.includes(Number(item.ITEM_NUM)));
            // console.log( `yesterday's data: (${yesterdayData.length}): `, yesterdayData );
            this.setState({
              prodSalesData: yesterdayData,
              selectedItemNum: yesterdayData.length > 0 ? yesterdayData[0].ITEM_NUM : "",
              itemData: this.updateMAPENumber(yesterdayData[0])
            });
          })));
  }
  componentDidMount() {}
  componentDidUpdate() {
    console.log(`AFTER CLICK Row - (${this.state.selectedItemNum}) get Data: `, this.state.itemData);
  }
  getDropdown() {
    const { sortMethod } = this.state;
    return (
      <Dropdown text="Sort" direction="left" value={sortMethod}
        options={this.state.options} onChange={this.sortProdList} >
        {/* onChange={( e, { value } ) => this.sortProdList( { value } )} */}
      </Dropdown>
    );
  }
  sortProdList(e, { value }) {
    const newList = this.state.prodSalesData.sort((a, b) => {
      return a.MAPE - b.MAPE;
    });
    console.log("Sorted newList: ", newList, value);
    this.setState({
      sortMethod: value,
      prodSalesData: newList
    });
  }
  clickTableRow(itemId, e, index) {
    const newItem = this.state.prodSalesData.filter(item => item.ITEM_NUM === itemId)[0];
    this.setState({
      selectedItemNum: itemId,
      itemData: this.updateMAPENumber(newItem),
      currentItemIndex: index
    });
  }
  updateMAPENumber(newItem) {
    return { ...newItem,
      MAPE: Number(newItem.MAPE).toFixed(2),
      WEEKLY_MAPE: Number(newItem.WEEKLY_MAPE).toFixed(2)
    }
  }
  eachRow(row, i) {
    // const rowID = `rowIdex_${i}`;
    const mapeVal = Number(row.MAPE).toFixed(2);
    return (
      <Table.Row key={i} id={row.ITEM_NUM} warning={i === this.state.currentItemIndex}
        onClick={( e ) => this.clickTableRow( row.ITEM_NUM, e, i )} >
        <Table.Cell collapsing={this.state.cellStyle.collapsing}>
          <Image className="tableItemImg" src={itemImgs[row.ImgID]} size="tiny" />
        </Table.Cell>
        <Table.Cell textAlign={this.state.cellStyle.textAlign}>{row.DESCRIPTION}</Table.Cell>
        <Table.Cell textAlign={this.state.cellStyle.textAlignLast}>
          <Header size="tiny" color={row.WITHIN_RANGE ? "green" : "red"}>
            {mapeVal}
            <Header.Subheader className="prodListSubLabel">YDA MAPE</Header.Subheader>
          </Header>
        </Table.Cell>
        {/* <Table.Cell collapsing={this.state.cellStyle.collapsing} textAlign='right'>{row.REVENUE_LAST}</Table.Cell> */}
      </Table.Row>);
  }
  render() {
    const curItemData = this.state.itemData || {};
    return (
      <div className="twoColContainer">
        <RightHeader sectionType={sections.list} itemNumber={this.state.prodSalesData.length} />

        <Grid>
          {/* ----Item List Section---- */}
          <Grid.Row columns={2} className="itemListSection">
            <Grid.Column width={5}>
              <Table className="itemList" selectable
                celled={this.state.tableStyle.celled}
                striped={this.state.tableStyle.striped}>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell colSpan={this.state.tableStyle.columnNum}>
                      {this.state.tableStyle.tableTitle}({this.state.prodSalesData.length})
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                      {this.getDropdown()}
                      {/* <DropdownExampleDropdown /> */}
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {this.state.prodSalesData.map( this.eachRow )}
                </Table.Body>
              </Table>
            </Grid.Column>
            {/* ----Item Chart Section---- */}
            <Grid.Column width={11} className="itemDetailSection">
               <Segment attached="top" className="overallKpi" id="itemSectionBg" inverted>
                 <Header textAlign="left">
                   <Header.Content as="h1" className="overallKpiTitle" >Forecast Detials - {curItemData.DESCRIPTION}</Header.Content>
                 </Header>
                 <Header as="h4" textAlign="left">
                   <Header.Content className="overallKpiIcon"><Icon name="heart"/>Core</Header.Content>
                   <Header.Content className="overallKpiIcon">|</Header.Content>
                   <Header.Content className="overallKpiIcon"><Icon name="trophy"/>Promotion</Header.Content>
                 </Header>
               </Segment>
               <div className="itemKPIContainer">
                 <Header as='h2' icon color={curItemData.WITHIN_RANGE ? "green" : "red"}>
                   {curItemData.MAPE}
                   <Header.Subheader> YESTERDAY MAPE </Header.Subheader>
                 </Header>
                 <Header as='h2' icon color={curItemData.WEEKLY_MAPE > 30 ? "red" : "green"}>
                   {curItemData.WEEKLY_MAPE}
                   <Header.Subheader> WEEKLY MAPE </Header.Subheader>
                 </Header>
               </div>
                <div className="itemChartContainer">
                  <ItemChart itemNum={this.state.selectedItemNum}
                    chartKeys={this.state.chartKeys} />
                  {/* <ItemChart chartData={this.state.data} /> */}
                </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>);
  }
}
IndividualPage.propTypes = {
  salesData: PropTypes.array || []
}
export default IndividualPage;
