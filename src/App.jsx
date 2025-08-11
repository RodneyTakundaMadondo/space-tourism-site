import Home from './Pages/Home'

import Destination from './Pages/destination'
import Crew from './Pages/crew';
import Technology from './Pages/technology'

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Components/Layout';
export default function App() {
 
  return (
    <>
      
        {/* <Header setCurrentPage={setCurrentPage} currentPage={currentPage}/> */}
        {/* { renderPage()} */}
        <BrowserRouter basename="/space-tourism-site">
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/destination" element={<Destination />} />
              <Route path="/crew" element={<Crew />} />
              <Route path="/technology" element={<Technology />} />
            </Route>
          </Routes>
        </BrowserRouter>
      

    </>
  )
}