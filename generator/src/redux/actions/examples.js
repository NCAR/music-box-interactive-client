import utils from '../utils';
import { fetchExample } from '../../controllers/api'

export const getExample = (example) => async (dispatch) => {
  try {
    const data = await fetchExample(example);
    dispatch({ type: utils.action_types.EXAMPLE_FETCHED, payload: data });
  } catch (error) {
    console.error(`Error getting example: ${error.message}`);
  }
};
