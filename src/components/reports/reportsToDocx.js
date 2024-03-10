import { ApiHost } from "../../globals/globals";
import { Document, Packer, Paragraph, Tab, TableCell, TableRow, TextRun, Table, WidthType, ImageRun ,convertInchesToTwip} from "docx";
import { saveAs } from "file-saver";
import { CurrentCharts } from "../charts/charts";


function createReport(testId){
    fetch(ApiHost + '/reports/' + testId,{
        method:"GET"
    }).then(resp => resp.json())
    .then( data=>createDocx(data, testId))

}


async function createDocx(data, testId){
    const infotable = await patentInfoTable(data)
    const resTable = await resultsTable(data)
    const avgTable = await avgResultsTable(data)
    const bChart = await chartImage("B")
    const tChart = await chartImage("T")
    const cChart = await chartImage("Cytokine")
    const recs =  await recommendations(testId)
    const doc = new Document({
        sections: [{
            children: [
                infotable, new Paragraph(''),
                resTable,new Paragraph(''),
                bChart,new Paragraph(''),
                tChart,new Paragraph(''),
                cChart,new Paragraph(''),
                avgTable,new Paragraph(''),
                recs, new Paragraph('')
            ],
        }]
    });
    saveReport(doc, `${data.fullName} - ${data.testDate}.docx`);
}

async function recommendations(testId){
    console.log(ApiHost + '/recommendations/' + testId)
    let recs = await fetch(ApiHost + '/recommendations/' + testId,{
        method:"GET"
    }).then(resp => resp.json())
    .then( data=> data)
    console.log(recs)
    let recRuns = recs.map(rec=>{
        return new TextRun({
            text: rec,
            break:1
        });
    })

    return new Paragraph({children:recRuns})
}

function patentInfoTable(info){
    const fullname = info.fullName;
    const age = info.age.toString();
    const gender = info.gender==="Male" ? "Мужчина" : "Женщина"
    const birthDate = info.birthDate;
    const mainDiagnosis = info.mainDiagnosis;
    const otherDiagnosis = info.otherDiagnosis;
    const testDate = info.testDate;
    
    
    const rows = [
        tableRowOf("Полное имя", fullname ?? ""),
        tableRowOf("Дата рождения",birthDate ?? ""),
        tableRowOf("Дата анализа",testDate ?? ""),
        tableRowOf("Возраст", age ?? ""),
        tableRowOf("Пол", gender ?? ""), 
        tableRowOf("Диагноз основной", mainDiagnosis ?? ""),
        tableRowOf("Диагноз дополнительный", otherDiagnosis ?? ""),
    ]

    const table = new Table({
        rows: rows,
    })
    return table;
}

function resultsTable(data){
    const results=  data.results;
    const rows = {
        'Hematological':[tableRowOf("Результаты гематологического исследования")],
        'Immunological':[tableRowOf("Иммунный статус") ],
        'Cytokine' :[tableRowOf("Цитокиновый статус")]
    }

    for(var res of results){
        rows[res.parameter.researchType].push(
            tableRowOf(`${res.parameter.name} ( ${res.parameter.additionalName} )`, res.value.toString(),`[${res.parameter.refMin}-${res.parameter.refMax}]`)
        )
    }

    const table = new Table({
        rows: [].concat(rows['Hematological'], rows['Immunological'], rows['Cytokine'])
    })
    return table;
}

function avgResultsTable(data){
    const avgresults=  data.averageOfAllResults.avgResults;
    console.log(avgresults);
    let rows = [tableRowOf("Показатель", "Интервал", "Предыдущие", "Последний", "Итог")];
    for(var res of Object.values(avgresults)){
        let difference = ""
        if(res.finalValue > res.avg) difference = "↑";
        else if(res.finalValue < res.avg) difference = "↓";
        else difference = '='


        rows.push(tableRowOf(
            `${res.parameter.name} (${res.parameter.additionalName})`,
            `[${res.parameter.refMin} - ${res.parameter.refMax}]`,
            res.avg.toString(),
            res.finalValue.toString(),
            difference
        ))
    }
    const table = new Table({
        rows: rows
    })
    return table;

}

function tableRowOf(...texts){
    let margins = {
        top: convertInchesToTwip(0.1),
        bottom: convertInchesToTwip(0.1),
        right: convertInchesToTwip(0.1),
        left: convertInchesToTwip(0.1),
    }
    let children =[]
    texts.map((text, index)=>{
        let par = new Paragraph(text);
        let cell = new TableCell({
            width: { size: 50, type: WidthType.PERCENTAGE },
            children:[par],
            margins:margins
        })
        children.push(cell);
    })
    return new TableRow({
        children:children
    })
}

async function chartImage(chartType){
    const chartUrl = CurrentCharts[chartType].getDataURL();
    const blob = await fetch(chartUrl).then(r => r.blob());
    const img = new ImageRun({
        data: blob,
        transformation:{
            width:700,
            height:600
        }
      })
    return new Paragraph({children:[img]});
}

function saveReport(doc, filename){
    Packer.toBlob(doc).then(blob =>{
        saveAs(blob, filename);
    })
}

export {createReport}