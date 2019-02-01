import { INCREMENT, DECREMENT, RESET, CHANGE_RESET_VAL, CHANGE_STEP } from "../actions/types";

/**
 * This is the Reducer. It changes the state according to the action received
 * @param {*} oldObject 
 * @param {*} newValues 
 */

 
function updateObject(oldObject, newValues) {
    // Encapsulate the idea of passing a new object as the first parameter
    // to Object.assign to ensure we correctly copy data instead of mutating
    return Object.assign({}, oldObject, newValues)
}


export default (state, action) => {
    switch (action.type) {
        case INCREMENT:
            return updateObject(state, {
              counter: state.counter + action.payload,
              clickIncrement: state.clickIncrement + 1,
            });
    
        case DECREMENT:
          return updateObject(state, {
            counter: state.counter - action.payload,
            clickDecrement: state.clickDecrement + 1,
          });
        
  
        case RESET:
        return {
            ...state, // If we don't want to use method updateObject
          counter: action.payload,
          clickReset: state.clickReset + 1,
        }

        case CHANGE_RESET_VAL:
          return updateObject(state, {
            resetValue: action.payload,
          });

          case CHANGE_STEP:
          return updateObject(state, {
            step: action.payload,
          });
    }
  
    return state;
  }