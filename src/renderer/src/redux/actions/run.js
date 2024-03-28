import utils from "../utils";
import { run } from "../../controllers/api";
import {
  translate_to_camp_config,
  translate_to_musicbox_conditions,
} from "../../controllers/transformers";

export const doRun = (mechanism, conditions) => async (dispatch) => {
  try {
    const camp_mechanism = translate_to_camp_config(mechanism);
    const musicbox_conditions = translate_to_musicbox_conditions(
      conditions,
      mechanism,
    );
    await run({ mechanism: camp_mechanism, conditions: musicbox_conditions });
    dispatch({ type: utils.action_types.START_POLLING, payload: {} });
  } catch (error) {
    console.error(`Error starting run: ${error.message}`);
  }
};
