
import { useEffect, useState } from "react";
import { useNavigate, useParams,Link } from "react-router-dom";
import { ApiHost } from "../../globals/globals";
import RecTableRow from "./RecTableRow";


function RecMainPage (props){
    const [expressions, setExpressions] = useState(null);
    
    useEffect(()=>{
        fetch(ApiHost + '/recommendations/',{
            method:"GET"
        }).then(resp => resp.json())
        .then(exprs => {
            console.log(exprs);
            setExpressions(exprs)
        })

    },[])

    if(expressions===null)
    {
        return (
            <div>Грузятся</div>
        )
    }

    return (
        <div>
            <div>
                <div>Тут будет конструктор</div>
                    {expressions.map(expr => <div key={expr.id}>
                        <RecTableRow getExpression={()=>expr} />
                    </div>)}

                
                
            </div>
            <footer>
                <Link to='/' >На главную</Link>
            </footer>
        </div>
    )
}


export default RecMainPage;