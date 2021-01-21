import { createSelector } from "reselect";
import { init } from "./reducer";

const selectScan = (state) => state.scan || init;

const makeSelectScan = () =>
  createSelector(selectScan, (eventState) => eventState);

export { selectScan, makeSelectScan };
