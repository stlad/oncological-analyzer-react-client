import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import {ApiHost} from '../../../globals/globals.js';
import TestCard from './TestCard/TestCard.jsx'; 

function TestList(props){

    const [patient, setPatient] = useState({})
    const [tests, setTests] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [transferTest, setTransferTest] = useState(null);

    const [rerenderFlag, callRerender] = useState(false);
    
    let { patientId } = useParams();

    useEffect(() =>{
        setPatient(props.getPatient());
        fetch(ApiHost+'/results/tests/'+patientId+'/all', {
            method:"GET"
        })
        .then(resp => resp.json())
        .then(tests=>{
            setTests(tests);
            setLoading(false);
        },
        (error) => {
            setError(error.message);
        }) 
    },[rerenderFlag])


    const handleTestsDeletion = () =>{
        console.log("deletion")
        setTests([]);
        callRerender(!rerenderFlag);
    }

    const handlePatientInfo = (patient)=>{
        props.callbackInfo(patient);
    }

    const testCallback = (test)=>{
        props.testCallback(test);
    }

    if(error != null){
        return (
            <div>
                <div>
                    <h3>Анализы</h3>
                    <p>{error.message}</p>
                </div>
            </div>

        )
    }else if(isLoading || patient==null){
        return (
            <div>
                <div>
                    <h3>Анализы</h3>
                    {isLoading && <p>Загрузка...</p>}
                </div>
            </div>
        )

    }
    else
    return (
        <div>
            <div>
                <h3>Анализы</h3>
                {tests.map((test) => <div key={test.id}>
                    <TestCard
                    getTest={()=>test}
                    callbackTest={testCallback}
                    />
                </div>)}
            </div>
        </div>
    )
   
}


export default TestList;


