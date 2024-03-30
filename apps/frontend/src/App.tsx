import './App.css';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import MaintenancePage from "./routes/maintenance-page.tsx";
import Map from "./routes/map.tsx";
import LoginPage from "./routes/login-page.tsx";
import NavigationBar from "./components/NavigationBar.tsx";

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
                }

            ],
        },
    ]);
    return <RouterProvider router={router}></RouterProvider>;
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
