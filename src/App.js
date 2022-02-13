import React from 'react';
import { BrowserRouter, Route, Routes, Link} from 'react-router-dom';
import Contactscreen from './screens/Contactscreen.js';
import Homescreen from './screens/Homescreen.js';

const App = () => {
    return(
<BrowserRouter>
    <div> 
    <Routes>
    <Route path="/" element={<Homescreen />} exact></Route>
    <Route path="/contact" element={<Contactscreen />}></Route>
        </Routes>
  </div>
  </BrowserRouter>
        )
}

export default App;