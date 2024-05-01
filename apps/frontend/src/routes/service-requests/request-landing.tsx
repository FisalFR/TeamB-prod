import ServiceCard from "../../components/ServiceCard.tsx";
import Maintenance from "../../assets/Service_Request_Icon/Maintenance.svg";
import GiftIcon from "../../assets/Service_Request_Icon/Gift.svg";
import Language from "../../assets/Service_Request_Icon/Language.svg";
import Medicine from "../../assets/Service_Request_Icon/Medicine.svg";
import Sanitation from "../../assets/Service_Request_Icon/Sanitation.svg";
import Security from "../../assets/Service_Request_Icon/Security.svg";
import InternalTransport from "../../assets/Service_Request_Icon/InternalTransportation.svg";
import ExternalTransport from "../../assets/Service_Request_Icon/ExternalTransportation.svg";


export function RequestLanding(){
    return(
        <>
            <div className="bg-gradient-to-t from-bone-white to-deep-blue h-full relative">
                <br/>
                <h1 className={"text-3xl font-OpenSans text-bone-white font-bold py-4"}>
                    Service Requests</h1>
                <br/>
                <div className="flex flex-col w-full">
                    <div className="flex justify-center gap-10">
                        <ServiceCard onClick={() => window.location.href = "/maintenance"} icon={Maintenance}
                                     Request={"Maintenance "}
                                     description={"Report issue to maintenance using this request form"}/>
                        <ServiceCard onClick={() => window.location.href = "/giftdelivery"} icon={GiftIcon}
                                     Request={"Gift Delivery"}
                                     description={"Buy a gift for a patient using this form"}/>

                        <ServiceCard onClick={() => window.location.href = "/interpreter"} icon={Language}
                                     Request={"Language Interpreter"}
                                     description={"Request an interpreter for you or your patient using this form"}/>
                        <ServiceCard onClick={() => window.location.href = "/medicinerequest"} icon={Medicine}
                                     Request={"Medicine Request"}
                                     description={"Request medicine to your patient using this form "}/>
                    </div>
                    <br/>
                    <br/>
                    <div className="flex justify-center gap-10">
                        <ServiceCard onClick={() => window.location.href = "/sanitation"} icon={Sanitation}
                                     Request={"Sanitation"}
                                     description={"Report spills, and areas needed to be cleaned using this form"}/>
                        <ServiceCard onClick={() => window.location.href = "/security"} icon={Security}
                                     Request={"Security Request"}
                                     description={"Request the need for security using this form"}/>
                        <ServiceCard onClick={() => window.location.href ="/internaltransport"}
                                     icon={InternalTransport} Request={"Int. Transportation"}
                                     description={"Request transport of a patient in the hospital using this form"}/>
                        <ServiceCard onClick={() => window.location.href ="/transport"}
                                     icon={ExternalTransport} Request={"Ext. Transportation"}
                                     description={"Request of a patient outside of the hospital using this form"}/>
                    </div>

                </div>


            </div>
        </>
    );
}

export default RequestLanding;
