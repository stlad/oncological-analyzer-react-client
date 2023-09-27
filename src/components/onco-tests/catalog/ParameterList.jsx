import { useState, useEffect } from "react"
import { ApiHost } from "../../../globals/globals"
import ParameterCard from "./ParameterCard/ParameterCard"
import IndexParameterCard from "./ParameterCard/IndexParameterCard"
function ParameterList(props){
    const [catalog, setCatalog] = useState(null)
    const [isCatalogLoaded, setCatalogLoaded] = useState(false)
    const [test, setTest] = useState(null)
    const [results, setResults] = useState(null)
    const [isResultsLoaded, setResultsLoaded] = useState(false)
    const [rerenderFlag, setFlag] = useState(true)

    
    useEffect(()=>{
        getCatalogFromServer();
    },[isCatalogLoaded])
    
    useEffect(()=>{
        setTest(props.getTest());
        setResultsLoaded(false)
    },[props])

    useEffect(()=>{props.resutlsCallback(results)},[results])

    useEffect(()=>{getResultsFromServer()},[test])

    const getCatalogFromServer = ()=>{
        fetch(ApiHost+'/catalog/all/grouped',{
            method:"GET"
        })
        .then(resp => resp.json())
        .then(cat => {
            setCatalog(cat);
            setCatalogLoaded(true)
        })
        .then(data=>{
        })
        
    } 

    const getResultsFromServer = ()=>{

        if(test != null)
        fetch(ApiHost+'/results/'+test.id+'/all',{
            method:"GET"
        }).then(resp=>resp.json())
        .then(res=>{
            setResults(res)
            setResultsLoaded(true)
        })
    }
    
    const handlechanging = ()=>{
        setFlag(!rerenderFlag);
        props.resutlsCallback(results);
    }

    if(!isCatalogLoaded || catalog==null){
    return (
        <div>
            <div>
                <h3>Результаты</h3>
                {!isCatalogLoaded && <p>Загрузка...</p>}
            </div>
        </div>
    )}

    else
    return (
        <div>
            {test!==null && <div onChange={handlechanging}>
                <h3>Результаты</h3>
                {test != null ? test.testDate : ""}
                <h4>Результаты гематологического исследования</h4>
                {catalog['Hematological'].map(param => <div key={param.id}> 
                <ParameterCard 
                        getResult={()=>getResByCatalogId(results, param.id)}
                        getParameter={()=>param}/> 
                    </div>)}
                <h4>Иммунный статус</h4>
                {catalog['Immunological'].map(param => <div key={param.id}>
                    <ParameterCard 
                        getResult={()=>getResByCatalogId(results, param.id)}
                        getParameter={()=>param}/> 
                        </div>)}
                <h4>Цитокиновый статус</h4>
                {catalog['Cytokine'].map(param => <div key={param.id}>
                    <ParameterCard 
                        getResult={()=>getResByCatalogId(results, param.id)}
                        getParameter={()=>param}/> 
                    </div>)}
                <h4>Соотношения</h4>
                {/* <IndexParameterCard  getResults={()=>results} 
                fName='' fAddname={} sName={} sAddname={}/> */}
                <IndexParameterCard flag={rerenderFlag} getResults={()=>results} fIndex={11} sIndex={12} />
                <IndexParameterCard flag={rerenderFlag} getResults={()=>results} fIndex={20} sIndex={21} />
                <IndexParameterCard flag={rerenderFlag} getResults={()=>results} fIndex={22} sIndex={23} />
            </div>}
        </div>
    )
}

function getResByCatalogId(results, parameterId){
    if(results == null) return null
    for(var res of results){
        if(res.parameter.id ===parameterId)
            return res;
    }
    return null;
}

export default ParameterList;