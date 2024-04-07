import './App.css';
import { createBrowserRouter, RouterProvider, Outlet} from "react-router-dom";

import MaintenancePage from "./routes/MaintenancePage";
import Map from "./routes/map";
import LoginPage from "./routes/login-page";
import NavigationBar from "./components/NavigationBar";
import LanguageInterpreter from "./routes/language-interpreter-page";
import LoginNavigationBar from "./components/LoginNavigationBar.tsx";
import CsvManager from "./routes/csv-manager.tsx";
import LogBook from "./routes/requests-log-page.tsx";
import Database from "./routes/Database.tsx";

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
                            path:"/database",
                            element:<Database/>,

                        },

            ],
        },
    ]}]);

    return (
        <RouterProvider router={router}></RouterProvider>
    );

    function Root() {
        return (
            <div className="w-full flex flex-col">
                <NavigationBar/>


                <Outlet/>
            </div>
        );
    }
}

export default App;
