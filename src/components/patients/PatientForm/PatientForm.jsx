import React, { Component, useState } from 'react';
import classes from './PatientForm.module.css'

function PatientForm(props) {

  const [state, setState] = useState({
    "id": props.patient_id == null ? -1 : props.patient_id,
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
  )


  function handleInputChange(evt) {
    //console.log(evt);
    const name = evt.target.name;
    const value =
      evt.target.type === "checkbox" ? !evt.target.checked : evt.target.value;
    setState({
      ...state,
      [name]: value
    })
    console.log(state)
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(state);
  }

  return (
    <div className='patient-form-main-div'>
      <form className={classes.column} onSubmit={handleSubmit}>

        <div className={`${classes.names} ${classes.column}`}>
          <input type='text' value={state.name} placeholder='имя' name='name' onChange={handleInputChange}></input>
          <input type='text' value={state.lastname} placeholder='Фамилия' name='lastname' onChange={handleInputChange}></input>
          <input type='text' value={state.patronymic} placeholder='Отчество' name='patronymic' onChange={handleInputChange}></input>
          <select name='gender' value={state.gender} onChange={handleInputChange}>
            <option value='Male'>Мужчина</option>
            <option value='Female'>Женщина</option>
          </select>
        </div>

        <div className={`${classes.dates} ${classes.column}`}>
          <label>Дата рождения 
            <input type='date' value={state.birthdate} placeholder='Дата рождения' name='birthdate' onChange={handleInputChange}></input>
          </label>

          <div>
            <label>Мертв
            <input id='alive-checkbox' type='checkbox' placeholder='имя' name='alive' onChange={handleInputChange}></input>
            </label>
          </div>

          {
            !state.alive &&
            <div>
              <label>Дата смерти 
              <input id="deathdate-field" type='date' value={state.deathdate} placeholder='имя' name='deathdate' onChange={handleInputChange}></input></label>
            </div>
          }

        </div>

        <div className={`${classes.diagnosis}  ${classes.column}`}>
          <input type='text' value={state.mainDiagnosis} placeholder='Диагноз' name='mainDiagnosis' onChange={handleInputChange}></input>
          <input type='text' value={state.otherDiagnosis} placeholder='Диагноз дополительный' name='otherDiagnosis' onChange={handleInputChange}></input>
          <textarea value={state.info} placeholder='Доп. Информация' name='info' onChange={handleInputChange}></textarea>
        </div>

        <input type='submit' ></input>
      </form>

    </div>

  )

}

export default PatientForm;