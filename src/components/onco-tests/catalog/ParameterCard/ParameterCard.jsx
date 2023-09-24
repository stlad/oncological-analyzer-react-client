import { useState, useEffect } from "react"
import { ApiHost } from "../../../../globals/globals"
import classes from './ParameterCard.module.css'

function ParameterCard(props){
    
    const [result, setResult] = useState({value:0})
    const [parameter, setParameter] = useState({})
    const [isLoaded, setLoaded] = useState(false);
    const [isSaved, setSaved] = useState(true)

    useEffect(()=>{
        setParameter(props.getParameter())
        setResult(props.getResult())
        setLoaded(true);
    },[props])
    
    const handleValueChanged = (evt)=>{
        const name = evt.target.name;
        const value = evt.target.value;
        setResult({
            ...result,
            ["value"]: value
        })
        props.getResult()['value']=Number(value)
        setSaved(false);
    }

    const handleSaveValue = ()=>{
        fetch(ApiHost+'/results/',{
            method:"PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body:JSON.stringify(result)
        }).then(data => setSaved(true))
        
    }

    return (
        <div>
            <div className={classes.card} >
                <p>{parameter.name} ({parameter.additionalName})</p>
                <p>[{parameter.refMin} - {parameter.refMax}] ,{parameter.unit}</p>
                <div>
                    {!isSaved && <button onClick={handleSaveValue}>Сохранить</button>}
                    <input type='number' value={result != null ? result.value : 0} onChange={handleValueChanged}></input>
                </div>
            </div>
        </div>
    )
}

export default ParameterCard;