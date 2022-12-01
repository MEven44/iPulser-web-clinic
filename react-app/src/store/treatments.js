import Treatments from "../components/TreatmentInput";

const CREATE_TREATMENT = "treatments/CREATE_TREATMENT";
const LOAD_TREATMENTS = "treatments/LOAD_TREATMENTS";
const UPDATE_TREATMENT = "treatments/UPDATE_TREATMENT";
const DELETE_TREATMENT = "treatments/DELETE_TREATMENT";
const ALL_TREATMENTS = "treatments/ALL_TREATMENTS";

const allTreatments = (treatments) => {
  return {
    type: ALL_TREATMENTS,
    treatments
  }
}

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

// NOTE get all treatments
export const getAllTreatments = (treatments) => async (dispatch) => {
  const response = await fetch('/api/treatments/')

  if (response.ok) {
    const treatments = await response.json()
    dispatch(allTreatments(treatments))
    return treatments
  }
 }

//NOTE get all treatments of a trial

export const getTreatmentsOfTrial = (trialId) => async (dispatch) => {
  const response = await fetch(`/api/treatments/${trialId}`);
 
  if (response.ok) {
    const treatments = await response.json();
    dispatch(loadTreatments(treatments));
   
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
export const updateTreatmentThunk = (updated, id) => async (dispatch) => {
  const response = await fetch(`/api/treatments/freq/${id}`, {
    
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updated),
  });
console.log("TREATMENT REDUCER THUNK UPDATE", updated);
  if (response.ok) {

    const updatedTreatment = await response.json();
    console.log("TREATMENT REDUCER ****************** second", updatedTreatment);
    dispatch(updateTreatment(updatedTreatment));
    return updateTreatment;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data;
    }
  }
};

// NOTE delete a treatment
export const deleteTreatmentThunk = (id) => async (dispatch) => {
  const response = await fetch(`/api/treatments/${id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    const deleted = await response.json();
    dispatch(deleteTreatment(id));
    return deleted;
  }
};


// SECTION REDUCER

const initialState = {};

export const treatmentsReducer = (state = initialState, action) => {
  

  switch (action.type) {
    case LOAD_TREATMENTS: {
      const newState = { ...state};
      let obj = {}
      action.treatments.treatments.forEach((treatment) => {
      obj[treatment.id] = treatment;
      });
      newState.treatments = obj
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
      console.log("REDUCER UPDATE", action);
      
      const newState = { ...state.treatments};
      newState[action.treatment.id] = action.treatment
      console.log('NEW STATE', newState)
      return newState;
    }

    case ALL_TREATMENTS: {
      const newState = { ...state};
      let obj = {};
     
      action.treatments.treatments.forEach((treatment) => {
        obj[treatment.id] = treatment;
      });
      newState.treatments = obj;
      return newState;
    }

    
    default:
      return state;
  }
};
