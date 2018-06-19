import C from './constants.js';

const goalAction = {
  type: C.SET_GOAL,
  payload: 15
};

const addProdAction = {
  type: C.ADD_ITEM,
  payload: {
    "name": "REDERMIC R WITH RETINOL",
    "date": "2018-06-18",
    "purchased": false,
    "brand": "La Roche-Posay",
    "price": "56.99",
    "currency": "usd",
    "link": "https://www.laroche-posay.us/redermic-r-with-retinol-3337872413063.html?cgid=anti-aging-serum#start=1"
  }
}

const removeProdAction = {
  type: C.REMOVE_ITEM,
  payload: {
    "name": "Olay Total Effects Whip Face Moisturizer"
  }
}

const addErrorAction = {
  type: C.ADD_ERROR,
  payload: "404: Can't connect to server"
};

const clearErrorAction = {
  type: C.CLEAR_ERROR,
  payload: "server feed not found"
};

const fetchResortAction = {
    type: C.FETCH_BRAND_NAMES,
    payload: true
}
const cancelFetchingAction = {
    type: C.CANCEL_FETCHING,
    payload: false
}

const ACTIONS = {
  goal: goalAction,
  addProduct: addProdAction,
  removeProduct: removeProdAction,
  addError: addErrorAction,
  clearError: clearErrorAction,
  fetchResort: fetchResortAction,
  cancelFetch: cancelFetchingAction
}

export default ACTIONS;
