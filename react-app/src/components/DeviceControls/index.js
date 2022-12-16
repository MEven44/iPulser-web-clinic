import React from 'react'
import { useEffect, useState } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import {getAllTreatments} from '../../store/treatments'
import './control.css'

function DeviceBluetooth () {

// ********************* hooks ************************
let TreatmentsState = useSelector(state=>state.treatments.treatments)


const dispatch = useDispatch()

useEffect(()=>{
    dispatch(getAllTreatments())
},[dispatch])
    
const [freq, setFreq] = useState()
const [time, setTime] = useState()

// *************************helper functions ********************************
    // call the device
		    const serviceUUID = '49535343-FE7D-4AE5-8FA9-9FAFD205E455'.toLowerCase()	
        const TransmitUUID =
          "49535343-1E4D-4BD9-BA61-23C647249616".toLowerCase();	
        const recievedUUID =
          "49535343-8841-43F4-A8D4-ECBE34729BB3".toLowerCase();	
          const BleUUID = '9801'

   function connectDevice() {
      
        navigator.bluetooth.requestDevice({
             filters: [{ namePrefix: "iPulser" }],
           optionalService: [serviceUUID],
         })
         .then((device) => {
           device.gatt.connect();
         })
         .catch((error) => console.error(error));
       
    }

    //  async function disconnectDevice() {
    //    console.log("HIT DISCONNECT");
    //    const device = await navigator.bluetooth
    //      .requestDevice({
    //        filters: [{ namePrefix: "iPulser" }],
    //        optionalService: [serviceUUID],
    //      })
    //      .then((device) => {
    //        device.gatt.disconnect();
    //      }).then(console.log('the device disconnected'))
    //      .catch((error) => console.error(error));
    //    // const server = await device.gatt.connect();

    //    // const service = await server.getPrimaryService(serviceUUID);
    //  }


// const Logger = {
//   log: function () {
//     var line = Array.prototype.slice
//       .call(arguments)
//       .map(function (argument) {
//         return typeof argument === "string"
//           ? argument
//           : JSON.stringify(argument);
//       })
//       .join(" ");

//     document.querySelector("#log").textContent += line + "\n";
//   },
//   clearLog: function () {
//     document.querySelector("#log").textContent = "";
//   },
// };
//     let returnValue = "";
//     const log = Logger.log;
//     const decoder = new TextDecoder("utf8");

//     function handleNotifications(event) {
//       let value = event.target.value;
//       const val = decoder.decode(value);
//       // console.log(value);
//       log("return value = " + val);
//       returnValue = val;
//     }

   
    // async function addFreqPlayFreq() {

    //   console.log('Time and freq', time, freq)
    //   navigator.bluetooth
    //     .requestDevice({
    //       filters: [{ namePrefix: "iPulser" }],
    //       optionalService: [serviceUUID],
    //     })
    //     .then((device) => device.gatt.connect())
    //     .then((server) => server.getPrimaryService(serviceUUID))
    //     .then((service) => service.getCharacteristic(TransmitUUID))
    //     .then((characteristic) => {
    //       console.log("show me chrasteristic", characteristic)
    //       const command = `#01!`;
    //       characteristic.writeValue(command);
    //     })
    //     .then((event) => setTimeout(console.log('SHOW ME THE EVENT', event), 2000))
    //     .catch(error=>{console.error(error)})
        
    // }
 
  // ***************************element*****************************
        return (
          <>
            <div onClick={connectDevice} id="buttons">
              <i className="fa-solid fa-wifi" />
              Connect iPulser
            </div>

            {/* <div onClick={disconnectDevice} id="buttons">
              <i className="fa-solid fa-wifi" />
              DisConnect iPulser
            </div> */}

           
            <form id="form" >
              <input
                id="freq"
                type="text"
                placeholder="Frequency between 0.5-15,000"
                name="freq"
                value={freq}
                onChange={(e) => setFreq(e.target.value)}
              />
              Hz
              <input
                id="time"
                type="text"
                placeholder="Time in minutes"
                name="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
              minutes
              <button type="submit">Emit</button>
            </form>
          </>
        );



}

export default DeviceBluetooth