import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the home state domain
 */

const selectScanPageDomain = state => state.scanPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Home
 */

const makeSelectScanPage = () =>
  createSelector(
    selectScanPageDomain,
    substate => substate,
  );

export default makeSelectScanPage;
export { selectScanPageDomain };