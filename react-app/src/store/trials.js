const CREATE_TRIAL = "trials/CREATE_TRIAL";
const LOAD_TRIALS = "trials/LOAD_TRIAL";
const LOAD_ONE_TRIAL = "trials/LOAD_ONE_TRIAL";
const UPDATE_TRIALS = "trials/UPDATE_TRIALS";
const DELETE_TRIALS = "ELETE_TRIALS";

const createTrial = (trial) => {
  return {
    type: CREATE_TRIAL,
    trial,
  };
};

const loadTrials = (trials) => {
  return {
    type: LOAD_TRIALS,
    trials,
  };
};

const updateTrial = (trial) => {
  return {
    type: UPDATE_TRIALS,
    trial,
  };
};

const loadOneTrial = (trial) => {
  return {
    type: LOAD_ONE_TRIAL,
    trial,
  };
};

const deleteTrial = (trial) => {
  return {
    type: DELETE_TRIALS,
    trial,
  };
};

//SECTION thunks
//NOTE get all trials of a user

export const fetchUserTrials = () => async (dispatch) => {
  const response = await fetch("/api/trials/@me");

  if (response.ok) {
    const trials = await response.json();
    dispatch(loadTrials(trials));
    return trials;
  }
};



// SECTION REDUCER

const initialState = {
  trials: {},
};

export const trialsReducer = (state = initialState, action) => {
  let newState = {};

  switch (action.type) {
    case LOAD_TRIALS: {
      newState = { ...state };
      newState.trials = {};
      action.trials.forEach((trial) => {
        newState.trials[trial.id] = trial;
      });
      return newState;
    }

    case CREATE_TRIAL: {
        newState.trials = {...state.trials, [action.trial.id]:action.trial}
        console.log('REDUCER NEW STATE',newState)
        return newState;
    }

    case DELETE_TRIALS: {
        newState.trials = {...state}
        return newState
    }

    case UPDATE_TRIALS: {
        newState.trials =  {...state, [action.trial.id]:action.trial}

    }
    default:
      return state;
  }
};
