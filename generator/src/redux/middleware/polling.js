import utils from '../utils'
import { checkRunStatus } from '../../controllers/api'
import { RunStatus } from '../../controllers/models'


const pollingMiddleware = ({ dispatch, getState }) => next => action => {
  next(action);

  if (action.type === utils.action_types.START_POLLING) {

    const poll = async () => {
      try {
        // Make a new web request to check the status of the original request
        const response = await checkRunStatus();
        const content = {
          status: RunStatus[response.data.status],
          error: response.data.error
        }
        console.log(`model status: ${content.status}`);
        dispatch({ type: utils.action_types.UPDATE_RUN_STATUS, payload: content })


        // If the simulation is still running, keep polling
        if (
          content.status === RunStatus.RUNNING
          || content.status === RunStatus.WAITING
        ) {
          setTimeout(poll, 1000); // Poll every second
        }
      } catch (error) {
        // Handle errors here
        console.error(error);
      }
    };

    poll();
  }
};

export default pollingMiddleware;
