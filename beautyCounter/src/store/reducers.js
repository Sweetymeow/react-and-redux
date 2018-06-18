import C from '../redux/constants';

export const goalReducer = (state = 10, action) =>
  (action.type === C.SET_GOAL) ? parseInt(action.payload, 10) : state;

export const productReducer = (state = null, action) =>
  (action.type === C.ADD_ITEM) ? action.payload : state;
// return typeof state === "object" ? state.push(action.payload) : action.payload;

export const errorReducer = (state = null, action) => {
  switch(action.type){
    case C.ADD_ERROR:
      return [...state, action.payload] // return new array with
    case C.CLEAR_ERROR:
      return state.filter( errorMsg=> errorMsg !== action.payload )
    default:
      return state;
  }
}
