import C from '../redux/constants';

export const goalReducer = (state = 10, action) => {
  if(action.type === C.SET_GOAL){
    return action.payload
  }else{
    return state
  }
}

export const productReducer = (state = null, action) => {
  // let newState = Object.assign({}, state);
  if(action.type === C.ADD_ITEM){
    return action.payload;
    // return typeof state === "object" ? state.push(action.payload) : action.payload;
  }else{
    return state
  }
}
