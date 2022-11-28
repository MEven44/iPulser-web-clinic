import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchUserTrials } from '../../store/trials'
import TrialUpdateModal from '../TrialModal' 



const SummeryPage = () => {
    const dispatch = useDispatch()
    

    let state = useSelector(state=>state)
    let currentUser = state.session.user
    let trialsOfUser = state.trials.trials
    
    useEffect(() => {
      dispatch(fetchUserTrials());
    }, [dispatch]);
 
if (!trialsOfUser) return null
else
    return (
      <>
        <h1>
          Welcome {currentUser.title} {currentUser.name}
        </h1>
        <div className="trials conteiner">Trials:
          {Object.values(trialsOfUser).map((trial) => {
            console.log("SUMMERY PAGE", trial)
            return (
              <>
                <TrialUpdateModal trial={trial} />
              </>
            );})}        
        </div>
      </>
    );
}
export default SummeryPage