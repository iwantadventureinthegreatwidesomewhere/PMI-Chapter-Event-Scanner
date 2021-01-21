import { createSelector } from "reselect";
import { init } from "./reducer";

const selectEvent = (state) => state.event || init;

const makeSelectEvent = () =>
  createSelector(selectEvent, (eventState) => eventState);

export { selectEvent, makeSelectEvent };
