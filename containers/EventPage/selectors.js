import { createSelector } from "reselect";
import { initialState } from "./reducer";

const selectEventPageDomain = (state) => state.eventPage || initialState;

const makeSelectEventPage = () =>
  createSelector(selectEventPageDomain, (substate) => substate);

export default makeSelectEventPage;
export { selectEventPageDomain };
