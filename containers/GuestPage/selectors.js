import { createSelector } from 'reselect';
import { init } from './reducer';

const selectGuestPageDomain = state => state.guestPage || init;

const makeSelectGuestPage = () =>
  createSelector(
    selectGuestPageDomain,
    substate => substate,
  );

export default makeSelectGuestPage;
export { selectGuestPageDomain };