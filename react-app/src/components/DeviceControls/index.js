import React from 'react'
import { useSelector } from 'react-redux';



function DeviceBluetooth () {

// ********************* DB to get info for commands ************************
let TreatmentsState = useSelector(state=>state.treatments)
console.log("BLUETOOTH PAGE")

// *************************helper functions ********************************
    // call the device
    async function connectDevice() {
				
        const device = await navigator.bluetooth.requestDevice({
            filters: [{ namePrefix: 'iPulser' }],
            optionalServices: [serviceUUID],
        });
    }
    //  detect if the device disconnect
    nevigator.bluetooth.requestDevice({
        filters: [{namePrefix: 'iPulser'}],
        optionalService: [serviceUUID]
    }).then(device=> {
        device.addEventListener('gattserverdisconnected', onDisconnected);

        return device.gatt.connect();
    })
    .then(server=> {})
    .catch(error=> { console.error(error)})
 
    function onDisconnected(event) {
        const device = event.target
        console.log(`Device ${device.namePrefix} is disconnected`)
    }
    
        return (
            <>
                <div onClick={connectDevice}>Connect iPulser</div>

                <div onClick={device.gatt.disconnect()}>Disconnect iPulser</div>


            </>
        )



}

export default DeviceBluetooth