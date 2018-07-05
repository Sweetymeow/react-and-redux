import buildQuery from 'odata-query';
// import moment from 'moment';
// import itemList_Sample from '../data/itemList_Sample.json';

export const baseUrl = 'https://odata-v4.cfapps.sap.hana.ondemand.com/java/odata/v4/bakery_sales/';
/*  https://odata-v4.cfapps.sap.hana.ondemand.com/java/odata/v4/bakery_sales/overview_sales_forecast_core?$apply=filter(ITEM_NUM eq '14510' or ITEM_NUM eq '18763')/compute(AVG_PRICE mul SALES_FORECAST as FORECAST_REVENUE)/groupby((LOCATION_NUM,SALES_DATE),aggregate(TOTAL_REVENUE with sum as TOTAL_SALE_REVENUE,FORECAST_REVENUE with sum as TOTAL_FORECAST_REVENUE))/filter(LOCATION_NUM eq 148 and SALES_DATE ge 2018-01-15 and SALES_DATE le 2018-02-15)
 */
// const subName = '/compute(AVG_PRICE mul SALES_FORECAST as FORECAST_REVENUE)/groupby((LOCATION_NUM,SALES_DATE),aggregate(TOTAL_REVENUE with sum as TOTAL_SALE_REVENUE,FORECAST_REVENUE with sum as TOTAL_FORECAST_REVENUE))/';
export const urlTypes = {
  sales: 'sales',
  items: 'item_list',
  predict: 'prediction_metrics',
  core: 'overview_sales_forecast_core'
};
export const startDate = new Date(Date.UTC(2018, 0, 5)); // 2017.12.01
export const endDate = new Date(Date.UTC(2018, 1, 10, 8));

const rabbitMGUrl = {
  host: 'https://rabbitmqspringintegration.cfapps.sap.hana.ondemand.com/',
  testGenSub: 'calculateDifference',
  getMessageSub: 'getAlertMessage'
};

const query = buildQuery({
  filter: [
    { ITEM_NUM: "36996" },
    { LOCATION_NUM: 148 },
    {
      CALENDAR_DATE: {
        ge: startDate
        // ,le: endDate
      }
    }
  ]
});

const yesterdayQuery = buildQuery({
  filter: [{
    CALENDAR_DATE: {
      eq: endDate
    }
  }]
});


class GetAPI {
  _getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  roundNumber(num) {
    return num ? Number(num).toFixed(2) : null;
  }

  insertUPValue(data, key, upRate) {
    const newData = data.map(item => ({
      ...item,
      [key + '_UP']: Number(upRate * item[key]).toFixed(2)
    }));
    return newData;
  }

  sortByDate(data) {
    data.sort((a, b) => new Date(a.SALES_DATE) - new Date(b.SALES_DATE));
    return data;
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  getQuery() {
    return buildQuery({ query });
  }

  getItemList() {
    return fetch(`${baseUrl}${urlTypes.items}`);
  }
  getItemListPromise() {
    return new Promise((resolve, reject) => {
      fetch(`${baseUrl}${urlTypes.items}`)
        .then(res => res.json())
        .catch(error => reject(error))
        .then(response => {
          resolve(response);
        });
    });
  }
  testCreateMessage() {
    return fetch(`${rabbitMGUrl.host}${rabbitMGUrl.testGenSub}`);
  }
  getMQMessagePromise() {
    return new Promise((resolve, reject) => {
      fetch(`${rabbitMGUrl.host}${rabbitMGUrl.getMessageSub}`)
        .then(res => res.json())
        .catch(error => reject(error))
        .then(response => {
          resolve(response);
        }, error => {
          reject(error);
        });
    });
  }

  getItemMAPE() {
    return fetch(`${baseUrl}${urlTypes.predict}${yesterdayQuery}`);
  }
  getItemMAPEPromise() {
    return new Promise((resolve, reject) => {
      fetch(`${baseUrl}${urlTypes.predict}${yesterdayQuery}`)
        .then(res => res.json())
        .catch(error => reject(error))
        .then(response => {
          resolve(response);
        });
    });
  }

  getCoreChartURL(itemsList, startFDate, endFDate) {
    // [ 917782, 24311, 31865, 64949, 37220 ];
    const locationNum = 148;
    // const startDate = '2018-01-15';
    // const endDate = '2018-02-15';
    const baseURL = "https://odata-v4.cfapps.sap.hana.ondemand.com/java/odata/v4/bakery_sales/overview_sales_forecast?$apply=";
    const queryString = "compute(AVG_PRICE mul SALES_FORECAST as FORECAST_REVENUE)/groupby((LOCATION_NUM,SALES_DATE),aggregate(TOTAL_REVENUE with sum as TOTAL_SALE_REVENUE,FORECAST_REVENUE with sum as TOTAL_FORECAST_REVENUE))/filter(";
    const filterString = `LOCATION_NUM eq ${locationNum} and SALES_DATE ge ${startFDate}`; // and SALES_DATE le ${endFDate}
    const endString = ")";

    const filterList = itemsList.map(item => `ITEM_NUM eq '${item}'`);

    const itemFilter = `filter(${filterList.join(" or ")})/`;

    var wholeString = baseURL + itemFilter + queryString + filterString + endString;
    // console.log( wholeString );
    // console.log( itemFilter );
    return wholeString;
  }
  getCoreChartVal(itemsList, startFDate, endFDate) {
    return fetch(this.getCoreChartURL(itemsList, startFDate, endFDate))
  }

  getAllItemList() {
    fetch(`${baseUrl}${urlTypes.items}`)
      .then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
        const itemList = response ? response.value : ""; // response.value.slice(0, 7)
        console.log(`item list(${itemList.length}): `, itemList);
        return itemList;
      });
  }

  getCoreItemQuery(itemList) {
    return buildQuery(itemList);
  }
}

export default GetAPI;