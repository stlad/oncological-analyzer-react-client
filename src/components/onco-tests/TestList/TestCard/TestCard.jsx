import { useParams} from "react-router-dom"
import { useState, useEffect } from "react"
import classes from './TestCard.module.css'

function TestCard(props){

    const [test, setTest] = useState(props.getTest())

    const handleDeletion = (testId)=>{

    }

    return (
        <div className={classes.card}>
            <div className={classes.innerCard}>
                <p>{test.testDate}</p>
                <p>({getAge(test.patientOwner.birthdate, test.testDate)} лет)</p>
            </div>
            <div className={classes.cardBtn}  onClick={()=>handleDeletion(test.id)}>X</div>
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

export default TestCard;