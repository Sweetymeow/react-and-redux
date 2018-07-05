import React from 'react';
import buildQuery from 'odata-query';
import PropTypes from 'prop-types';
import moment from 'moment';
import { ComposedChart, Area, Line, CartesianGrid, YAxis, XAxis, Tooltip, Legend } from 'recharts';
import LineMockData from '../../data/Mock_Sales_36996.json';
import RenderTooltip from './RenderTooltip';

const baseUrl = 'https://odata-v4.cfapps.sap.hana.ondemand.com/java/odata/v4/bakery_sales/';
const urlTypes = {
  sales: 'sales',
  items: 'item_list',
  predict: 'prediction_metrics'
};
const startDate = new Date(Date.UTC(2018, 0, 25)); // 2017.12.01
// const endDate = new Date( 2018, 1, 11 ); // 2018.02.28

// Build chart for item
class ItemChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: LineMockData,
      windowWidth: 640,
      windowHeight: 420,
      opacity: {
        uv: 1,
        pv: 1
      }
    };
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.getItemQuery = this.getItemQuery.bind(this);
    this.updateItemSPChart = this.updateItemSPChart.bind(this);
  }
  componentWillMount() {
    this.setState({
      windowWidth: window.innerWidth
    });
    this.updateItemSPChart(this.props.itemNum);
  }
  // componentDidMount() {
  //   this.updateItemSPChart( this.props.itemNum );
  // }
  componentDidUpdate(prevProps) { // prevProps, prevState
    if (prevProps.itemNum !== this.props.itemNum) {
      this.updateItemSPChart(this.props.itemNum);
    }
  }
  getItemQuery() {
    return buildQuery({
      filter: [
        { ITEM_NUM: this.props.itemNum || "36996" },
        { LOCATION_NUM: 148 },
        {
          CALENDAR_DATE: {
            ge: startDate // ,le: endDate
          }
        }
      ]
    });
  }
  updateItemSPChart(itemId) {
    fetch(`${baseUrl}${urlTypes.predict}${this.getItemQuery(itemId)}`)
      .then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
        const itemValues = (response ? response.value : "").map((item) => {
          // item.CALENDAR_DATE = moment(item.CALENDAR_DATE).format('ll');
          return { ...item,
            SALES_FORECAST_UP: Number(item.SALES_FORECAST * 0.3).toFixed(2),
            CALENDAR_DATE: moment(item.CALENDAR_DATE).format('ll'),
            SALES_FORECAST: Number(item.SALES_FORECAST).toFixed(2)
          };
        });
        // console.log( 'Success:', response );
        this.setState({
          data: itemValues
        });
        // console.log( `Init Query - Item ${this.props.itemNum} Value:`, itemValues );
      });
  }
  handleMouseEnter(e) {
    console.log("ON Mouse Enter");
    const { dataKey } = e;
    const { opacity } = this.state;
    this.setState({
      opacity: { ...opacity, [dataKey]: 0.5 }
    });
  }
  handleMouseLeave(e) {
    const { dataKey } = e;
    const { opacity } = this.state;
    this.setState({
      opacity: { ...opacity, [dataKey]: 1 }
    });
  }
  render() {
    const { opacity } = this.state;
    return (
      <div className="composedChart-container">
          {/* <h1>{this.props.itemNum}</h1> */}
          <ComposedChart
            width={this.state.windowWidth * 0.56}
            height={this.state.windowHeight}
            data={this.state.data}
            margin={{ top: 20, right: 5, left: 5, bottom: 5 }}>
            <XAxis dataKey="CALENDAR_DATE" />
            <YAxis />
            <Tooltip isSumChart={false} content={RenderTooltip} />
            <CartesianGrid stroke="#f5f5f5" />
            <Area type="linear" dataKey={this.props.chartKeys.areaKey || "SALES_FORECAST"} fill="#FFF" stroke="#FFF" stackOffset="none" stackId="1" activeDot={{ r: 0 }} />
            <Area type="linear" dataKey={this.props.chartKeys.areaUpKey || "SALES_FORECAST_UP"} fill="#d4d4d4" stroke="#FFF" stackOffset="none" stackId="1" activeDot={{ r: 0 }} />
            <Line type="linear" dataKey={this.props.chartKeys.saleKey || "UNIT_SALES"}
              fill="#ff851b" stroke="#ff851b" strokeOpacity={opacity.uv} strokeDasharray="8 8" activeDot={{ r: 8 }} />
            {/* <Line dot={<CustomizedDot />} <LabelList dataKey="UNIT_SALES" position="top" /> */}
            <Line type="linear" dataKey={this.props.chartKeys.forecastKey || "SALES_FORECAST"} fill="#444" stroke="#444" strokeOpacity={opacity.pv} strokeDasharray="8 8" activeDot={{ r: 6 }} />
            <Legend verticalAlign="top" height={36} margin={{ top: 20, left: 5, right: 5, bottom: 5 }} iconType="square" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}/>
          </ComposedChart>
      </div>);
  }
}

ItemChart.propTypes = {
  // chartData: PropTypes.oneOfType([
  //   PropTypes.array,
  //   PropTypes.object
  // ]),
  itemNum: PropTypes.string,
  chartKeys: PropTypes.object
};

export default ItemChart;
