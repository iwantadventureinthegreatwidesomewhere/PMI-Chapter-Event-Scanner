import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the home state domain
 */

const selectListPageDomain = state => state.listPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Home
 */

const makeSelectListPage = () =>
  createSelector(
    selectListPageDomain,
    substate => substate,
  );

export default makeSelectListPage;
export { selectListPageDomain };