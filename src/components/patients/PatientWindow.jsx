import React, { useState, useEffect } from 'react';
import PatientForm from "./PatientForm/PatientForm"
import PatientListForCard from "./PatientListForCards/PatientListForCard"
import classes  from './PatientWindow.module.css'
import { ApiHost, getEmptyPatientTemplate } from "../../globals/globals"


const PatientWindow = () =>{
    const [currentPatientId, setCurrentPatientId] = useState(-1);
    const [currentPatient, setCurrentPatient] = useState(getEmptyPatientTemplate());
    const [isLoading, setLoading] = useState(true);

    useEffect(()=>{
        console.log("mounted")
        if(currentPatientId === -1) return;
        console.log(currentPatientId)
        fetch(ApiHost + "/patients/" + currentPatientId, {
            method:"GET"})
        .then(resp =>resp.json())
        .then(data=>{
            setCurrentPatient(data);
            setCurrentPatientId(data.id);
            setLoading(false);
        })
        .then(console.log(currentPatient))
    }
    ,[currentPatientId])


    const extractPatient = () =>{
        return currentPatient;
    }

    const handlePatiendChanging = (patientId)=>{
        setCurrentPatientId(patientId)
    }

    const handleNewPatient = () =>{
        setCurrentPatientId(-1);
    }

    const handleFromSubmit = () =>{
        console.log("submitted");
    }

    if(isLoading){
        <div className={classes.patientsList}>
        <PatientListForCard callbackInfo={handlePatiendChanging}/>
        
        {isLoading && <p>Загрузка...</p>}

        </div>
    }
    return(
        <div className={classes.patientsList}>
        <PatientListForCard callbackInfo={handlePatiendChanging}/>
        <PatientForm getPatient={extractPatient} 
        onSubmit={handleFromSubmit}
        />

        </div>
    )
}

export default PatientWindow