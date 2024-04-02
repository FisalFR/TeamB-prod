import './App.css';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import MaintenancePage from "./routes/MaintenancePage";
import Map from "./routes/map";
import LoginPage from "./routes/login-page";
import NavigationBar from "./components/NavigationBar";
import LanguageInterpreter from "./routes/language-interpreter-page";
function App() {

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Root />,
            children: [
                {
                    path: "",
                    element: <div>
                        <Map/>

                    </div>

                },
                {
                    path: "/maintenance",
                    element: <MaintenancePage/>
                },
                {
                    path:"/login",
                    element:<LoginPage/>
                },
                {
                    path:"/interpreter",
                    element: <LanguageInterpreter/>
                }

            ],
        },
    ]);
    return (
        <RouterProvider router={router}></RouterProvider>



    );
    function Root() {
        return (
            <div className="w-full flex flex-col px-20 gap-5">
                <NavigationBar/>
                <Outlet/>
            </div>
        );
    }
}



export default App;
