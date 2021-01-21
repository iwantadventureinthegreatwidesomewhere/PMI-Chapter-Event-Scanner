import {
  HANDLE_SCAN,
  SUCCESSFUL_SCAN,
  FAILURE_SCAN,
  RESET,
  HANDLE_RESP,
} from "./constants";

export function handleScan(uuid, code) {
  var eventSignupId = code.match(new RegExp("id=(.*)&"));

  if (eventSignupId != null) {
    return {
      type: HANDLE_SCAN,
      uuid,
      eventSignupId: eventSignupId[1],
    };
  } else {
    return {
      type: FAILURE_SCAN,
    };
  }
}

export function reset() {
  return {
    type: RESET,
  };
}

export function handleResp(resp) {
  if (resp.success == "true") {
    return {
      type: SUCCESSFUL_SCAN,
    };
  } else {
    return {
      type: FAILURE_SCAN,
    };
  }
}
