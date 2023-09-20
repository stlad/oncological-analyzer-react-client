import logo from './logo.svg';
import './App.css';
import PatientListForCard from './components/patients/PatientListForCards/PatientListForCard.jsx'
import ApiHost from './globals/globals';
import { useState } from 'react';
import AppRoutes from './components/main/AppRoutes.jsx';


const App = ()=>{
  
  return(
      <div className='App'>
        <header></header>
        <div>
          <AppRoutes />
        </div>  

        <footer></footer>
      </div>  
      


  );

}



export default App;
