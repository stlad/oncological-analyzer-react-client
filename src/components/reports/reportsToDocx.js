import { ApiHost } from "../../globals/globals";
import { Document, Packer, Paragraph, Tab, TableCell, TableRow, TextRun, Table, WidthType } from "docx";
import { saveAs } from "file-saver";

const testId = 1;

function createReport(){
    fetch(ApiHost + '/reports/' + testId,{
        method:"GET"
    }).then(resp => resp.json())
    .then( data=>createDocx(data))

}


function createDocx(data){
    const doc = new Document({
        sections: [{
            children: [
                patentInfoTable(data),
                new Paragraph(''),
                resultsTable(data),
                new Paragraph(''),
                avgResultsTable(data),
            ],
        }]
    });
    saveReport(doc, data.fullName + ".docx");

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
        'Hematological':[tableRowOf("Результаты гематологического исследования","")],
        'Immunological':[tableRowOf("Иммунный статус", "") ],
        'Cytokine' :[tableRowOf("Цитокиновый статус", "")]
    }

    for(var res of results){
        rows[res.parameter.researchType].push(
            tableRowOf(`${res.parameter.name} (${res.parameter.additionalName})`, res.value.toString())
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


        rows.push(tableRowOf5(
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


//TODO СДЕЛАТЬ МЕТОДЫ УНИВЕРСАЛЬНЫМИ!
function tableRowOf(text1, text2){
    return new TableRow({children:[
        new TableCell({children:[new Paragraph(text1)]}),
        new TableCell({children:[new Paragraph(text2)]})
    ]})
}

function tableRowOf5(text1, text2,text3, text4, text5){
    return new TableRow({children:[
        new TableCell({children:[new Paragraph(text1)]}),
        new TableCell({children:[new Paragraph(text2)]}),
        new TableCell({children:[new Paragraph(text3)]}),
        new TableCell({children:[new Paragraph(text4)]}),
        new TableCell({children:[new Paragraph(text5)]}),
    ]})
}

function saveReport(doc, filename){
    Packer.toBlob(doc).then(blob =>{
        saveAs(blob, filename);
    })
}

export {createReport}