import { useEffect, useState } from 'react';
import RadarChart from './RadarChart';
import classes from './charts.module.css'
import { getBOption, getTOption, getCytokineOption } from './charts.js';
function ChartPage(props){
    const [results, setResults] = useState([])
    const [renderFlag, setRenderFlag] = useState(false)

    useEffect(()=>{
        setResults(props.getResults());
        // console.log(results)
    },[props])
    
    useEffect(()=>{
        setRenderFlag(!renderFlag)
    },[results])

    return (
        <div>
            <div className={classes.chartArea}>
                <RadarChart getData={()=>processForBChart(results)}
                    getOption={getBOption}
                    chartType={'B'}/>
            </div>

            <div className={classes.chartArea}>
                <RadarChart getData={()=>processForTChart(results)}
                    getOption={getTOption}
                    chartType={'T'}/>
            </div>


            <div className={classes.chartArea}>
                <RadarChart getData={()=>processForCytokineChart(results)}
                    getOption={getCytokineOption}
                    chartType={'Cytokine'}/>
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


    let mins = [NEUdivCD19[0], NEUdivLYMF[0], CD19divCD8[0], CD19divCD4[0]];
    let vals = [NEUdivCD19[1], NEUdivLYMF[1], CD19divCD8[1], CD19divCD4[1]];
    let max = [NEUdivCD19[2], NEUdivLYMF[2], CD19divCD8[2], CD19divCD4[2]];
    return{
        "min":mins,
        'values':vals,
        "max":max
    }
}


function processForTChart(results){
    let NEU = getValueAndParambyAddName(results,"NEU");
    let LYMF = getValueAndParambyAddName(results,"LYMF");
    let CD3 = getValueAndParambyAddName(results,"CD45+CD3+");
    let CD4 = getValueAndParambyAddName(results,"CD45+CD3+CD4+");
    let CD8 = getValueAndParambyAddName(results,"CD45+CD3+CD8+");

    let NEUdivCD3 =  divide(NEU, CD3)
    let NEUdivCD4 =  divide(NEU, CD4)
    let NEUdivCD8 =  divide(NEU, CD8)
    let NEUdivLYMF =  divide(NEU, LYMF)


    let mins = [NEUdivCD3[0], NEUdivLYMF[0], NEUdivCD8[0], NEUdivCD4[0]];
    let vals = [NEUdivCD3[1], NEUdivLYMF[1], NEUdivCD8[1], NEUdivCD4[1]];
    let max = [NEUdivCD3[2], NEUdivLYMF[2], NEUdivCD8[2], NEUdivCD4[2]];
    return{
        "min":mins,
        'values':vals,
        "max":max
    }
}

function processForCytokineChart(results){
    let TNFa_stim = getValueAndParambyId(results, 38);
    let TNFa_spon = getValueAndParambyId(results, 39);
    let fno = divide(TNFa_stim, TNFa_spon);
    
    let IFNy_stim = getValueAndParambyId(results, 36);
    let IFNy_spon = getValueAndParambyId(results, 37);
    let infer = divide(IFNy_stim, IFNy_spon);

    let IL2_stim = getValueAndParambyId(results, 40);
    let IL2_spon = getValueAndParambyId(results, 41);
    let inlink = divide(IL2_stim, IL2_spon);

    let mins = [80,     80,       80];
    let vals = [fno[1], infer[1], inlink[1]];
    let max  = [120,    120,      120];
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

function getValueAndParambyId(results, id){
    if(results!==null){
    for(var p of results){
        if(p.parameter.id===id)
        return [p.parameter.refMin ,p.value, p.parameter.refMax]
    }}
    return [0,0,0]
}

function divide(first, sec){
    let min =  sec[0] != 0 ? (first[0]/sec[0]).toFixed(2) : 0;
    let val =  sec[1] != 0 ? (first[1]/sec[1]).toFixed(2) : 0;
    let max =  sec[2] != 0 ? (first[2]/sec[2]).toFixed(2) : 0;
    let finalMin = Math.min(min, max);
    let finalMax = Math.max(min, max)
    return [finalMin,val,finalMax]
}

export default ChartPage;