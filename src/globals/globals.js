

const ApiHost = 'http://127.0.0.1:8080'

function getEmptyPatientTemplate(){
    return {
        "id": -1,
        "name": "",
        "lastname": "",
        "patronymic": "",
        "birthdate": "",
        "deathdate": "",
        "alive": true,
        "mainDiagnosis": "",
        "otherDiagnosis": "",
        "info": "",
        "gender": "Male"
    }
    
}



let CurrentResultOnForm = []

export {ApiHost, getEmptyPatientTemplate};