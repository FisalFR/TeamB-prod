import './App.css';
import { createBrowserRouter, RouterProvider, Outlet, useNavigate} from "react-router-dom";

import MaintenancePage from "./routes/service-requests/MaintenancePage.tsx";
import Map from "./routes/map";
import LoginPage from "./routes/login-page";
import LanguageInterpreter from "./routes/service-requests/language-interpreter-page.tsx";
import CsvManager from "./routes/csv-manager.tsx";
import LogBook from "./routes/requests-log-page.tsx";
import MedicineRequest from "./routes/service-requests/MedicineRequest.tsx";
import Sanitation from "./routes/service-requests/sanitation-page.tsx";
import Database from "./routes/Database.tsx";
import {Auth0Provider} from "@auth0/auth0-react";
import SecurityPage from "./routes/service-requests/SecurityRequest.tsx";
import TransportationRequestPage from "./routes/service-requests/transportationRequest.tsx";

import GiftDelivery from "./routes/service-requests/gift-delivery.tsx";
import MapEditor from "./routes/map-editor.tsx";
import NavBar from "./components/navigation/NavBar.tsx";
import {Authenticate} from "./components/authentication/Authenticate.tsx";
import InternalTransportationRequestPage from "./routes/service-requests/internal-transport-page.tsx";

function App() {

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Root/>,
            children: [
                {
                    path: "/",
                    element:
                        <div className ="h-full overflow-hidden">

                            <LoginPage/>
                        </div>
                },
                {
             path: "",

                    children: [
                        {
                            path: "map",
                            element: <Map/>
                        },
                        {
                            path: "maintenance",
                            element:<Authenticate component={MaintenancePage}/>
                        },
                        {
                            path:"interpreter",
                            element: <Authenticate component={LanguageInterpreter}/>
                        },
                        {
                            path:"csvManager",
                            element: <Authenticate component= {CsvManager}/>
                        },
                        {
                           path:"/logs",
                           element:<LogBook/>,
                       },
                        {
                            path:"medicineRequest",
                            element:<Authenticate component={MedicineRequest}/>
                        },
                        {
                            path:"/database",
                            element:<Authenticate component={Database}/>,
                        },
                        {
                          path: "/sanitation",
                          element: <Authenticate component= {Sanitation}/>
                        },
                        {
                            path: "/security",
                            element: <Authenticate component= {SecurityPage}/>
                        },
                        {
                            path:"/giftdelivery",
                            element:<Authenticate component={GiftDelivery}/>,
                        },
                        {
                            path:"/mapEditor",
                            element: <Authenticate component={MapEditor}/>,
                        },
                        {
                            path:"/transport",
                            element:<Authenticate component={TransportationRequestPage}/>
                        },
                        {
                            path:"/internalTransport",
                            element:<Authenticate component={InternalTransportationRequestPage}/>
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

                <div className="w-full h-full bs-scroll ...">
                <NavBar/>

                <Outlet/>

            </div>
            </Auth0Provider>
        );
    }
}

export default App;
