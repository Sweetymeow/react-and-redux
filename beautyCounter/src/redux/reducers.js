import C from '../redux/constants';
import { combineReducers } from 'redux';

export const goal = (state = 10, action) =>
  (action.type === C.SET_GOAL) ? parseInt(action.payload, 10) : state;

// export const products = (state = null, action) =>
//   (action.type === C.ADD_ITEM) ? [...state, action.payload] : state;
// return typeof state === "object" ? state.push(action.payload) : action.payload;

export const error = (state = null, action) => {
  switch(action.type){
    case C.ADD_ERROR:
      return [...state, action.payload] // return new array with
    case C.CLEAR_ERROR:
      return state.filter( errorMsg=> errorMsg !== action.payload )
    default:
      return state;
  }
}
export const fetching = (state = null, action) => {
  switch(action.type){
    case C.FETCH_BRAND_NAMES:
      return action.payload // true
    case C.CANCEL_FETCHING:
      return action.payload // false
    default:
      return state;
  }
}
export const suggestions = (state = [], action) => {
  switch(action.type) {
      case C.CLEAR_SUGGESTIONS :
        return []
      case C.CHANGE_SUGGESTIONS :
        return action.payload
      default :
        return state
    }
}

export const allProducts = (state = [], action) => {
  switch(action.type){
    case C.ADD_ITEM:
      const hasProduct = state.some( prod => prod.name === action.payload.name );
      return hasProduct ? state : [...state, action.payload] // return new array with
    case C.REMOVE_ITEM:
      return state.filter( item => item.name !== action.payload.name )
    default:
      return state;
  }
}

export default combineReducers({
  allProducts,
  goal,
  error,
  brandNames: combineReducers({
    fetching,
    suggestions
  })
})
