import utils from "../utils";
import {
  fetchExample,
  fetchConfiguration,
  fetchCompressedConfiguration,
  fetchResults,
} from "../../controllers/api";
import {
  translate_to_camp_config,
  translate_to_musicbox_conditions,
} from "../../controllers/transformers";

export const getExample = (example) => async (dispatch) => {
  try {
    const data = await fetchExample(example);
    dispatch({ type: utils.action_types.EXAMPLE_FETCHED, payload: data });
  } catch (error) {
    console.error(`Error getting example: ${error.message}`);
  }
};

export const loadConfiguration = (file) => async (dispatch) => {
  try {
    const data = await fetchConfiguration(file);
    dispatch({ type: utils.action_types.EXAMPLE_FETCHED, payload: data });
  } catch (error) {
    const msg = `Error loading configuration: ${error.message}. If you believe your configuraiton is valid, please submit a bug at https://github.com/NCAR/music-box-interactive-client/issues/new?assignees=&labels=&projects=&template=bug_report.md&title=`;
    console.error(msg);
    alert(msg);
  }
};

export const downloadConfiguration =
  (mechanism, conditions) => async (dispatch) => {
    try {
      const camp_mechanism = translate_to_camp_config(mechanism);
      const musicbox_conditions = translate_to_musicbox_conditions(conditions);
      const url = await fetchCompressedConfiguration({
        mechanism: camp_mechanism,
        conditions: musicbox_conditions,
      });
      const link = document.createElement("a");
      link.href = url;
      link.download = "config.zip";
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error(
        `Error fetching compressed configuration: ${error.message}`,
      );
    }
  };

export const downloadResults = () => async (dispatch) => {
  try {
    const url = await fetchResults();
    const link = document.createElement("a");
    link.href = url;
    link.download = "results.csv";
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  } catch (error) {
    console.error(`Error downloading results: ${error.message}`);
  }
};
