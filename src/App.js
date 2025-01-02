import './App.css';
import { ComingSoon } from './components/comingSoon/coming-soon';
import { Home } from './components/Home/Home';
import { Navbar } from './components/navbar/navbar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
function App() {
  return (
    <div className="App " style={{height:"100vh"}}>
 

  <BrowserRouter>
 
  <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                {/* <Home /> */}
              </>
            }
          />
          <Route path="/coming-soon" element={<ComingSoon />} />
        </Routes>
  </BrowserRouter>
    </div>
  );
}


export default App;
