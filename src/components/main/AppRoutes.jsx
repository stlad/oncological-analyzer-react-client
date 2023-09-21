import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PatientListForCard from '../patients/PatientListForCards/PatientListForCard';
import PatientForm from '../patients/PatientForm/PatientForm.jsx'
import PatientWindow from '../patients/PatientWindow';


const AppRoutes  = (props) =>{

    return (
    <BrowserRouter>
        <Routes>
            <Route 
                path='/' // /patients
                element = {
                    <div >
                        <PatientWindow  />
                    </div>
            }
            />

            <Route 
                path='/patients/new' // /patients
                element = {<PatientForm patient_id={-1}/>}
            />

        </Routes>
    </BrowserRouter>
)

}

export default AppRoutes