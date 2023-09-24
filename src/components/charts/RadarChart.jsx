import { useEffect, useState } from 'react';
import { getBOption } from './charts.js';
import ReactECharts from 'echarts-for-react'; 

function RadarChart(props){
    const [min,setMin] = useState([0,0,0,0])
    const [values,setValues] = useState([0,0,0,0])
    const [max,setMax] = useState([0,0,0,0])
    const [option, setOption] = useState(props.getOption(min, values, max))

    useEffect(()=>{
        let data = props.getData();
        setMin(data.min);
        setMax(data.max)
        setValues(data.values)
        // console.log(values)
        setOption(props.getOption(min, values, max))
    },[props])

    useEffect(()=>{},[option])



    return(
        <div>
        <ReactECharts
            option={option}
            notMerge={true}
            lazyUpdate={true}
            theme={"theme_name"}
            onChartReady={()=> console.log("ready")} 
            style={{height: '800px', width: '100%'}}
            />


        </div>
    )
}

export default RadarChart;