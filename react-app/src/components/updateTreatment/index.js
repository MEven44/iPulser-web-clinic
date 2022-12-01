import React from "react";
import {useState} from 'react'
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'




function UpdateTreatment () {
   const {id} = useParams()
   const treatment = useSelector(state=>state.treatments)
   console.log('SHOW ME TREATMENTS', treatment)
   
const [frequency, setFrequency] = useState();
const [treatmentName, setTreatmentName] = useState();
const [comments, setComments] = useState();
const [time, setTime] = useState();
const [errors, setErrors] = useState({});
const [errRender, setErrRender] = useState(false);


return (
    <>
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
      Comments
    </>
  )
}
export default UpdateTreatment