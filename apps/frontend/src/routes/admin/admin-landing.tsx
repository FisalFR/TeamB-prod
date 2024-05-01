 import DatabaseImage from "../../assets/Landing_Page_Images/newdatabase.png";
import CSVImage from "../../assets/Landing_Page_Images/newcsv.png";
import MapEditImage from "../../assets/Landing_Page_Images/map editor.png";
import AdminCard from "@/components/AdminCard.tsx";

export function adminLanding(){
    return(
        <>
            <div className="bg-bone-white relative h-full">
                <AdminCard onClick={() => window.location.href ="/database"}
                           className="flex flex-row"
                           Image={DatabaseImage}
                           Title={"Database"}
                           Description={"Find and keep track of all service requests made."}/>
                {/*Div for CSV data */}
                <AdminCard onClick={() => window.location.href ="/csvManager"}
                           className="flex flex-row-reverse"
                           Image={CSVImage}
                           Title={"CSV Manager"}
                           Description={"Add and edit node and edge data, as well as, manage employee\n" +
                                        "information."}/>
                {/*div for map editing*/}
                <AdminCard onClick={() => window.location.href ="/mapEditor"}
                           className="flex flex-row"
                           Image={MapEditImage}
                           Title={"Map Editor"}
                           Description={"Edit nodes on the map."}/>
            </div>
        </>
    );
}

 export default adminLanding;
