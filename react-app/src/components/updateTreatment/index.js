import React, { useEffect } from "react";
import {useState} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

import { fetchUserTrials } from '../../store/trials'
import { deleteTreatmentThunk, getAllTreatments, updateTreatmentThunk } from "../../store/treatments";
import './update-treatment.css'


function UpdateTreatment () {
   let {id} = useParams()
   id = +id
   const state = useSelector(state=>state)
    const history = useHistory()
   let treatment;
   if (state.treatments.treatments) treatment = Object.values(state?.treatments?.treatments).filter(ct=>ct.id === id)

   let trials;
   if (state.trials.trials) trials = Object.values(state?.trials?.trials)
  

   const dispatch = useDispatch()
   
   useEffect(() => {
     (async () => {
       await dispatch(fetchUserTrials());
       await dispatch(getAllTreatments());
      
     })();
   }, [dispatch]);


const [frequency, setFrequency] = useState(treatment? treatment[0]?.frequencies[0]?.freq: "" );
const [treatmentName, setTreatmentName] = useState(treatment? treatment[0]?.treatment_name: "");
const [comments, setComments] = useState(treatment? treatment[0]?.comments: "");
const [time, setTime] = useState(treatment? treatment[0]?.frequencies[0]?.time: "");

const [trial, setTrial] = useState()
const [errors, setErrors] = useState({});
const [errRender, setErrRender] = useState(false);
const [success, setSuccess] = useState(false)


const handleSubmit = (e) => {
    e.preventDefault()
    const treatment = {
    
      treatment_name: treatmentName,
      frequencies: `${frequency} ${time}`,
      comments,
      trialId: trial
    }
    dispatch(updateTreatmentThunk(treatment,id))
    dispatch(getAllTreatments());
    history.push('/summery')
}

const delTrt =  (e) => {
    e.preventDefault();
    dispatch(deleteTreatmentThunk(id))
    dispatch(getAllTreatments())
    history.push('/summery')
}


if (!treatment) return null
else

return (
  <>
    <form className='form' onSubmit={handleSubmit}>
      <label for="freq">Treatments Name</label>
      <input
        type="text"
        className="input-treatment"
        value={treatmentName}
        onChange={(e) => setTreatmentName(e.target.value)}
        name="name"
      />
      <label for="freq">Frequency</label>
      <input
        type="text"
        className="input-treatment"
        value={frequency}
        onChange={(e) => setFrequency(e.target.value)}
        name="frequency"
      />

      <label for="time">Time</label>
      <input
        type="text"
        className="input-treatment"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        name="frequency"
      />

      <label for="comments">Comments</label>
      <textarea
        type="text"
        className="input-treatment"
        value={comments}
        onChange={(e) => setComments(e.target.value)}
        name="frequency"
      />

      {/* <label for="select-trial">Choose a trial</label>
      <select
        name="trials"
        id="trials-select"
        onChange={(e) => setTrial(e.target.value)}
      >
        {" "}
        <option value="">Please choose a trial</option>
        {trials.map((trial) => (
          <option value={trial.id}>{trial.subject}</option>
        ))}
      </select> */}
      <button type="submit">Update</button>
      <button onClick={delTrt}>delete</button>
      {success && (<div>You successfully updated the treatment</div>)}
    </form>
  </>
);
}
export default UpdateTreatment