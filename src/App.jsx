import Home from './Components/Home'
import Header from './Components/Header';
import Destination from './Components/destination'
import Crew from './Components/crew';
import Technology from './Components/technology'
import {useState} from 'react'
export default function App(){
    const [currentPage,setCurrentPage] = useState("home");
  
      
         function renderPage(){
          switch(currentPage){
            case "home":
                return <Home setCurrentPage={setCurrentPage}/>;
             
            case "destination":
                return <Destination/>;
            
            case "crew":
                return <Crew/>;

            case "technology":
                return <Technology/>;
            default:
                return <Home/>;
        }
         }
      
         function changeBackGround(){
          switch(currentPage){
            case "home":
              return "home-main-container";
            case "destination":
              return "destination-main-container";
            case "crew":
              return "crew-main-container";
            case "technology":
              return "technology-main-container";
              default:
                return "";
              
          }
         }
    return(
      <>
     <div className={`min-h-screen bg-black ${changeBackGround()} space-y-12 `}>
     <Header setCurrentPage={setCurrentPage} currentPage={currentPage}/>
      { renderPage()}
     </div>
     
      </>
    )
}