import React, {  useEffect, useState } from 'react';
import classes from './PatientForm.module.css'
import { getEmptyPatientTemplate, ApiHost } from '../../../globals/globals';

function PatientForm(props) {

  const [patient, setPatient] = useState(getEmptyPatientTemplate())


  useEffect(()=>{
    // console.log("form mounted");
    patientFromPropsFunc();
  },[props])


  function patientFromPropsFunc(){
    let pat= props.getPatient == null ? getEmptyPatientTemplate() : props.getPatient();
    // console.log("patient")
    // console.log(pat);
    setPatient(pat);
  }


    function handleInputChange(evt) {
    const name = evt.target.name;
    const value =
      evt.target.type === "checkbox" ? !evt.target.checked : evt.target.value;
      setPatient({
      ...patient,
      [name]: value ==="" ? null : value
    })
    // console.log(patient);
  }

  function handleSubmit(event) {
    if(patient.id === -1 || patient.id == null){
      fetch(ApiHost + "/patients/",{
        method:"POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify(patient)
      })
      // .then(console.log("saved new patient"))
      .then(props.onSubmit())
    }


    else{
      fetch(ApiHost + "/patients/",{
        method:"PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify(patient)
      }).then(console.log("updated patient"))
      .then(props.onSubmit())
    }
    props.onSubmit();
    // console.log(patient);
  }

  const handleNewPatClick = () =>{
    setPatient(getEmptyPatientTemplate());
  }

  return (
    <div className='patient-form-main-div'>
    <h3>Пациент</h3>
    <button onClick={handleNewPatClick}> Новый пациент</button>
      <form className={classes.column} onSubmit={handleSubmit}>

        <div className={`${classes.names} ${classes.column}`}>
          <input type='text' value={patient.name ?? ""} placeholder='имя' name='name' onChange={handleInputChange}></input>
          <input type='text' value={patient.lastname ?? ""} placeholder='Фамилия' name='lastname' onChange={handleInputChange}></input>
          <input type='text' value={patient.patronymic ?? ""} placeholder='Отчество' name='patronymic' onChange={handleInputChange}></input>
          <select name='gender' value={patient.gender ?? ""} onChange={handleInputChange}>
            <option value='Male'>Мужчина</option>
            <option value='Female'>Женщина</option>
          </select>
        </div>

        <div className={`${classes.dates} ${classes.column}`}>
          <label>Дата рождения 
            <input type='date' value={patient.birthdate?? ""} placeholder='Дата рождения' name='birthdate' onChange={handleInputChange}></input>
          </label>

          <div>
            <label>Мертв
            <input id='alive-checkbox' type='checkbox' placeholder='имя' name='alive' checked={!patient.alive ?? false} onChange={handleInputChange}></input>
            </label>
          </div>

          {
            !patient.alive &&
            <div>
              <label>Дата смерти 
              <input id="deathdate-field" type='date' value={patient.deathdate ?? ""} placeholder='имя' name='deathdate' onChange={handleInputChange}></input></label>
            </div>
          }

        </div>

        <div className={`${classes.diagnosis}  ${classes.column}`}>
          <input type='text' value={patient.mainDiagnosis ?? ""} placeholder='Диагноз' name='mainDiagnosis' onChange={handleInputChange}></input>
          <input type='text' value={patient.otherDiagnosis ?? ""} placeholder='Диагноз дополительный' name='otherDiagnosis' onChange={handleInputChange}></input>
          <textarea value={patient.info ?? ""} placeholder='Доп. Информация' name='info' onChange={handleInputChange}></textarea>
        </div>

        <input type='submit' ></input>
      </form>

    </div>

  )

}

export default PatientForm;  