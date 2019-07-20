/* 
  src/actions/simpleAction.js
*/
import axios from 'axios'
// export const simpleAction = () => dispatch => {
//   dispatch({
//     type: 'SIMPLE_ACTION',
//     payload: 'result_of_simple_action'  
//   })
// }

export const simpleAction = (payload) => {
  return (dispatch) => {
    axios
      .get('http://localhost:8989/latest-order/' + payload.id).then(response => {
        console.log(response)
        dispatch({
          type: 'SIMPLE_ACTION',
          payload: {
            data: response.data
          }
        })
      }).catch(error => {
        console.log(error)
      })
  }
}
