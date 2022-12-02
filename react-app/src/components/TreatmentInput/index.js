import React from 'react'
import { useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { useParams, useHistory} from 'react-router-dom'
import { createTreatmentThunk, getAllTreatments, getTreatmentsOfTrial, updateTreatmentThunk } from '../../store/treatments'
import './treatments.css'



function Treatments () {

const { trialId } = useParams()

const [frequency,setFrequency] = useState()
const [treatmentName, setTreatmentName] = useState()
const [comments, setComments] = useState()
const [time, setTime] = useState()
const [errors, setErrors] = useState({})
const [renderErr,setRenderErr] = useState(false)


const dispatch = useDispatch()
let state = useSelector(state=>state)
const recentTreatment = state.treatment
const history = useHistory()


useEffect(()=>{
  let errVal = {}
    if (!treatmentName)  errVal.treatmentNameErr = "Treatment name is requiered";
      if (frequency && frequency < 0.1 || frequency > 15000)
         errVal.frequency = "you must pick a frequency between 0.1 to 15,000";
        else if (!frequency)  errVal.frequency = "you must enter a frequency";
        // else if (typeof frequency !== "number")  errVal.frequency = "frequency must be a number";

      if (time && time < 1 || time > 15)  errVal.time =
        "you must choose the time in minutes between 1 to 15 minutes";
      else if (!time)  errVal.time = "you must enter time";
      // else if ((typeof time)!== "number")  errVal.time = "time must be an integer";

   setErrors(errVal)
    
  },[frequency, time,treatmentName, dispatch])
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (Object.values(errors).length) setRenderErr(true) 
    else {
      const treatment = {
        treatment_name: treatmentName,
        frequencies: `${frequency} ${time}`,
        comments,
        trialId:+trialId
        
      };
      
      dispatch(createTreatmentThunk(treatment))
      dispatch(getAllTreatments())
      history.push('/summery') }
      
      
    }
    console.log("SHOW ME ERRORS" , errors)


  
    return (
      <div className="Container">
        <form className="left">
          {}
          {renderErr && errors.treatmentNameErr ? (
            <label id="errors">Treatment: {errors.treatmentNameErr}</label>
          ) : (
            <label> Treatment Name</label>
          )}
          <input
            type="text"
            className="input-treatment"
            value={treatmentName}
            onChange={(e) => setTreatmentName(e.target.value)}
            name="name"
            placeholder="Treatment name"
            required={true}
          />
          {renderErr && errors.frequency ? (
            <label id="errors">Frequncy: {errors.frequency}</label>
          ) : (
            <label>Frequency</label>
          )}
          <input
            type="text"
            className="input-treatment"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            name="frequency"
            placeholder="Enter a number between 0.5 to 15,000"
            required={true}
          />
          {renderErr && errors.time ? (
            <label id="errors">Time: {errors.time}</label>
          ) : (
            <label> Time</label>
          )}
          <input
            type="text"
            className="input-treatment"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            name="time"
            placeholder="time in minutes (1-15)"
            required={true}
          />
          <label> Comments</label>
          <textarea
            type="text"
            className="input-treatment"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            name="comments"
          />

          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    );
}
export default Treatments