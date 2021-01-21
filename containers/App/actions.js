import { ERROR } from "./constants";

export function error(error) {
  return {
    type: ERROR,
    error,
  };
}
