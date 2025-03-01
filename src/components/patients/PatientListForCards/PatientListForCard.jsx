import React, { useState, useEffect } from 'react';
import PatientCard from './PatientCard/PatientCard.jsx'
import classes from './PatientListForCard.module.css'
import {ApiHost} from '../../../globals/globals.js';


function PatientListForCard(props){

    const [patients, setPatients] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [rerenderFlag, callRerender] = useState(false);
    
    useEffect(() =>{
        // console.log("rendered");
        fetch(ApiHost+'/patients/all', {
            method:"GET"
        })
        .then(resp => resp.json())
        .then(data=>{
            // console.log("data getted");
            console.log(data);
            setPatients(data);
            setLoading(false);
        },
        (error) => {
            setError(error.message);
        }) 
    },[rerenderFlag])
    
    const handlePatientDeletion = () =>{
        // console.log("deletion")
        setPatients([]);
        callRerender(!rerenderFlag);
    }

    const handlePatientInfo = (patient)=>{
        props.callbackInfo(patient);
    }


    if(error != null){
        return (
            <div>
                <div>
                    <h3>Пациенты</h3>
                    <p>{error.message}</p>
                </div>
            </div>

        )
    }else if(isLoading){
        return (
            <div>
                <div>
                    <h3>Пациенты</h3>
                    {isLoading && <p>Загрузка...</p>}
                </div>
            </div>
        )

    }
    else
    return (
        <div>
            <div className={classes.area}>
                <h3>Пациенты</h3>
                {patients.map(patient => <div key={patient.id}>
                    <PatientCard patient={patient}
                    deletionCallback={handlePatientDeletion} 
                    infoCallback = {handlePatientInfo}/> 
                    </div>)}
            </div>
        </div>
    )
   
}


export default PatientListForCard;


