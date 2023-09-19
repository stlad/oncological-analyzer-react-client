import React, { useState, useEffect } from 'react';
import PatientCard from './PatientCard/PatientCard.jsx'
import classes from './PatientListForCard.module.css'
import ApiHost from '../../../globals/globals.js';


function PatientListForCard(props){
    const [patients, setPatients] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    
    useEffect(() =>{
        console.log("mounted");
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
                {patients.map(patient => <div><PatientCard key={patient.id}  patient={patient}/> </div>)}
            </div>
        </div>
    )
   
}

export default PatientListForCard;




const addCards = () => {
    let content = []
    // for(var item in {patients}){
    //     console.log(item)
    // }

    // for(let i=0; i<patients.length;i++){
    //     let pat = patients[i]
    //     console.log(pat);
    //     content.push(<div><PatientCard key={i}  patient={pat}/></div>)
    // }
    return content;
}
