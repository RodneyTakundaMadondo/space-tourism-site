import { Outlet, useLocation } from "react-router-dom";
import Header from './Header'
export default function Layout() {
    const location = useLocation();
    
    function changeBGI() {
        
        switch (location.pathname) {
            case "/":
                return "home-main-container";
            case "/destination":
                return "destination-main-container";
            case "/crew":
                return "crew-main-container";
            case "/technology":
                return "technology-main-container";
            default:
                return "";
        }
    }

    return (
        <>
            <div className={`${changeBGI()} min-h-screen`}>
                <Header />
                <Outlet />
            </div>
        </>
    )
}