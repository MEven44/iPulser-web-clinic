import React from 'react'
import { useState, useEffect} from 'react'


function Treatments () {
const [frequency,setFrequency] = useState()
const [time, setTime] = useState()
const [errors, setErrors] = useState({})


useEffect(()=>{
    if (frequency < 0.1 || frequency > 15000) errors.frequency = 'pick a frequency between 0.1 to 15,000'
    if (time < 1 || time > 15) errors.time = 'choose the time in minutes between 1 to 15 minutes'

    

},[frequency, time])
    return (
        <div className='Container'>
            <div className='left'></div>
                <input 
                type='text'
                className='input-treatment'
                value={frequency}
                onChange={(e)=>setFrequency(e.target.value)}
                name='frequency'>frequency</input>
                <input 
                type='text'
                className='input-treatment'
                value={time}
                onChange={(e)=>setTime(e.target.value)}
                name='frequency'>Time</input>
            <div className='right'>
                <button className='controls'>Play / pause</button>
                <button className='controls'>Stop</button>
            </div>
        </div>
    )
}
export default Treatments