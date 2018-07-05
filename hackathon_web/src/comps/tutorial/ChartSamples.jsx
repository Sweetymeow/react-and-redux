import React from 'react';
// import PropTypes from 'prop-types';
import { LineChart, ComposedChart, Line, Area, Bar, CartesianGrid, YAxis, XAxis, Tooltip, Legend } from 'recharts';
import LineMockData from '../../data/Linkchart_data.json';

const data = [
  { name: 'Page_A', uv: 1000, pv: 2400, amt: 2400, uvError: [75, 20] },
  { name: 'Page_B', uv: 300, pv: 2567, amt: 2400, uvError: [90, 40] },
  { name: 'Page_C', uv: 280, pv: 1398, amt: 2400, uvError: 40 },
  { name: 'Page_D', uv: 200, pv: 3200, amt: 2400, uvError: 20 },
  // { name: 'Page_E', uv: 278, pv: null, amt: 2400, uvError: 28 },
  { name: 'Page_F', uv: 189, pv: 4800, amt: 2400, uvError: [90, 20] },
  { name: 'Page_G', uv: 189, pv: 4000, amt: 2400, uvError: [28, 40] },
  { name: 'Page_H', uv: 189, pv: 1600, amt: 2400, uvError: 28 },
  { name: 'Page_I', uv: 189, pv: 4400, amt: 2400, uvError: 28 },
  { name: 'Page_J', uv: 189, pv: 3780, amt: 2400, uvError: [15, 60] }
];

const data02 = [
  { name: 'Page A', uv: 3100, pv: 2600, amt: 3400 },
  { name: 'Page B', uv: 2400, pv: 4367, amt: 4400 },
  { name: 'Page C', uv: 1300, pv: 1398, amt: 2400 },
  { name: 'Page D', uv: 220, pv: 9800, amt: 1400 },
  { name: 'Page E', uv: 1278, pv: 3908, amt: 2900 },
  { name: 'Page F', uv: 1189, pv: 4800, amt: 2778 },
  { name: 'Page G', uv: 1569, pv: 4800, amt: 1160 }
];

class ChartSamples extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      data_s1: data,
      data_s2: data02,
      data_s3: LineMockData,
      windowWidth: 640,
      windowHeight: 420,
      opacity: {
        uv: 1,
        pv: 1
      }
    };
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  componentWillMount() {
    this.setState({
      windowWidth: window.innerWidth - 40
    })
  }

  handleMouseEnter(e) {
    const { dataKey } = e;
    const { opacity } = this.state;
    this.setState({
      opacity: { ...opacity, [dataKey]: .5 }
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
    <div className="linechart-container">
      <h3>Line Chart Sample</h3>
      <LineChart
          width={this.state.windowWidth}
          height={this.state.windowHeight}
          data={this.state.data_s1}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <Line type="linear" dataKey="uv" stroke="#039BE5" strokeOpacity={opacity.uv} activeDot={{ r: 6 }} />
        <Line type="linear" dataKey="pv" stroke="#FBC02D" strokeOpacity={opacity.pv} />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="name" />
        <YAxis />
        <Legend onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} />
        <Tooltip />
      </LineChart>
      {/* Chart - 2 */}
      <h3>Composed Chart Sample</h3>
      <ComposedChart
        width={this.state.windowWidth}
        height={this.state.windowHeight}
        data={this.state.data_s2}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid stroke="#f5f5f5" />
        <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" />
        <Bar dataKey="pv" barSize={20} fill="#413ea0" />
        <Line type="monotone" dataKey="uv" stroke="#ff7300" />
      </ComposedChart>
    </div>);
  }
}

export default ChartSamples;
