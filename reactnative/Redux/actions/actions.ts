import { INCREMENT, DECREMENT, RESET, CHANGE_RESET_VAL, CHANGE_STEP } from './types';

/**
 * This file describe in details all actions: their Types and Payload.
 * 
 * @param {*} value For increment/decrement, it is the value to increment/decrement. 
 *                  For reset, it is the default value avter a reset.
 */

export const incrementAction = (value:number = 1) => {
    return {
        type: INCREMENT,
        payload: value,
    }
}

export const decrementAction = (value = 1) => {
    return {
        type: DECREMENT,
        payload: value,
    }
}

export const resetAction = (value : number = 0) => {
    return {
        type: RESET,
        payload: value,
    }
}

export const changeResetValAction = (value = 0) => {
    return {
        type: CHANGE_RESET_VAL,
        payload: value,
    }
}

export const changeStepAction = (value = 1) => {
    return {
        type: CHANGE_STEP,
        payload: value,
    }
}

