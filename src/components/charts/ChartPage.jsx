import { useEffect, useState } from 'react';
import RadarChart from './RadarChart';
import classes from './charts.module.css'
function ChartPage(props){
    const [results, setResults] = useState([])

    useEffect(()=>{
        setResults(props.getResults());
        console.log("CHAAAAN")
    },[props])

    return (
        <div>
            <div className={classes.chartArea}>
                <RadarChart getData={()=>processForBChart(results)}/>
            </div>


        </div>
    )
}

function processForBChart(results){

    let NEU = getValueAndParambyAddName(results,"NEU");
    let LYMF = getValueAndParambyAddName(results,"LYMF");
    // let CD3 = getValueAndParamFor(results,"CD45+CD3+");
    let CD4 = getValueAndParambyAddName(results,"CD45+CD3+CD4+");
    let CD19 = getValueAndParambyAddName(results,"CD45+CD19+");
    let CD8 = getValueAndParambyAddName(results,"CD45+CD3+CD8+");

    let CD19divCD4 =  divide(CD19, CD4)
    let CD19divCD8 =  divide(CD19, CD8)
    let NEUdivCD19 =  divide(NEU, CD19)
    let NEUdivLYMF =  divide(NEU, LYMF)


    let mins = [NEUdivCD19[0], CD19divCD4[0], CD19divCD8[0], NEUdivLYMF[0]];
    let vals = [NEUdivCD19[1], CD19divCD4[1], CD19divCD8[1], NEUdivLYMF[1]];
    let max = [NEUdivCD19[2], CD19divCD4[2], CD19divCD8[2], NEUdivLYMF[2]];
    return{
        "min":mins,
        'values':vals,
        "max":max
    }
}

function getValueAndParambyAddName(results, param){
    if(results!==null){
    for(var p of results){
        if(p.parameter.additionalName===param)
        return [p.parameter.refMin ,p.value, p.parameter.refMax]
    }}
    return [0,0,0]
}

function divide(first, sec){
    let min =  sec[0] != 0 ? (first[0]/sec[0]).toFixed(2) : 0;
    let val =  sec[1] != 0 ? (first[1]/sec[1]).toFixed(2) : 0;
    let max =  sec[2] != 0 ? (first[2]/sec[2]).toFixed(2) : 0;
    return [min,val,max]
}

export default ChartPage;