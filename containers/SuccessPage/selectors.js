import { createSelector } from "reselect";
import { initialState } from "./reducer";

const selectListPageDomain = (state) => state.listPage || initialState;

const makeSelectListPage = () =>
  createSelector(selectListPageDomain, (substate) => substate);

export default makeSelectListPage;
export { selectListPageDomain };
