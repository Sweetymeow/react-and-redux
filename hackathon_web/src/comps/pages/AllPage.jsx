import React from 'react';
import buildQuery from 'odata-query';
import moment from 'moment';
// import PropTypes from 'prop-types';
import {
  Grid,
  Header,
  Segment,
  Dropdown
} from 'semantic-ui-react';
import SumChart from '../charts/SumChart';
import './AllPage.css';
import RightHeader from '../RightHeader';
import GetAPI from '../API';
import LineMockData from '../../data/Mock_Sales_36996.json';
import sections from '../../data/sections.json';
import warehouses from '../../data/warehouse.json';

const totalUrl = 'https://odata-v4.cfapps.sap.hana.ondemand.com/java/odata/v4/bakery_sales/overview_sales_forecast?$apply=compute(AVG_PRICE%20mul%20SALES_FORECAST%20as%20FORECAST_REVENUE)/groupby((LOCATION_NUM,SALES_DATE),aggregate(TOTAL_REVENUE%20with%20sum%20as%20TOTAL_SALE_REVENUE,FORECAST_REVENUE%20with%20sum%20as%20TOTAL_FORECAST_REVENUE))';
const startDate = moment().subtract( 40, 'days' ).format( 'YYYY-MM-DD' );
const query = buildQuery( {
  filter: [{
    LOCATION_NUM: 148,
    SALES_DATE: {
      ge: startDate
    }
  }]
} );
const getAPI = new GetAPI();

class AllPage extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      data: LineMockData,
      itemList: [],
      avgDayMape: 0,
      avgWeekMape: 0,
      chartKeys: {
        xAxisKey: "SALES_DATE",
        areaUpKey: 'TOTAL_FORECAST_REVENUE_UP', // 'TOTAL_SALE_REVENUE_UP',
        areaKey: 'TOTAL_FORECAST_REVENUE', // 'TOTAL_SALE_REVENUE',
        saleKey: 'TOTAL_SALE_REVENUE',
        forecastKey: 'TOTAL_FORECAST_REVENUE' // areaKey
      }
    };
    this.udpateOverviewData = this.udpateOverviewData.bind( this );
    this.getAveMape = this.getAveMape.bind( this );
    this.getAverageMape = this.getAverageMape.bind( this );
  }
  componentWillMount() {
    this.setState( {
      windowWidth: window.innerWidth
    } );
    this.udpateOverviewData();
    this.getAverageMape();
    // this.getAveMape();
  }
  componentDidMount() {
    // fetch( `${baseUrl}${urlTypes.predict}${query}` )
  }
  getAveMape() {
    getAPI.getItemMAPE()
      .then( res => res.json() )
      .catch( error => console.error( 'Error:', error ) )
      .then( response => {
        const resVal = response ? response.value : [];
        console.log( resVal );
        let totalDayMape = 0;
        let totalWeekMape = 0;
        resVal.onEach( item => {
          totalDayMape += item.MAPE;
          totalWeekMape += item.WEEKLY_MAPE;
        } );
        this.setState( {
          avgDayMape: Number( totalDayMape / resVal.length ).toFixed( 2 ),
          avgWeekMape: Number( totalWeekMape / resVal.length ).toFixed( 2 )
        } )
      } );
  }
  getAverageMape() {
    getAPI.getItemListPromise()
      .then( response => {
        return response.value;
      }, error => {
        console.log( 'getAveMapePromise:', error );
      } )
      .then( itemlist =>
        new Promise( resolve => getAPI.getItemMAPEPromise( resolve )
          .then( response => {
            const resVal = response ? response.value : [];
            let totalDayMape = 0;
            let totalWeekMape = 0;
            const itemNumberList = itemlist.map( item => item.ITEM_NUM );
            const filtedItems = resVal.filter( item => itemNumberList.includes( item.ITEM_NUM ) );
            filtedItems.forEach( item => {
              totalDayMape += item.MAPE;
              totalWeekMape += item.WEEKLY_MAPE;
            } );
            // console.log( `ItemList has #: ${itemNumberList.length}`, filtedItems );
            this.setState( {
              avgDayMape: Number( totalDayMape / resVal.length ).toFixed( 2 ),
              avgWeekMape: Number( totalWeekMape / resVal.length ).toFixed( 2 ),
              itemList: itemNumberList
            } );
          }, error => {
            console.log( 'getAveMapePromise:', error );
          } ) ) )
      .then( (value) => {
        console.log("THEN:", value);
        this.udpateOverviewData();
      } ); // getAPI.getItemListPromise().then().then().then();
  }

  udpateOverviewData() {
    const subQuery = encodeURI( query.substring( 2, 8 ) + query.substring( 9 ) ).replace( /'/g, "" );
    fetch( `${totalUrl}/${subQuery}` )
      .then( res => res.json() )
      .catch( error => console.error( 'Error:', error ) )
      .then( response => {
        const itemValues = ( response ? response.value : "" ).map( ( item ) => (
          { ...item,
            [this.state.chartKeys.areaUpKey]: item[this.state.chartKeys.areaKey] * 0.3,
            [this.state.chartKeys.saleKey]: getAPI.roundNumber( item[this.state.chartKeys.saleKey] ),
            [this.state.chartKeys.forecastKey]: getAPI.roundNumber( item[this.state.chartKeys.forecastKey] )
          } ) );
        this.setState( {
          data: getAPI.sortByDate( itemValues )
        } );
        // console.log( 'Overview - Item Values:', itemValues );
      } );
  }
  render() {
    return (
    <div className="rightContainer">
      <RightHeader sectionType={sections.overview} />
      <Segment attached="top" className="kpisContainer noLBorder">
        <Header className="overallKpi" textAlign="left">
          <Header.Content as="h3" className="overallKpiTitle">Overall Forecast {' '}</Header.Content>
          <Header.Content>
            <Dropdown as="h4" className="overallKpiWH" inline options={warehouses} defaultValue={warehouses[0].value}/>
          </Header.Content>
        </Header>
        <Grid>
          <Grid.Row columns={4}>
            <Grid.Column>
              <Header className="overallKpis" as="h1" inverted color={this.state.avgDayMape > 20 ? 'orange' : 'green'}>
                {this.state.avgDayMape}
              </Header>
              <p>YESTERDAY MAPE</p>
            </Grid.Column>
            <Grid.Column>
              <Header className="overallKpis" as="h1" inverted
                color={this.state.avgWeekMape > 20 ? 'orange' : 'green'}>
                {this.state.avgWeekMape}
              </Header>
              <p>WEEKLY MAPE</p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>

      <div className="linechart-container">
        <SumChart chartData={this.state.data} itemsArr={this.state.itemList} isTotal chartKeys={this.state.chartKeys} />
      </div>
    </div> );
  }
}
export default AllPage;
