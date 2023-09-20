import React, { useState, useEffect } from 'react';
import PatientCard from './PatientCard/PatientCard.jsx'
import classes from './PatientListForCard.module.css'
import ApiHost from '../../../globals/globals.js';


function PatientListForCard(props){
    const [upd, setUpd] = useState(true);
    const [patients, setPatients] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    console.log("mounted");
    
    useEffect(() =>{
        fetch(ApiHost+'/patients/all', {
            method:"GET"
        })
        .then(resp => resp.json())
        .then(data=>{
            // console.log(data);
            setPatients(data);
            setLoading(false);
        },
        (error) => {
            setError(error.message);
        }) 
    },[])
    
    const handleCardClicked = (event) =>{
        // TODO ОБНОВЛЕНИЕ СТРАНИЦЫ ПРИ ЭТОМ СОБЫТИИ (УДАЛИНЕИЕ ПАЦИЕНТА
        console.log(event);
        setUpd(!upd);
        console.log(upd);
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
                {patients.map(patient => <div onClick={handleCardClicked} key={patient.id}><PatientCard   patient={patient}/> </div>)}
            </div>
        </div>
    )
   
}


export default PatientListForCard;


