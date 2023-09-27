import { useState, useEffect } from "react"
import { ApiHost } from "../../../../globals/globals"
import classes from './ParameterCard.module.css'

function IndexParameterCard(props){

    const [results, setResults] = useState(null)
    const [index, setIndex] = useState([0,0,0])
    const [firstRes, setFirst] = useState({parameter:{name:null, addictionalName:null}, value:0})
    const [secondRes, setSecond] = useState({parameter:{name:null, addictionalName:null}, value:0})

    useEffect(()=>{
        setResults(props.getResults());
        if(results===null || results==[]) return 
        setFirst(getValueAndParambyId(results, props.fIndex));
        setSecond( getValueAndParambyId(results, props.sIndex));

        setIndex(calculateIndex(results, firstRes, secondRes))
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
                <p>{firstRes.parameter.name} ({firstRes.parameter.additionalName}) /</p> 
                <p>{secondRes.parameter.name} ({secondRes.parameter.additionalName})</p>
                <p>[{index[0]} - {index[2]}]</p>
                <div>
                    {index[1] != null ? index[1] : 0} 
                </div>
            </div>
        </div>
    )
}

function getValueAndParambyId(results, id){
    if(results!==null){
    for(var p of results){
        if(p.parameter.id===id)
        return p
    }}
    return null;
}


function calculateIndex(results, fres, sres){
    let first = [fres.parameter.refMin, fres.value, fres.parameter.refMax];
    let sec = [sres.parameter.refMin, sres.value, sres.parameter.refMax];
    let min =  sec[0] != 0 ? (first[0]/sec[0]).toFixed(2) : 0;
    let val =  sec[1] != 0 ? (first[1]/sec[1]).toFixed(2) : 0;
    let max =  sec[2] != 0 ? (first[2]/sec[2]).toFixed(2) : 0;
    return [min, val, max]
}
export default IndexParameterCard;