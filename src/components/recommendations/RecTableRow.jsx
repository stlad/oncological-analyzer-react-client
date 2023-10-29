import { useEffect, useState } from "react";
import { useNavigate, useParams,Link } from "react-router-dom";
import { ApiHost } from "../../globals/globals";


function RecTableRow (props){
    const [expression, setExpressions] = useState(props.getExpression())
    useEffect(()=>{
    },[])


    function handleInputChange(evt) {
        const name = evt.target.name;
        const value =evt.target.value;
          setExpressions({
          ...expression,
          [name]: value ==="" ? null : value
        })
        
      }
    function handleSubmit(){
        fetch(ApiHost + '/recommendations/',{
            method:"PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body:JSON.stringify(expression)
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <textarea value={expression.expression ?? ""} placeholder='Выражение' onChange={handleInputChange} name="expression"></textarea>
                <textarea value={expression.trueResult ?? ""} placeholder='Если истинно' onChange={handleInputChange} name="trueResult"></textarea>
                <textarea value={expression.falseResult ?? ""} placeholder='Если ложно'onChange={handleInputChange} name="falseResult"></textarea>
                <textarea value={expression.cause ?? ""} placeholder='Причина'onChange={handleInputChange} name="cause"></textarea>
                <label>Включено 
                    <input type='checkbox' placeholder='Используется' ></input>
                </label>

                <input type='submit' placeholder="сохранить"></input>
            </form>
        </div>
    )
}


export default RecTableRow;