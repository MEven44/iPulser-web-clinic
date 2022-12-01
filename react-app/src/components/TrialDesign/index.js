import React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createTrialThunk } from '../../store/trials'





const TrialDetails = () => {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [scope, setScope] = useState("");
  const [error, setError] = useState({});
  const [renderErr, setRenderErr] = useState(false)
  const dispatch = useDispatch();

  

  useEffect(() => {
    let errors = {};
    if (!subject) errors.subjectErr = "Please give this trial a subject";
    if (!description) errors.desErr = "Please describe this trial"
     
    setError(errors);
  }, [subject, description]);

  const history = useHistory();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRenderErr(true)
    const newTrial = {
      subject,
      trial_scope: scope,
      description,
      };
    
    const data = await dispatch(createTrialThunk(newTrial));
    console.log('TRIAL FORM DATA', data)
    if (data.errors) {
        setError(data.errors)
    } else {
        history.push(`/summery`);
  };
}

  
  return (
    <div id="form">
      <h1>Design the Trial</h1>

      <form onSubmit={handleSubmit}>
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
        <button id="new-song-btn" type="submit" disabled={!!error.length}>
          Submit New trial
        </button>
      </form>
    </div>
  );
};

export default TrialDetails