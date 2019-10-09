import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the home state domain
 */

const selectEventPageDomain = state => state.eventPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Home
 */

const makeSelectEventPage = () =>
  createSelector(
    selectEventPageDomain,
    substate => substate,
  );

export default makeSelectEventPage;
export { selectEventPageDomain };