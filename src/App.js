import { useEffect } from 'react';
import './App.css';
import AppRoutes from './components/main/AppRoutes.jsx';


const App = ()=>{
  useEffect(()=>{document.title='Пациенты'},[])

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
