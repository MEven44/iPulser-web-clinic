import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useHistory , Redirect} from 'react-router-dom'
import { getAllTreatments } from '../../store/treatments'

import { fetchUserTrials } from '../../store/trials'
import TrialUpdateModal from '../TrialModal' 
import './summery.css'


const SummeryPage = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  
  
  let state = useSelector(state=>state)
  let currentUser = state.session.user
  let trialsOfUser = state.trials.trials
  let treatments = state.treatments.treatments
  
  console.log('SHOW ME TREATMENTS OBN SUMMERY PAGE' , treatments)
  
  function filterTreatments (trialId) {
    let result = []
   if (treatments) {
        result = Object.values(treatments).filter(treatment=>treatment.trial_id === trialId)
   }
   return result
  }
   
  const treatmentControlCenterRedirect = (treatmentId) => {
    history.push(`/treatments/freq/${treatmentId}`)
  }


    useEffect(() => {
      dispatch(fetchUserTrials());
      dispatch(getAllTreatments())
    }, [dispatch]);
 
   const [trialSummery, setTrialSummery] = useState(false)
    


if (!trialsOfUser) return null
if (!currentUser)  return <Redirect to='/' />
else
    return (
      <>
        <h1>
          Welcome {currentUser.title} {currentUser.name}
        </h1>
        <div className="trials-conteiner">
          <h2>Trials:</h2>
          <div className="general-buttons">
            <div id="g-bttn" onClick={() => setTrialSummery(true)}>
              Trials Details
            </div>
            <div id="g-bttn" onClick={() => setTrialSummery(false)}>
              X minimize details
            </div>
          </div>
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
                      Create a treatment
                    </NavLink>
                  </button>
                </div>
                {trialSummery && (
                  <div className="trial-summery">
                    <div className="title"></div>
                    <div className="trial-content">
                      <div id="content">
                        initiated at:
                        {trial.created_at.slice(0, 17)}
                      </div>
                      <div id="content">
                        Scope:
                        {trial.trial_scope}
                      </div>
                      <div id="content">
                        details:
                        {trial.description}
                      </div>
                      {filterTreatments(trial.id).map((treatment) => {
                        return (
                          <>
                            <div id="content">{treatment.treatment_name}</div>
                            <div id="content">
                              {treatment.frequencies.map((freq) => (
                                <div id="content">
                                  frequencies:
                                  <li>{freq.freq}</li>
                                </div>
                              ))}
                            </div>
                            <div id="content">{treatment.comments}</div>
                            <button
                              onClick={() =>
                                treatmentControlCenterRedirect(treatment.id)
                              }
                            >
                              Change treatment
                            </button>
                          </>
                        );
                      })}
                    </div>
                  </div>
                )}
              </>
            );
          })}
        </div>
      </>
    );
}
export default SummeryPage