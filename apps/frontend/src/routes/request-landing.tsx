import ServiceCard from "../components/ServiceCard.tsx";
import Maintenance from "../assets/Service_Request_Icon/Maintenance.svg";
import GiftIcon from "../assets/Service_Request_Icon/Gift.svg";
import Language from "../assets/Service_Request_Icon/Language.svg";
import Medicine from "../assets/Service_Request_Icon/Medicine.svg";
import Sanitation from "../assets/Service_Request_Icon/Sanitation.svg";
import Security from "../assets/Service_Request_Icon/Security.svg";
import InternalTransport from "../assets/Service_Request_Icon/InternalTransportation.svg";
import ExternalTransport from "../assets/Service_Request_Icon/ExternalTransportation.svg";


export function RequestLanding(){
    return(
        <>
            <div className="bg-gradient-to-t from-bone-white to-deep-blue h-full relative">
                <br/>
                <h1 className={"text-3xl font-OpenSans text-bone-white font-bold py-4"}>
                    Service Requests</h1>
                <br/>
                <div className="flex flex-col w-full">
                    <div className="flex justify-center gap-40">
                        <ServiceCard onClick={()=> window.location.href = "/maintenance"} icon={Maintenance} Request={"Maintenance Request"}/>
                        <ServiceCard onClick={() => window.location.href ="/giftdelivery"} icon={GiftIcon} Request={"Gift Delivery"}/>
                    </div>
                    <br/>
                    <div className="flex justify-center gap-40">
                        <ServiceCard onClick={() => window.location.href ="/interpreter"} icon={Language} Request={"Language Interpreter"}/>
                        <ServiceCard onClick={() => window.location.href ="/medicinerequest"} icon={Medicine} Request={"Medicine Request"}/>
                    </div>
                    <br/>
                    <div className="flex justify-center gap-40">
                        <ServiceCard onClick={() => window.location.href ="/sanitation"} icon={Sanitation} Request={"Sanitation Request"}/>
                        <ServiceCard onClick={() => window.location.href ="/security"} icon={Security} Request={"Security Request"}/>
                    </div>
                    <br/>
                    <div className="flex justify-center gap-40">
                        <ServiceCard onClick={() => window.location.href ="/internaltransport"} icon={InternalTransport} Request={"Internal Transportation Request"}/>
                        <ServiceCard onClick={() => window.location.href ="/transport"} icon={ExternalTransport} Request={"External Transportation Request"}/>
                    </div>
                </div>


            </div>
        </>
    );
}

export default RequestLanding;
