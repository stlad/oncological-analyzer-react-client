import React, { Component, useState } from 'react';
import classes from './PatientCard.module.css'

function PatientCard(props){
    const [pat, setpat] = useState({
        id: props.patient.id == null ? -1 : props.patient.id,
        name:props.patient.name,
        lastname:props.patient.lastname,
        patronymic:props.patient.patronymic,
        diagnosis:props.patient.diagnosis,
        birthdate:props.patient.birthdate
    })

    
    return(
        <div className={classes.card}>
            <div>
                <div className={classes.cardBtn} >X</div>
            </div>
            <div className={classes.innerCard}>
                <p>{pat.id}</p>
                <p>{pat.lastname} {pat.name} {pat.patronymic}</p>
                <p>{pat.birthdate} ({getAge(pat.birthdate, Date.now())} лет)</p>
                <p>{pat.diagnosis}</p>
            </div>
            
            <div>
                <div className={classes.cardBtn}>Анализы</div>
            </div>
        </div>
    )
}

function getAge(birth, moment){
    var birthDate = new Date(birth);
    var last = new Date(moment);
    var age = last.getFullYear() - birthDate.getFullYear();
    return age
}

export default PatientCard;