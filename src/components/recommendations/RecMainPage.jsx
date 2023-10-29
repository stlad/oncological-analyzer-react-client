
import { useEffect, useState } from "react";
import { useNavigate, useParams,Link } from "react-router-dom";
import { ApiHost } from "../../globals/globals";


function RecMainPage (props){
    const [expressions, setExpressions] = useState(null);
    
    useEffect(()=>{
        fetch(ApiHost + '/recommendations/',{
            method:"GET"
        }).then(resp => resp.json())
        .then(exprs => {
            console.log(exprs);
            setExpressions(expressions)
        })

    },[])

    return (
        <div>
            <div>рекомендации</div>
            <footer>
                <Link to='/' >На главную</Link>
            </footer>
        </div>
    )
}


export default RecMainPage;