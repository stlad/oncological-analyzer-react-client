import { useEffect, useState } from "react";
import { useNavigate, useParams,Link } from "react-router-dom";
import { ApiHost } from "../../globals/globals";
import ParameterList from "./catalog/ParameterList";
import TestList from "./TestList/TestList";
import PatientForm from "../patients/PatientForm/PatientForm";
import classes from './TestPage.module.css'
import ChartPage from "../charts/ChartPage";
function TestPage (props){
    let { patientId } = useParams();
    const [patient, setPatient] = useState({id:-1});
    const [test, setTest] = useState(null);
    const [results, setResults] = useState(null);

    const getPatientFromServer = (id) =>{
        fetch(ApiHost + '/patients/' + id,{
            method:"GET"
        }).then(resp => resp.json())
        .then(pat => {
            //console.log(pat);
            setPatient(pat)
        })
        //.then(console.log(patient));
    }


    useEffect(()=>{
        getPatientFromServer(patientId);

    },[])

    const getPatient = () =>{
        return patient;
    }

    const testCallback = (test)=>{
        setTest(test);
    }

    const resultsCallback = (res)=>{
        setResults(res)
    }

    

    return (
        <div >
            <div className={classes.row}>
            <PatientForm  getPatient={()=>patient} />
            <TestList getPatient={()=>patient}
            testCallback= {testCallback}/>
            
            <ChartPage getResults={()=>results} />
            <ParameterList resutlsCallback={resultsCallback} getTest={()=>test}/>
            </div>
            <footer>
                <Link to='/' >На главную</Link>
                <Link to='/recommendations' >Конструктор рекомендаций</Link>
            </footer>
        </div>
    )
}

export default TestPage;