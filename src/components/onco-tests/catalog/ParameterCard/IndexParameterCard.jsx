import { useState, useEffect } from "react"
import { ApiHost } from "../../../../globals/globals"
import classes from './ParameterCard.module.css'

function IndexParameterCard(props){

    const [results, setResults] = useState([])
    const [index, setIndex] = useState([])
    
    useEffect(()=>{
        setResults(props.getResults());
        setIndex(calculateIndex(results, props.fName, props.fAddname, props.sName, props.sAddname))
    },[props])
    // props.fName
    // props.fAddname
    // props.sName
    // props.sAddname
    // props.getResults()





    return (
        <div>
            <div className={classes.card} >
                <p>Соотношение: {}</p>
                <p>{props.fName} ({props.fAddname}) / </p>
                <p>{props.sName} ({props.sAddname})</p>
                <p>[{index[0]} - {index[2]}]</p>
                <div>
                    <input type='number' value={index[1] != null ? index[1] : 0} enabled={false} ></input>
                </div>
            </div>
        </div>
    )
}


function getValueAndParambyAddName(results, paramName, paramAddname){
    if(results!==null){
    for(var p of results){
        if(p.parameter.additionalName===paramAddname &&
            p.parameter.name===paramName)
        return [p.parameter.refMin ,p.value, p.parameter.refMax]
    }}
    return [0,0,0]
}

function calculateIndex(results, fName,fAddname, sName,sAddname){
    let first = getValueAndParambyAddName(fName, fAddname);
    let sec = getValueAndParambyAddName(sName, sAddname);
    let min =  sec[0] != 0 ? (first[0]/sec[0]).toFixed(2) : 0;
    let val =  sec[1] != 0 ? (first[1]/sec[1]).toFixed(2) : 0;
    let max =  sec[2] != 0 ? (first[2]/sec[2]).toFixed(2) : 0;
    return [min, val, max]
}
export default IndexParameterCard;