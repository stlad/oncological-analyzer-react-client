import { BrowserRouter, Routes, Route} from 'react-router-dom';
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