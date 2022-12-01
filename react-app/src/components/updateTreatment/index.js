import React, { useEffect } from "react";
import {useState} from 'react'
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

import { fetchUserTrials } from '../../store/trials'



function UpdateTreatment () {
   let {id} = useParams()
   id = +id
   const state = useSelector(state=>state)
   const treatment = Object.values(state.treatments.treatments).filter(ct=>ct.id === id)

   console.log('SHOW ME TREATMENTS', treatment)
   const trials = Object.values(state.trials)
   console.log('SHOW ME TRIALS', trials[0] )


const [frequency, setFrequency] = useState(treatment[0].frequencies[0].freq);
const [treatmentName, setTreatmentName] = useState(treatment.treatment_name);
const [comments, setComments] = useState(treatment.comments);
const [time, setTime] = useState(treatment[0].frequencies[0].time);
const [errors, setErrors] = useState({});
const [errRender, setErrRender] = useState(false);

const dispatch = useDispatch()
useEffect(() => {
dispatch(fetchUserTrials())
}, [dispatch]); 

const handleSubmit = (e) => {
    e.preventDefault()
 

const treatment = {
      treatment_name: treatmentName,
      frequencies: `${frequency} ${time}`,
      comments,
    //   trialId:+trialId
    }
    dispatch(UpdateTreatment(treatment))
}

return (
  <>
    <form>
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

      <label for="select-trial">Choose a trial</label>
      <select name="trials" id="trials-select">
        {" "}
        <option value=''>Please choose a trial</option>
        {trials.map((trial) => (
          <option value={trial.id}>{trial.subject}</option>
        ))}
      </select>
      <button>Update</button>
      <button>delete</button>
    </form>
  </>
);
}
export default UpdateTreatment