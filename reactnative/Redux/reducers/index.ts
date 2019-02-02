import { INCREMENT, DECREMENT, RESET, CHANGE_RESET_VAL, CHANGE_STEP } from "../actions/types";

/**
 * This is the Reducer. It changes the state according to the action received
 * @param {*} oldObject 
 * @param {*} newValues 
 */


function updateObject(oldObject : ReduxState, newValues : any) {
  // Encapsulate the idea of passing a new object as the first parameter
  // to Object.assign to ensure we correctly copy data instead of mutating
  return (<any>Object).assign({}, oldObject, newValues)
}


export default (state : ReduxState, action : Action) => {
  
  let pl = action.payload;
  
  // Idk why, I need those two lines to be sure 
  // that it is making and addintion and not a concatenation
  pl = parseInt(pl);
  pl = isNaN(pl) ? 0 : pl;

  switch (action.type) {
    case INCREMENT:
      // if (pl === '') pl = 0;
      return updateObject(state, {
        counter: state.counter + pl,
        clickIncrement: state.clickIncrement + 1,
      });

    case DECREMENT:
      return updateObject(state, {
        counter: state.counter - pl,
        clickDecrement: state.clickDecrement + 1,
      });


    case RESET:
      return {
        ...state, // If we don't want to use method updateObject
        counter: pl,
        clickReset: state.clickReset + 1,
      }

    case CHANGE_RESET_VAL:
      return updateObject(state, {
        resetValue: pl,
        resetValueDisp: pl,
      });

    case CHANGE_STEP:
      return updateObject(state, {
        step: pl,
        stepDisp: pl == 0 ? '' : pl.toString()
      });
  }

  return state;
}