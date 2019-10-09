import { createSelector } from 'reselect';
import { init } from './reducer';

const selectLoginDomain = state => state.login || init;

const makeSelectLogin = () =>
  createSelector(
    selectLoginDomain,
    substate => substate,
  );

export default makeSelectLogin;
export { selectLoginDomain };