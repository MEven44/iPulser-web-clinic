import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { fetchUserTrials } from '../../store/trials'




const SummeryPage = () => {
    const dispatch = useDispatch()

    let state = useSelector(state=>state)
    let currentUser = state.session.user
    let trialsOfUser = state.trials.trials
    
    useEffect(()=>{
        dispatch(fetchUserTrials())
    },[dispatch])
    console.log('SHOW ME STATE',trialsOfUser)
if (!trialsOfUser) return null
else
    return (
      <>
        <h1>
          Welcome {currentUser.title} {currentUser.name}
        </h1>
        <div className="trials conteiner">Trials:
          {Object.values(trialsOfUser).map((trial) => (
            <div key = {trial.id} id='trials-list'>
            <NavLink to={`/trials/@me/${trial.id}`}>{trial.subject}</NavLink>
            </div>
          ))}
        </div>
      </>
    );
}
export default SummeryPage