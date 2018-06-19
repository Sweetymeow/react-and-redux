import C from './redux/constants.js';
import { allBeautyItems, goal } from './redux/initialState';
// import { goalReducer, allProducts, errorReducer } from './store/reducers.js';

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

export default exportConstantsStatus;
