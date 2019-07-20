/* 
  src/reducers/simpleReducer.js
*/

const initialState = {
  latestOrders: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SIMPLE_ACTION':
      return {
        ...state,
        latestOrders: action.payload.data
      }
    default:
      return state
  }
}
