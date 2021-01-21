import { createSelector } from "reselect";
import { init } from "./reducer";

const selectListPageDomain = (state) => state.listPage || init;

const makeSelectListPage = () =>
  createSelector(selectListPageDomain, (substate) => substate);

export default makeSelectListPage;
export { selectListPageDomain };
