import React from 'react';
import PropTypes from 'prop-types';
import { estimateLevel, getFlagText, displayTitle, itemKeyColor } from './chartVars';

// const RenderTooltip = React.createClass({
//   render () {
//     return (
//
//     )
//   }
// })

const getChartFlag = (payload, isSumChart) => {
  if (payload) {
    const saleVal = Number(payload[isSumChart ? 'TOTAL_SALE_REVENUE' : 'UNIT_SALES']);
    const foreUp = Number(payload[isSumChart ? 'TOTAL_FORECAST_REVENUE_UP' : 'SALES_FORECAST_UP']);
    const foreVal = Number(payload[isSumChart ? 'TOTAL_FORECAST_REVENUE' : 'SALES_FORECAST']);
    // console.log(`Sale: ${saleVal}; Fore: ${foreVal}; ForeUP: ${foreUp}`);
    if (saleVal > foreUp + foreVal) {
      return estimateLevel.OVER_EST;
    } else if (saleVal <= foreUp + foreVal && saleVal >= foreVal) {
      return estimateLevel.RIGHT_EST;
    }
    return estimateLevel.UNDER_EST;
    // return saleVal < foreUp + foreVal && saleVal > foreVal;
  }
  return null;
};

const RenderTooltip = (props) => {
  const { active } = props;
  if (active) {
    const { payload, isSumChart } = props;
    const flagVal = getChartFlag(props.payload[0] ? props.payload[0].payload : null, isSumChart);
    const flagStyle = {
      color: flagVal ? 'red' : 'green'
    };

    return (
      <div className="sumchart-tooltip-wrapper">
        <h4 className="sumchart-tooltip-title">{props.label}</h4>
        <h3 style={flagStyle}> {getFlagText(flagVal)}</h3>
        <ul className="sumchart-tooltip-list">{ payload.map((entry, index) => (index > 1 ? <li key={`item-${index}`}>
                <span className="sumchart-item-key"
                      style={{ color: itemKeyColor[entry.dataKey] }}>{displayTitle[entry.dataKey]}
                </span> $ {entry.value ? Number(entry.value).toFixed(2) : '' }
            </li> : null
          ))}
        </ul>
      </div>);
  }
  return (null);
};

RenderTooltip.propTypes = {
  payload: PropTypes.object,
  label: PropTypes.string,
  isSumChart: PropTypes.bool,
  active: PropTypes.bool
};

export default RenderTooltip;
