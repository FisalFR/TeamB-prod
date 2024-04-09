import './App.css';
import { createBrowserRouter, RouterProvider, Outlet, useNavigate} from "react-router-dom";

import MaintenancePage from "./routes/MaintenancePage";
import Map from "./routes/map";
import LoginPage from "./routes/login-page";
import NavigationBar from "./components/NavigationBar";
import LanguageInterpreter from "./routes/language-interpreter-page";
import LoginNavigationBar from "./components/LoginNavigationBar.tsx";
import CsvManager from "./routes/csv-manager.tsx";
import LogBook from "./routes/requests-log-page.tsx";
import MedicineRequest from "./routes/MedicineRequest.tsx";
import Sanitation from "./routes/sanitation-page.tsx";
import Database from "./routes/Database.tsx";
import {Auth0Provider} from "@auth0/auth0-react";
import SecurityPage from "./routes/SecurityRequest.tsx";


function App() {

    const router = createBrowserRouter([
        {
            path: "/",
            children: [
                {
                    path: "/",
                    element:
                        <div>
                            <LoginNavigationBar/>
                            <LoginPage/>
                        </div>
                },
                {
             path: "",
                    element: <Root/>,
                    children: [
                        {
                            path: "map",
                            element: <Map/>
                        },
                        {
                            path: "maintenance",
                            element: <MaintenancePage/>
                        },
                        {
                            path:"interpreter",
                            element: <LanguageInterpreter/>
                        },
                        {
                            path:"csvManager",
                            element: <CsvManager/>
                        },
                        {
                           path:"/logs",
                           element:<LogBook/>,
                       },
                        {
                            path:"medicineRequest",
                            element:<MedicineRequest/>
                        },
                        {
                            path:"/database",
                            element:<Database/>,
                        },
                        {
                          path: "/sanitation",
                          element: <Sanitation/>
                        },
                        {
                            path: "/security",
                            element: <SecurityPage/>
                        },
            ],
        },
    ]}]);

    return (
            <RouterProvider router={router}></RouterProvider>

    );

    function Root() {
        const navigate = useNavigate();
        return (
            <Auth0Provider
                useRefreshTokens
                cacheLocation="localstorage"
                domain="dev-k4ad0ftyhamxq164.us.auth0.com"
                clientId="W2sGPVM38yYzHtAfDSPdccDIf1ztmCC5"
                onRedirectCallback={(appState)=>{
                    navigate(appState?.returnTo || window.location.pathname);
                }}
                authorizationParams={{
                    redirect_uri: window.location.origin,
                    audience:'/api',
                    scope:"openid profile email offline_access",
                }}


            >
            <div className="w-full h-full">
                <NavigationBar/>


                <Outlet/>
            </div>
            </Auth0Provider>
        );
    }
}

export default App;
