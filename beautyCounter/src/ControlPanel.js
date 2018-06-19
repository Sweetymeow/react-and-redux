import React, { Component } from 'react';
import expect from 'expect';
import Counter from './Counter.js';
import ACTIONS from './redux/actions';
import { allBeautyItems, goal, error, fetch } from './redux/initialState';
import { goalReducer, allProducts, errorReducer, fetching } from './store/reducers.js';

const style = {
  margin: '20px'
};

const nextGoal = goalReducer(10 , ACTIONS.goal); // initState
const nextState = allProducts(allBeautyItems, ACTIONS.addProduct); // ACTIONS.removeProduct
// const nextErrorState = errorReducer(error, ACTIONS.clearError);
const nextFetchResortState = fetching(fetch.resortInit, ACTIONS.fetchResort);
const nextCancelFetchState = fetching(fetch.clearInit, ACTIONS.cancelFetch);
expect(nextFetchResortState).toEqual(true);
expect(nextCancelFetchState).toEqual(false);

console.log(`
  ---------***-----------
  Challenge A: FETCH_RESORT_NAMES PASSED!!!
  result -> ${nextFetchResortState}
  ==================================
  Challenge B: CANCEL_FETCHING PASSED!!!
  result -> ${nextCancelFetchState}
  ==================================

  ==================================
`);
// console.log(`
//   init goal 10 to nextGoal: ${nextGoal}
//   ---------***-----------
//   initial product length: ${allBeautyItems.length}
//   ==================================
//   next product state - ${nextState.length} products:
//   ## ${JSON.stringify(nextState)}
// `);

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
