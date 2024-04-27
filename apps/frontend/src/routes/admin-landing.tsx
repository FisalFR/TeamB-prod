 import DatabaseImage from "../assets/Landing_Page_Images/newdatabase.png";

import CSVImage from "../assets/Landing_Page_Images/newcsv.png";
import MapEditImage from "../assets/Landing_Page_Images/map editor.png";
import AdminCard from "@/components/AdminCard.tsx";
import AdminCard2 from "@/components/AdminCard2.tsx";
export function adminLanding(){
    return(
        <>
            <div className="bg-gradient-to-t from-bone-white to-deep-blue relative h-full">
                
                <AdminCard onClick={() => window.location.href ="/database"}
                           Image={DatabaseImage}
                           Title={"Database"}
                           Description={"Find and keep track of all service requests made."}/>
                {/*Div for CSV data */}
                <AdminCard2 onClick={() => window.location.href ="/csvManager"}
                           Image={CSVImage}
                           Title={"CSV Manager"}
                           Description={"Add and edit node and edge data, as well as, manage employee\n" +
                    "                            information."}/>

                {/*div for map editing*/}
                <AdminCard onClick={() => window.location.href ="/mapEditor"}
                           Image={MapEditImage}
                           Title={"Map Editor"}
                           Description={"Edit nodes on the map."}/>

            </div>
        </>
    );
}

 export default adminLanding;
