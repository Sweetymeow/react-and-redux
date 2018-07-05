import React from 'react';
import buildQuery from 'odata-query';
import PropTypes from 'prop-types';
import moment from 'moment';
import { ComposedChart, Area, Line, CartesianGrid, YAxis, XAxis, Tooltip, Legend } from 'recharts';
import TotalSaleData from '../../data/Mock_TotalSale.json';
import CustomizedDot from './CustomizedDot';
import { baseUrl, urlTypes, startDate, endDate } from '../API';
import RenderTooltip from './RenderTooltip';

// Build chart for item
class SumChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: TotalSaleData,
      sumData: TotalSaleData,
      items: [],
      itemNumberList: [],
      chartWidth: 640,
      chartHegith: 420,
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
      chartWidth: window.innerWidth,
      data: this.props.chartData[0].value
    });
    if (!this.props.isTotal) {
      this.updateItemSPChart(this.props.itemNum);
    }
  }
  componentDidUpdate(prevProps) { // prevProps, prevState
    if (!this.props.isTotal) {
      if (prevProps.itemNum !== this.props.itemNum) {
        this.updateItemSPChart(this.props.itemNum);
      }
    }
  }
  getItemQuery() {
    return buildQuery({
      filter: [{
        ITEM_NUM: this.props.itemNum || "36996"
      },
      { LOCATION_NUM: 148 },
      { CALENDAR_DATE: {
        ge: startDate,
        le: endDate }
      }
      ]
    });
  }
  updateItemSPChart(itemId) {
    fetch(`${baseUrl}${urlTypes.predict}${this.getItemQuery(itemId)}`).then(res => res.json()).catch(error => console.error('Error:', error)).then(response => {
      const itemValues = (response ? response.value : "").map((item) => {
        // item.CALENDAR_DATE = moment(item.CALENDAR_DATE).format('ll');
        return { ...item,
          SALES_FORECAST_UP: Number(item.SALES_FORECAST * 0.3).toFixed(2),
          CALENDAR_DATE: moment(item.CALENDAR_DATE).format('ll'),
          SALES_FORECAST: Number(item.SALES_FORECAST).toFixed(2)
        }
      });
      // console.log( 'Success:', response );
      this.setState({
        data: itemValues
      });
      console.log(`Init Query - Item ${itemValues[0].ITEM_NUM} Value:`, itemValues); // ${this.props.itemNum} Value:`, itemValues);
    });
  }
  handleMouseEnter(e) {
    console.log("ON Mouse Enter");
    const { dataKey } = e;
    const { opacity } = this.state;
    this.setState({
      opacity: { ...opacity,
        [dataKey]: 0.5
      }
    });
  }
  handleMouseLeave(e) {
    const {
      dataKey
    } = e;
    const {
      opacity
    } = this.state;
    this.setState({
      opacity: { ...opacity,
        [dataKey]: 1
      }
    });
  }
  render() {
    const { opacity } = this.state;
    return (
      <div className="composedChart-container">
          {/* <h1>{this.props.itemNum}</h1> */}
          <ComposedChart
            width={this.state.chartWidth * 0.8}
            height={this.state.chartHegith}
            data={this.props.chartData || this.state.data}
            margin={{ top: 20, right: 5, left: 5, bottom: 5 }}>
            <XAxis dataKey="SALES_DATE" />
            <YAxis />
            {/* <Tooltip /> */}
            <Tooltip isSumChart={true} content={RenderTooltip} />
            <CartesianGrid stroke="#f5f5f5" />
            <Area type="linear" dataKey={this.props.chartKeys.areaKey} fill="#FFF" stroke="#FFF" stackOffset="none" stackId="1" activeDot={{ r: 0 }} />
            <Area type="linear" dataKey={this.props.chartKeys.areaUpKey} fill="#d4d4d4" stroke="#FFF" stackOffset="none" stackId="1" activeDot={{ r: 0 }} />
            <Line type="linear" dataKey={this.props.chartKeys.saleKey}
              fill="#ff851b" stroke="#ff851b"
              strokeOpacity={opacity.uv} activeDot={{ r: 8 }}
              dot={<CustomizedDot cx={8} cy={8} />} />
            <Line type="linear" dataKey={this.props.chartKeys.forecastKey}
              fill="#444" stroke="#444"
              strokeOpacity={opacity.pv} strokeDasharray="8 8"
              activeDot={{ r: 6 }} />
            <Legend verticalAlign="top" height={36} margin={{ top: 20, left: 5, right: 5, bottom: 5 }} iconType="square"
              onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} />
            {/* content={renderLegend} */}
          </ComposedChart>
      </div>);
  }
}
SumChart.propTypes = {
  // itemsArr: PropTypes.array,
  chartData: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]),
  chartKeys: PropTypes.object,
  isTotal: PropTypes.bool
  // itemNum: PropTypes.string
};

export default SumChart;
