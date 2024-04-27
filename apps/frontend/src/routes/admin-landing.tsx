 import DatabaseImage from "../assets/Landing_Page_Images/newdatabase.png";

import CSVImage from "../assets/Landing_Page_Images/newcsv.png";
import MapEditImage from "../assets/Landing_Page_Images/map editor.png";
export function adminLanding(){
    return(
        <>
            <div className="bg-gradient-to-t from-bone-white to-deep-blue relative h-full">
                {/*This is the div for the request database*/}
                <div className="flex w-full h-1/2">
                    <img src={DatabaseImage} className="w-2/3"/>
                    <div className="flex flex-col w-1/3 bg-bone-white centerContent">
                        <h1 className="text-3xl font-OpenSans font-bold py-4">Database</h1>
                        <p className="font-OpenSans">Find and keep track of all service requests made.</p>
                    </div>
                </div>
                {/*Div for CSV data */}
                <div className="flex w-full h-1/2 ">
                    <div className="flex flex-col w-1/3 bg-bone-white centerContent">
                        <h1 className="text-3xl font-OpenSans font-bold py-4">CSV Manager</h1>
                        <p className="font-OpenSans">Add and edit node and edge data, as well as, manage employee
                            information.</p>
                    </div>
                    <img src={CSVImage} className="w-2/3"/>
                </div>
                {/*div for map editing*/}
                <div className="flex w-full h-1/2 ">
                    <img src={MapEditImage} className="w-2/3"/>
                    <div className="flex flex-col w-1/3 bg-bone-white centerContent">
                        <h1 className="text-3xl font-OpenSans font-bold py-4">Map Editor</h1>
                        <p className="font-OpenSans">Edit nodes on the map.</p>
                    </div>
                </div>

            </div>
        </>
    );
}

 export default adminLanding;
