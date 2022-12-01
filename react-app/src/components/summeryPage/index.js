import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom'
import { getTreatmentsOfTrial, getAllTreatments } from '../../store/treatments'

import { fetchUserTrials } from '../../store/trials'
import TrialUpdateModal from '../TrialModal' 



const SummeryPage = () => {
  const dispatch = useDispatch()
  const history = useHistory()
    

    let state = useSelector(state=>state)
    let currentUser = state.session.user
    let trialsOfUser = state.trials.trials
    
    
    
    useEffect(() => {
      dispatch(fetchUserTrials());
      dispatch(getAllTreatments())
    }, [dispatch]);
 
   const [trialSummery, setTrialSummery] = useState(false)
    


if (!trialsOfUser) return null
else
    return (
      <>
        <h1>
          Welcome {currentUser.title} {currentUser.name}
        </h1>
        <div className="trials conteiner">Trials:
          {Object.values(trialsOfUser).map((trial) => {
            
            return (
              <>
                <div className="trial-name">
                  {trial.subject}
                  <TrialUpdateModal trial={trial} />
                  <button>
                    <NavLink
                      id="a-nav"
                      to={`/treatments/${trial.id}`}
                      exact={true}
                      activeClassName="active"
                    >
                      treatment controls
                    </NavLink>
                  </button>
                  <button onClick={() => setTrialSummery(true)}>
                    Trial Summery
                  </button>
                </div>
                {trialSummery && (
                  <div className="trial-summery">
                    <div className="title">
                      <h2>{trial.subject}</h2>
                      <div onClick={() => setTrialSummery(false)}>X</div>
                    </div>
                    <div className="trial-content">
                      <div>
                        initiated at:
                        {trial.created_at.slice(0, 17)}
                      </div>
                      <div>
                        Scope:
                        {trial.trial_scope}
                      </div>
                      <div>
                        details:
                        {trial.description}
                      </div>
                      
                                      
                    </div>
                  </div>
                )}
              </>
            );})}        
        </div>
        
      </>
    );
}
export default SummeryPage