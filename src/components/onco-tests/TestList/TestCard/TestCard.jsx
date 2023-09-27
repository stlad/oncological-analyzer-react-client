import { useParams} from "react-router-dom"
import { useState, useEffect } from "react"
import classes from './TestCard.module.css'
import {ApiHost} from './../../../../globals/globals.js'

function TestCard(props){

    const [test, setTest] = useState(props.getTest())

    const handleDeletion = (testId)=>{
        fetch(ApiHost+'/results/tests/'+testId,{
            method:"DELETE"
        }).then(data => props.deletionCallBack())
    }

    const handleCardClick = ()=>{
        props.callbackTest(test);
    }
    


    return (
        <div className={classes.card}>
            <div className={classes.innerCard} onClick={handleCardClick}>
                <p>{test.testDate} ({getAge(test.patientOwner.birthdate, test.testDate)} лет)</p>
                <p></p>
                <p>Сезон: {getSeason(test.testDate)}</p>
            </div>
            <div className={classes.cardBtn}  onClick={()=>handleDeletion(test.id)}>Удалить</div>
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


function getSeason(moment){
    var date = new Date(moment);
    var month = date.getMonth(); // [2:7] - весна, [0:1]+[8:11] - осень
    if(month >= 2 && month <= 7)
        return "Весна";
    else
        return "Осень";
}

export default TestCard;