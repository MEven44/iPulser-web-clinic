import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import './welcome.css'


function Welcome() {
  const history = useHistory()
  let loginSignUp = () => {
    history.push("/login-signup");
  };
  
  let currentUser = useSelector((state) => state.session.user);

  return (
    <div id="general">
      {!currentUser &&
        <button onClick={loginSignUp}>
          Clinicians Login <i class="fa-solid fa-door-open" />
        </button>
      }
      <h1>Chronic pain is real</h1>
      <h2>WE CAN HELP</h2>
      <div id="welcome-video">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/jhMJh_3Se6Q"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  );
}

export default Welcome;
