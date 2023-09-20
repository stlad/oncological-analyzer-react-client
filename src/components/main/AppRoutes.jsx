import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PatientListForCard from '../patients/PatientListForCards/PatientListForCard';


const AppRoutes  = (props) =>{

    return (
    <BrowserRouter>
        <Routes>
            <Route 
                path='/' // /patients
                element = {<PatientListForCard />}
            />


        </Routes>
    </BrowserRouter>
)

}

export default AppRoutes