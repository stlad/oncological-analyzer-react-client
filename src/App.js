import logo from './logo.svg';
import './App.css';
import PatientForm from './components/patients/PatientForm/PatientForm.jsx';
import PatientCard from './components/patients/PatientCard/PatientCard';


const App = ()=>{
  return(
      <div className='App'>
        <header></header>
        <div>
          {/* <PatientForm patient_id={null}/>           */}
          <PatientCard />
        </div>  

        <footer></footer>
      </div>  
      


  );

}



export default App;
