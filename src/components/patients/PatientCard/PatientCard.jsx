import React, { Component, useState } from 'react';
import classes from './PatientCard.module.css'

function PatientCard(props){
    const [state, setState] = useState({
        id: props.patient_id == null ? -1 : props.patient_id,
        name:"Иван",
        lastname:"Иванов",
        patronymic:"Иванович",
        diagnosis:"C50",
        birthdate:"1963-11-10"
    })

    return(
        <div className={classes.card}>
            <div className={classes.innerCard}>
                <p>{state.lastname} {state.name} {state.patronymic}</p>
                <p>{state.birthdate} ({getAge(state.birthdate, Date.now())} лет)</p>
                <p>{state.diagnosis}</p>
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