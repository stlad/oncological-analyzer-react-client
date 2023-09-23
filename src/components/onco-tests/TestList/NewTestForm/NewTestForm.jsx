import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { ApiHost } from '../../../../globals/globals';

function NewTestForm(props){

    const [date, setDate] = useState("")
    useEffect(()=>{
        console.log(props.patientId)

    },[])

    const handleChange = (evet) =>{
        let newVal = evet.target.value;
        setDate(newVal)
    }

    const handleSubmit= () =>{
        if(date !== null && date !== "")
        fetch(ApiHost+`/results/tests/new?owner_id=${props.patientId}&test_date=${date}`,{
            method:"POST",
        })

    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h3>Новый анализ</h3>
                <input type='date'  value={date} onChange={handleChange}/>
                <input type='submit'/>
            </form>
        </div>
    )


}

export default NewTestForm