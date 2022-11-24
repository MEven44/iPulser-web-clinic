import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserTrials } from '../../store/trials'



const SummeryPage = () => {
    const dispatch = useDispatch()

    let state = useSelector(state=>state)
    
    
    useEffect(()=>{
        dispatch(fetchUserTrials())
    },[dispatch])
    console.log('SHOW ME STATE', state)

    return(
        <h1>COME WILL COME SUMMERY PAGE</h1>
        
    )
}
export default SummeryPage