import utils from '../utils'
import { checkRunStatus } from '../../controllers/api'


const pollingMiddleware = ({ dispatch, getState }) => next => action => {
  next(action);

  if (action.type === utils.action_types.START_POLLING) {

    const poll = async () => {
      try {
        console.log('polling...');
        // Make a new web request to check the status of the original request
        const response = await checkRunStatus();
        console.log(response);
        const status = response.status;

        // If the request is complete, dispatch a new action to signal completion
        if (status === 'complete') {
          dispatch({ type: utils.action_types.RUN_COMPLETE, payload: { }});
        } else {
          // Otherwise, keep polling
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