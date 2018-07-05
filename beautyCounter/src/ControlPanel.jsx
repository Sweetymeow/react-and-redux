import React from 'react';
import expect from 'expect';
import { createStore } from 'redux';
import Counter from './comps/Counter';
import actions from './redux/actions';
// import initialState from './redux/initialState';
import appReducer from './store/reducers';
import AnimeBackground from './comps/AnimeBackground';

const style = {
  margin: '20px'
};

const store  = createStore(appReducer);
console.log(`initial state =>`, store.getState());

store.dispatch(actions.addProduct);
console.log(`next state => `, store.getState() );

// const nextGoal = goalReducer(goal , actions.goal); // initState
// console.log(`
//   ---------***-----------
//   Challenge A: FETCH_RESORT_NAMES PASSED!!!
//   result -> ${nextFetchResortState}
//   ==================================
//   Challenge B: CANCEL_FETCHING PASSED!!!
//   result -> ${nextCancelFetchState}
//   ==================================
//
//   ==================================
// `);

class ControlPanel extends React.Component {
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
        <AnimeBackground />
      </div>
    );
  }
}

export default ControlPanel;
