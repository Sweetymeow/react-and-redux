export const estimateLevel = {
  OVER_EST: 1,
  RIGHT_EST: 0,
  UNDER_EST: -1
};

export const getFlagText = ( flagVal ) => {
  if ( flagVal === 1 ) {
    return "Over Estimated";
  } else if ( flagVal === -1 ) {
    return " Under Estimated";
  }
  return "Good Job!!";
};

export const displayTitle = {
  TOTAL_FORECAST_REVENUE_UP: 'Forecast Revenue 30% Area',
  TOTAL_FORECAST_REVENUE: 'Forecast Revenue ',
  TOTAL_SALE_REVENUE: 'Sale Revenue ',
  SALES_FORECAST: 'Forecast Revenue ',
  UNIT_SALES: 'Sale Revenue '
};
export const itemKeyColor = {
  TOTAL_FORECAST_REVENUE: '#ff851b',
  TOTAL_SALE_REVENUE: '#444',
  SALES_FORECAST: '#ff851b',
  UNIT_SALES: '#444'
};