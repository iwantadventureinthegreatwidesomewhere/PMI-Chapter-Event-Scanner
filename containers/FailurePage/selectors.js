import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the home state domain
 */

const selectFailurePageDomain = state => state.failurePage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Home
 */

const makeSelectFailurePage = () =>
  createSelector(
    selectFailurePageDomain,
    substate => substate,
  );

export default makeSelectFailurePage;
export { selectFailurePageDomain };