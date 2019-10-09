import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the home state domain
 */

const selectDisclaimerPageDomain = state => state.disclaimerPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Home
 */

const makeSelectDisclaimerPage = () =>
  createSelector(
    selectDisclaimerPageDomain,
    substate => substate,
  );

export default makeSelectDisclaimerPage;
export { selectDisclaimerPageDomain };