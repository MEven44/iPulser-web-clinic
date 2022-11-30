import React from 'react'
import { useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { useParams } from 'react-router-dom'
import { getTreatmentsOfTrial } from '../../store/treatments'




function Treatments () {

const { trialId } = useParams()

const [frequency,setFrequency] = useState()
const [treatmentName, setTreatmentName] = useState()
const [comments, setComments] = useState()
const [time, setTime] = useState()
const [errors, setErrors] = useState({})
const [errRender,setErrRender] = useState(false)
const dispatch = useDispatch()
let state = useSelector(state=>state)
console.log('TREATMENT PAGE STATE TO PLAY WITH', state)

useEffect(()=>{
    if (frequency < 0.1 || frequency > 15000) errors.frequency = 'pick a frequency between 0.1 to 15,000'
    if (time < 1 || time > 15) errors.time = 'choose the time in minutes between 1 to 15 minutes'

    dispatch(getTreatmentsOfTrial(+trialId))
    

},[frequency, time, dispatch])

const handleSubmit = async (e) => {
    e.preventDefault();
    setErrRender(true)
    
    // console.log('----------',validUrl)
    const newServer = {
      treatmentName,
      frequencies: `${frequency} ${time}`,
      comments
      
    };
}

    return (
      <div className="Container">
        <div className="left"></div>
        <input
          type="text"
          className="input-treatment"
          value={treatmentName}
          onChange={(e) => setTreatmentName(e.target.value)}
          name="frequency"
        />
        Treatment Name
        <input
          type="text"
          className="input-treatment"
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
          name="frequency"
        />
        frequency
        <input
          type="text"
          className="input-treatment"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          name="frequency"
        />
        Time
        <textarea
          type="text"
          className="input-treatment"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          name="frequency"
        />
        Time
        <div className="right">
          <button className="controls">
          Play / pause</button>
          <button className="controls">Stop</button>
        </div>
      </div>
    );
}
export default Treatments