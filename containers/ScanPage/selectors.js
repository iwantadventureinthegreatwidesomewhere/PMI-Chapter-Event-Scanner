import { createSelector } from "reselect";
import { initialState } from "./reducer";

const selectScanPageDomain = (state) => state.scanPage || initialState;

const makeSelectScanPage = () =>
  createSelector(selectScanPageDomain, (substate) => substate);

export default makeSelectScanPage;
export { selectScanPageDomain };
