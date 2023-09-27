

// const ApiHost = 'http://192.168.0.107:8080'  
// const ApiHost =  sessionStorage["API_HOST"];
const ApiHost = process.env.REACT_APP_API_HOST;

console.log(ApiHost)
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