import { createSelector } from "reselect";
import { initialState } from "./reducer";

const selectFailurePageDomain = (state) => state.failurePage || initialState;

const makeSelectFailurePage = () =>
  createSelector(selectFailurePageDomain, (substate) => substate);

export default makeSelectFailurePage;
export { selectFailurePageDomain };
