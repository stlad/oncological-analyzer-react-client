import React, { Component, useState  } from 'react';
import classes from './PatientCard.module.css'
import {ApiHost} from '../../../../globals/globals';

function PatientCard(props){
    const [pat, setPat] = useState({
        id : props.patient.id == null ? -1 : props.patient.id,
        name :props.patient.name,
        lastname :props.patient.lastname,
        patronymic :props.patient.patronymic,
        mainDiagnosis :props.patient.mainDiagnosis,
        birthdate :props.patient.birthdate,
        deathdate :props.patient.deathdate
    })


    const handleDeletion = (idToDelete) =>{
        fetch(ApiHost+'/patients/' + idToDelete, {
            method:"DELETE"
        })
        .then(resp => resp.json())
        .then(data=>{}, (error) => {})
        .then(()=>props.deletionCallback())
    }


    const handleInfo = (patientId)=>{
        props.infoCallback(patientId);
    }
    
    return(
        <div className={classes.card}>
            <div>
                <div className={classes.cardBtn}  onClick={()=>handleDeletion(pat.id)}>X</div>
            </div>
            <div className={classes.innerCard} key={"pat-dlt-btn-" + pat.id} onClick={()=>handleInfo(pat.id)}>
                {/* <p>{pat.id}</p> */}
                <p>{pat.lastname} {pat.name} {pat.patronymic}</p>
                <p>{pat.birthdate} - {pat.deathdate} ({getAge(pat.birthdate, pat.deathdate)} лет)</p>
                <p>{pat.mainDiagnosis}</p>
            </div>
            
            <div>
                <div className={classes.cardBtn}>Анализы</div>
            </div>
        </div>
    )
}

function getAge(birth, moment){
    if(moment==null) moment=Date.now();
    var birthDate = new Date(birth);
    var last = new Date(moment);
    var age = last.getFullYear() - birthDate.getFullYear();
    return age
}



export default PatientCard;