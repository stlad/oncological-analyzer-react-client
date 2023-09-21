import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PatientListForCard from '../patients/PatientListForCards/PatientListForCard';
import PatientForm from '../patients/PatientForm/PatientForm.jsx'
import PatientWindow from '../patients/PatientWindow';
import TestPage from '../onco-tests/TestPage.jsx'

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

            <Route path="/tests/">
                <Route 
                    path=':patientId'
                    element = {
                        <div>
                            <TestPage />
                        </div>
                    }/>
            </Route>

        </Routes>
    </BrowserRouter>
)

}

export default AppRoutes