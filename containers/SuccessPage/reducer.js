import produce from "immer";
import {} from "./constants";

export const initialState = {};

const listPageReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
    }
  });

export default listPageReducer;
