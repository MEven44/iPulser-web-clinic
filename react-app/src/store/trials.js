const CREATE_TRIAL = "trials/CREATE_TRIAL";
const LOAD_TRIALS = "trials/LOAD_TRIAL";
const LOAD_ONE_TRIAL = "trials/LOAD_ONE_TRIAL";
const UPDATE_TRIALS = "trials/UPDATE_TRIALS";
const DELETE_TRIALS = "trials/DELETE_TRIALS";

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
    dispatch(loadTrials(trials.trials));
    return trials;
  }
};

//NOTE create trial thunk
export const createTrialThunk = (newTrial) => async(dispatch) => {
    const response = await fetch('/api/trials/@me', {
        method:'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTrial)
    })
    if (response.ok) {
        const addedTrial = await response.json();
        dispatch(createTrial(addedTrial))
        return addedTrial
    }else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data
        }
    }
    
}

// NOTE update a trial
export const updateTrialThunk = (update) => async (dispatch) => {
 
  const response = await fetch(`/api/trials/@me/${update.trialId}`, {
    
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(update),
  });
  
  if (response.ok) {
    const updated = await response.json();
    dispatch(updateTrial(updated));
    return updated;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data;
    }
  }
};



// NOTE delete a trial
export const deleteTrialThunk = (trialId) => async (dispatch) => {
  
  const response = await fetch(`/api/@me/${trialId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    const deleted = await response.json();
    dispatch(deleteTrial(trialId));
    return deleted;
  }
};


// NOTE get one trial
export const getOneTrial = (trialId) => async (dispatch) => {
  const response = await fetch(`/api/trials/@me/${trialId}`);

  if (response.ok) {
    const trial = await response.json();
    // console.log('get server details thunk >>>>>>', server)
    dispatch(loadOneTrial (trial));
  }
};


// SECTION REDUCER

const initialState = { };

export const trialsReducer = (state = initialState, action) => {
  const trials = {}

  switch (action.type) {
    case LOAD_TRIALS: {
      const newState = { ...state };
      
      action.trials.forEach(trial=>{
        trials[trial.id]=trial
      })     
      newState.trials = trials  
      return newState;
    }

    case CREATE_TRIAL: {
        const newState = {...state.trials, [action.trial.id]:action.trial}
        return newState;
    }

    case DELETE_TRIALS: {
        const newState = {...state}
        return newState;
    }

    case UPDATE_TRIALS: {
        const newState =  {...state.trials, [action.trial.id]:action.trial}
        return newState;
    }

    case LOAD_ONE_TRIAL: {
      const newState = {...state.trials, [action.trial.id]:action.trial}
      newState.OneTrial = {...action.trial}
      return newState;
    }
    default:
      return state;
  }
};
