/*
 *
 * Home reducer
 *
 */
import produce from 'immer';
import { } from './constants';

// The initial state of the App
export const initialState = {
};

/* eslint-disable default-case, no-param-reassign */
const scanPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
    }
  });

export default scanPageReducer;