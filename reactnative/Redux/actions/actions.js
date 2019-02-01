import { INCREMENT, DECREMENT, RESET, CHANGE_RESET_VAL, CHANGE_STEP } from './types';

/**
 * This file describe in details all actions: their Types and Payload.
 * 
 * @param {*} value For increment/decrement, it is the value to increment/decrement. 
 *                  For reset, it is the default value avter a reset.
 */

export const incrementAction = (value = 1) => {
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

export const resetAction = (value = 0) => {
    return {
        type: RESET,
        payload: value,
    }
}

export const changeResetValAction = (value = 0) => {
    value = value == "" ? 0 : value;
    return {
        type: CHANGE_RESET_VAL,
        payload: parseInt(value),
    }
}

export const changeStepAction = (value = 1) => {
    value = value == "" ? 0 : value;
    return {
        type: CHANGE_STEP,
        payload: parseInt(value),
    }
}

