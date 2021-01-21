import { createSelector } from "reselect";
import { initialState } from "./reducer";

const selectDisclaimerPageDomain = (state) =>
  state.disclaimerPage || initialState;

const makeSelectDisclaimerPage = () =>
  createSelector(selectDisclaimerPageDomain, (substate) => substate);

export default makeSelectDisclaimerPage;
export { selectDisclaimerPageDomain };
