import Treatments from "../components/TreatmentInput";

const CREATE_TREATMENT = "trials/CREATE_TREATMENT";
const LOAD_TREATMENTS = "trials/LOAD_TREATMENTS";
const UPDATE_TREATMENT = "trials/UPDATE_TREATMENT";
const DELETE_TREATMENT = "trials/DELETE_TREATMENT";

const createTreatment = (treatment) => {
  return {
    type: CREATE_TREATMENT,
    treatment,
  };
};

const loadTreatments = (treatments) => {
  return {
    type: LOAD_TREATMENTS,
    treatments,
  };
};

const updateTreatment = (treatment) => {
  return {
    type: UPDATE_TREATMENT,
    treatment,
  };
};



const deleteTreatment = (treatment) => {
  return {
    type: DELETE_TREATMENT,
    treatment,
  };
};

//SECTION thunks
//NOTE get all treatments of a trial

export const getTreatmentsOfTrial = (trialId) => async (dispatch) => {
  const response = await fetch(`/api/treatments/${trialId}`);

  if (response.ok) {
    const treatments = await response.json();
    dispatch(loadTreatments(treatments));
    console.log('TREATMENT THUNK', treatments)
    return treatments;
  }
};

//NOTE create treatment thunk
export const createTreatmentThunk = (treatment) => async (dispatch) => {
  const response = await fetch(`/api/treatments/${treatment.trialId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(treatment),
  });
  if (response.ok) {
    const addedTreatment = await response.json();
    dispatch(createTreatment(addedTreatment));
    return addedTreatment;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data;
    }
  }
};

// NOTE update a treatment
export const updateTreatmentThunk = (update) => async (dispatch) => {
  const response = await fetch(`/api/treatments${update.trialId}/${update.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(update),
  });

  if (response.ok) {
    const updated = await response.json();
    dispatch(updateTreatment(updated));
    return updated;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data;
    }
  }
};

// NOTE delete a treatment
export const deleteTrialThunk = (treatment) => async (dispatch) => {
  const response = await fetch(`/api/treatments/${treatment.trialId}/${treatment.id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    const deleted = await response.json();
    dispatch(deleteTreatment(treatment.trialId));
    return deleted;
  }
};


// SECTION REDUCER

const initialState = {};

export const treatmentsReducer = (state = initialState, action) => {
  

  switch (action.type) {
    case LOAD_TREATMENTS: {
      const newState = { ...state, treatments: {}};
      // action.treatments.forEach((treatment) => {
      // treatment[treatment.id] = treatment;
      // });
      // newState.treatments = treatments;
      return newState;
    }

    case CREATE_TREATMENT: {
      const newState = { ...state.treatments, [action.treatment.id]: action.treatment };
      return newState;
    }

    case DELETE_TREATMENT: {
      const newState = { ...state };
      return newState;
    }

    case UPDATE_TREATMENT: {
      const newState = { ...state.treatments, [action.treatment.id]: action.treatment };
      return newState;
    }

    
    default:
      return state;
  }
};
