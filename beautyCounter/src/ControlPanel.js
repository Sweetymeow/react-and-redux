import React, { Component } from 'react';
import Counter from './Counter.js';
import C from './redux/constants.js';
import { allBeautyItems, goal } from './redux/initialState';
import { goalReducer, allProducts, errorReducer } from './store/reducers.js';

const style = {
  margin: '20px'
};

const exportConstantsStatus = () => {
  console.log(`
    Beauty Shopping List
    ==========================
    The goal is ${goal} items. Initially there are ${allBeautyItems.length} items in this.state.

    Constants (actions)
    --------------------------
    ${Object.keys(C).join('\n          ')}
    `);
};

const state = allBeautyItems;
const errorState = [
  "user not authorized",
  "server feed not found"
];

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

const nextGoal = goalReducer(10 , goalAction); // initState
const nextState = allProducts(state, addProdAction);
const nextErrorState = errorReducer(errorState, clearErrorAction);

console.log(`
  init goal 10 to nextGoal: ${nextGoal}
  ---------***-----------
  initial product length: ${state.length}
  ==================================
  next product state - ${nextState.length} products:
  ## ${JSON.stringify(nextState)}
`);

class ControlPanel extends Component {

  constructor(props) {
    super(props);

    this.onCounterUpdate = this.onCounterUpdate.bind(this);

    this.initValues = [ 0, 10, 20];

    const initSum = this.initValues.reduce((a, b) => a+b, 0);
    this.state = {
      sum: initSum
    };
  }

  onCounterUpdate(newValue, previousValue) {
    const valueChange = newValue - previousValue;
    this.setState({ sum: this.state.sum + valueChange});
  }

  render() {
    return (
      <div style={style}>
        <Counter onUpdate={this.onCounterUpdate} caption="First" />
        <Counter onUpdate={this.onCounterUpdate} caption="Second" initValue={this.initValues[1]} />
        <Counter onUpdate={this.onCounterUpdate} caption="Third" initValue={this.initValues[2]} />
        <hr/>
        <div>Total Count: {this.state.sum}</div>
      </div>
    );
  }
}

export default ControlPanel;
