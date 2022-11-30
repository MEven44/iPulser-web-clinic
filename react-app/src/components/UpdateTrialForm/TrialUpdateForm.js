import { useEffect,useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {  fetchUserTrials, updateTrialThunk , deleteTrialThunk} from "../../store/trials";
import './update-trial.css'



const TrialUpdateForm = ({trial}) => {
   console.log('SHOW ME TRIAL IN TRIAL UPDATE FORM', trial)
    const [subject, setSubject] = useState(trial.subject);
    const [description, setDescription] = useState(trial.description);
    const [scope, setScope] = useState(trial.trial_scope);
    const [error, setError] = useState({});
    const [renderErr, setRenderErr] = useState(false)
    
    const dispatch = useDispatch();
    
      

    useEffect(() => {
       
        dispatch(fetchUserTrials());
        let errors = {};
        if (!subject) errors.subjectErr = "Please give this trial a subject";
        if (!description) errors.desErr = "Please describe this trial"
        
        setError(errors);
    }, [subject, description,dispatch]);

  const history = useHistory();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRenderErr(true)
    const newTrial = {
      trialId: trial.id,
      subject,
      trial_scope: scope,
      description,
      
      };
    
    const data = await dispatch(updateTrialThunk(newTrial));
    
    if (data.errors) {
        setError(data.errors)
    } else {
        history.push(`/trial-design`);
  };
}

const delTrial = async (e) => {
  e.preventDefault();
  await dispatch(deleteTrialThunk(trial.trialId))
  dispatch(fetchUserTrials())
  
}

  // if (!trial) return null
  // else
  return (
    <div id="form">
      <h1>Design the Trial</h1>

      <form className = 'form-con' onSubmit={handleSubmit}>
        {renderErr && error.subjectErr ? (
          <label className="text renderError" htmlFor="name">
            Trial subject: {error.nameError}
          </label>
        ) : (
          <label className="text noRenderError" htmlFor="name">
            Trial subject
          </label>
        )}
        <input
          type="text"
          onChange={(e) => setSubject(e.target.value)}
          value={subject}
          placeholder="Trial Subject"
          name="subject"
          id="input"
        />

        <input
          type="text"
          onChange={(e) => setScope(e.target.value)}
          value={scope}
          placeholder="Describe the trial scope"
          name="scope"
          id="input"
        />
        {renderErr && error.desErr ? (
          <label className="text renderError" htmlFor="name">
            Description: {error.nameError}
          </label>
        ) : (
          <label className="text noRenderError" htmlFor="name">
            Description
          </label>
        )}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          name="Description"
          placeholder="Describe the trial details"
          rows="10"
          id="description"
        ></textarea>
        <button id="update-btn" type="submit" disabled={!!error}>
          Submit Edited Trial
        </button>
        <button id="update-btn" onClick={delTrial}>
          Delete Trial
        </button>
      </form>
    </div>
  );
};


export default TrialUpdateForm
