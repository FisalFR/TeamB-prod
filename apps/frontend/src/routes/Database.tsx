import Dropdown from "../components/dropdown.tsx";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {forms} from "database/.prisma/client";
import HoverTable from "../components/hoverTable.tsx";
import formType from "common/src/FormType.ts";
import pieGraph from "../assets/pie.svg";
import bar from "../assets/bar.svg";
import Button from "../components/Button.tsx";
import Modal from "../components/Modal.tsx";
import Chart from "react-apexcharts";



function LogBook() {
    const PieSVG = <img src={pieGraph} alt="pie" className={"w-5"} />;
    const GraphSVG = <img src={bar} alt="pie" className={"w-5"} />;
    const emptyDate: Date = new Date();
    const [form, setForm] = useState([]);
    const [request, setRequest] = useState<forms>({
        formID: "",
        type: "",
        location: "",
        status: "",
        assignee: "",
        dateCreated: emptyDate,
        priority: ""
    });
    const [cleared, setCleared] = useState(false);
    const [staffTypeOptions, setEmployeeOptions] = useState<string[]>([]);
    const [formIDOptions, setFormID] = useState<string[]>([]);
    const [requestTypeOptions, setRequestOptions] = useState<string[]>([]);
    const [statusTypeOptions, setTypeOptions] = useState<string[]>([]);
    const [locationOptions, setLocation] = useState<string[]>([]);
    const [priorityOptions, setPriority] = useState<string[]>([]);
    const [createdByOptions, setCreatedBy] = useState<string[]>([]);
    const [dataUpdated, setDataUpdated] = useState<boolean>(false);

    const [maintenanceCount, setMaintenanceCount] = useState(0);

    const getMaintenanceCount = () => {
        axios.get("/api/csvManager/countMaintenances").then((response) => {
            setMaintenanceCount(response.data);
        });
    };

    const [languageCount, setLanguageCount] = useState(0);

    const getLanguageCount = () => {
        axios.get("/api/csvManager/countLanguage").then((response) => {
            setLanguageCount(response.data);
        });
    };

    const [medicineCount, setMedicineCount] = useState(0);

    const getMedicineCount = () => {
        axios.get("/api/csvManager/countMedicine").then((response) => {
            setMedicineCount(response.data);
        });
    };

    const [sanitationCount, setSanitationCount] = useState(0);

    const getSantitationCount = () => {
        axios.get("/api/csvManager/countSanitation").then((response) => {
            setSanitationCount(response.data);
        });
    };

    const [securityCount, setSecurityCount] = useState(0);

    const getSecurityCount = () => {
        axios.get("/api/csvManager/countSecurity").then((response) => {
            setSecurityCount(response.data);
        });
    };

    const [giftCount, setGiftCount] = useState(0);

    const getGiftCount = () => {
        axios.get("/api/csvManager/countGift").then((response) => {
            setGiftCount(response.data);
        });
    };

    const [transportationCount, setTransportationCount] = useState(0);

    const getTransportationCount = () => {
        axios.get("/api/csvManager/countTransportation").then((response) => {
            setTransportationCount(response.data);
        });
    };

    useEffect(() => {
        getMaintenanceCount();
        getLanguageCount();
        getMedicineCount();
        getSecurityCount();
        getSantitationCount();
        getGiftCount();
        getTransportationCount();
    }, []);


    const state = {

            series: [maintenanceCount, languageCount, medicineCount, sanitationCount, securityCount,
                giftCount, transportationCount],

        options: {
            chart: {
                width: 500,
                type: 'pie',
            },
            title:{
                text: "Form Distribution",
                align: 'left',
                margin: 10,
                offsetX: -10,
                offsetY: -10,
                floating: false,
                style: {
                    fontSize: '25px',
                    fontWeight: '1000',
                    fontFamily: 'Open Sans',
                    color: '#263238'
                }
            },
            plotOptions: {
                pie:
                    {
                        startAngle:0,
                        endAngle: 360,
                        offsetX: 0,

                        dataLabels:{
                            offset: 0,
                        }
                    },
                total: {
                    show: false
                }
            },
            labels: ["Maintenance", "Language", "Medicine", "Sanitation", "Security",
                "Gift", "Transportation"],
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 500
                    },
                }
            }],
            legend: {
                position: 'bottom'
            }
        },
    };

    const barOptions = {
        chart: {
            id: "basic-bar"
        },
        xaxis: {
            categories: ["Maintenance", "Language", "Medicine", "Sanitation", "Security",
                "Gift", "Transportation"]
        },
        plotOptions: {
            bar: {
                distributed: true,
                borderRadius: 10,
            }
        },

        colors: ['#F0322B', '#F09000', '#F0D600', '#00CEF0', '#00F08D', '#B050F0', '#F050DA'],

        title:{
            text: "Form Distribution",
            align: 'left',
            margin: 10,
            offsetX: 0,
            offsetY: 0,
            floating: false,
            style: {
                fontSize: '25px',
                fontWeight: '1000',
                fontFamily: 'Open Sans',
                color: '#263238'
            }
        },
        animations: {
            enabled: true,
            easing: 'easeinout', // You can choose 'linear', 'easeout', 'easein', 'easeinout'
            speed: 800, // Speed of the animation in milliseconds
            animateGradually: {
                enabled: true,
                delay: 150 // Delay in animation
            },
            dynamicAnimation: {
                enabled: true,
                speed: 200 // Speed of dynamic animation
            }
        },
    };

    const barSeries = [
        {
            name: "Count",
            data: [maintenanceCount, languageCount, medicineCount, sanitationCount, securityCount,
                giftCount, transportationCount],
        }
    ];



    const removeDups = (arr: string[]): string[] => {
        return arr.filter((item,
                           index) => item !== "" && arr.indexOf(item) === index);
    };


    useEffect(() => {
        axios.get("/api/csvManager").then((response) => {
            setForm(response.data.reverse());
            const formIDStrings = [];
            const requestStrings = [];
            const locationStrings = [];
            const priorityStrings = [];
            const statusStrings = [];
            const createdByStrings = [];
            const assignedByStrings = [];
            for (let i = 0; i < response.data.length; i++) {
                formIDStrings.push(response.data[i].formID);
                requestStrings.push(response.data[i].type);
                locationStrings.push(response.data[i].location);
                statusStrings.push(response.data[i].status);
                priorityStrings.push(response.data[i].priority);
                createdByStrings.push(response.data[i].employeeName);
                assignedByStrings.push(response.data[i].assignee);
            }
            setFormID(formIDStrings);
            setRequestOptions(removeDups(requestStrings));
            setLocation(removeDups(locationStrings));
            setTypeOptions(removeDups(statusStrings));
            setPriority(removeDups(priorityStrings));
            setCreatedBy(removeDups(createdByStrings));
            setEmployeeOptions(removeDups(assignedByStrings));
            setDataUpdated(false);
        });
    }, [dataUpdated]);


    // Use Effect that updates the page everytime you input something into the dropdowns in Filter Data
    useEffect(() => {
    axios.post("/api/csvManager/filter", JSON.stringify(request), {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        const reversedData = response.data.reverse();
        setForm(reversedData);
        const formIDStrings = reversedData.map((item: formType) => item.formID);
        const typeStrings = reversedData.map((item: formType) => item.type);
        const locationStrings = reversedData.map((item: formType) => item.location);
        const statusStrings = reversedData.map((item: formType) => item.status);
        const priorityStrings = reversedData.map((item: formType) => item.priority);
        const createdStrings = reversedData.map((item: formType) => item.employeeName);
        const assignedStrings = reversedData.map((item: formType) => item.assignee);


        setFormID(formIDStrings);
        setRequestOptions(removeDups(typeStrings));
        setLocation(removeDups(locationStrings));
        setTypeOptions(removeDups(statusStrings));
        setPriority(removeDups(priorityStrings));
        setCreatedBy(removeDups(createdStrings));
        setEmployeeOptions(removeDups(assignedStrings));

    });
    }, [request]);


        // Handler Functions

        function handleFormID(str: string): void {
            setCleared(false);
            setRequest({...request, formID: str});
        }

        function handleRequestType(str: string): void {
            setCleared(false);
            setRequest({...request, type: str});
        }

        function handleLocation(str: string): void {
            setCleared(false);
            setRequest({...request, location: str});
        }
        function handleStatusType(str: string): void {
            setCleared(false);
            setRequest({...request, status: str});
        }

        function handleAssigneeType(str: string): void {
            setCleared(false);
            setRequest({...request, assignee: str});
        }

    function handlePriority(str: string): void {
        setCleared(false);
        setRequest({...request, priority: str});
    }

    function handleCreatedBy(str: string): void {
        setCleared(false);
        setRequest({...request, employeeName: str});
    }

    function clearAll(){
            setRequest({ formID: "",
                type: "",
                location: "",
                status: "",
                assignee: "",
                dateCreated: emptyDate,
                priority: ""});
            setCleared(true);
        setDataUpdated(true);
    }

    const [open, setOpen] = useState<boolean>(false);
    function openPie() {
        setOpen(true);
        }

    const [openGraph, setOpenGraph] = useState<boolean>(false);
    function openGraphFunction() {
        setOpenGraph(true);
    }


    return (
            <div className="flex bg-light-white max-h-[92%] overflow-hidden">
                {/*Form to filter current requests*/}
                <div className="mx-3 space-y-1 my-3">
                    <a onClick={clearAll}
                       className="font-medium text-blue-600 dark:text-blue-500 hover:underline absolute top-[84px] left-60 ">Clear
                        Filter</a>
                    <div className="">
                        <h2 className={"font-extrabold border-b-[2px] border-black text-3xl font-OpenSans flex items-start pl-5 pb-2"}>Filter
                            Data</h2>
                        <form
                            className="w-[22vw]  flex flex-col items-start p-2 pl-5 pt-5">


                            <p className={"text-left font-bold"}>Form ID</p>
                            <Dropdown options={formIDOptions} placeholder={"Choose FormID"}
                                      name={"formIDDropdown"}
                                      id={"dropdown1"} value={cleared}
                                      color={"bg-deep-blue bg-opacity-5"}
                                      rounded={"rounded-md"}
                                      setInput={handleFormID} required={true}/>
                        </form>

                        <form
                            className="w-[22vw] flex flex-col items-start p-2 pl-5">
                            <p className={"text-left font-bold"}>Request Type</p>
                            <Dropdown options={requestTypeOptions} placeholder={"Choose Request Type"}
                                      name={"requestTypeDropdown"}
                                      id={"dropdown2"} value={cleared}
                                      color={"bg-deep-blue bg-opacity-5"}
                                      rounded={"rounded-md"}
                                      setInput={handleRequestType} required={true}/>
                        </form>

                        <form
                            className="w-[22vw] flex flex-col items-start p-2 pl-5">
                            <p className={"text-left font-bold"}>Location</p>
                            <Dropdown options={locationOptions} placeholder={"Choose Location"}
                                      name={"locationDropdown"}
                                      id={"dropdown3"} value={cleared}
                                      color={"bg-deep-blue bg-opacity-5"}
                                      rounded={"rounded-md"}
                                      setInput={handleLocation} required={true}/>
                        </form>

                        <form
                            className="w-[22vw]  flex flex-col items-start p-2 pl-5">
                            <p className={"text-left font-bold"}>Request Status</p>
                            <Dropdown options={statusTypeOptions} placeholder={"Choose Status"} name={"statusDropdown"}
                                      id={"statusDropdown"} value={cleared}
                                      color={"bg-deep-blue bg-opacity-5"}
                                      rounded={"rounded-md"}
                                      setInput={handleStatusType} required={true}/>
                        </form>

                        <form
                            className="w-[22vw] flex flex-col items-start p-2 pl-5">
                            <p className={"text-left font-bold"}>Assigned Staff</p>
                            <Dropdown options={staffTypeOptions} placeholder={"Choose Assignee"}
                                      name={"staffDropdown"}
                                      id={"dropdown5"} value={cleared}
                                      color={"bg-deep-blue bg-opacity-5"}
                                      rounded={"rounded-md"}
                                      setInput={handleAssigneeType} required={true}/>
                        </form>

                        <form
                            className="w-[22vw] flex flex-col items-start p-2 pl-5">
                            <p className={"text-left font-bold"}>Created By</p>
                            <Dropdown options={createdByOptions} placeholder={"Choose Created By"}
                                      name={"createdDropdown"}
                                      id={"dropdown7"} value={cleared}
                                      color={"bg-deep-blue bg-opacity-5"}
                                      rounded={"rounded-md"}
                                      setInput={handleCreatedBy} required={true}/>
                        </form>

                        <form
                            className="w-[22vw] flex flex-col items-start p-2 pb-5 pl-5">
                            <p className={"text-left font-bold"}>Priority</p>
                            <Dropdown options={priorityOptions} placeholder={"Choose Priority"}
                                      name={"priorityDropdown"}
                                      id={"dropdown6"} value={cleared}
                                      color={"bg-deep-blue bg-opacity-5"}
                                      rounded={"rounded-md"}
                                      maxHeight={"max-h-24"}
                                      setInput={handlePriority} required={true}/>
                        </form>
                    </div>
                    <div className={"space-x-6"}>
                    <Button onClick={openPie} color={"bg-deep-blue"}  px={"px-3"} py={"py-3"} >
                        {PieSVG}
                    </Button>
                        <Button onClick={openGraphFunction} color={"bg-deep-blue"}  px={"px-3"} py={"py-3"} >
                            {GraphSVG}
                        </Button>
                    </div>
                    <Modal open={open} onClose={() => setOpen(false) }>
                        <div className="p-6 shadow-xl">
                            <Chart options={state.options}
                                   series={state.series}
                                   type="pie"
                                   width={600}
                            />
                        </div>
                    </Modal>
                    <Modal open={openGraph} onClose={() => setOpenGraph(false) }>
                        <div className="p-6 shadow-xl">
                            <Chart options={barOptions}
                                   series={barSeries}
                                   type="bar"
                                   width={600}
                            />
                        </div>
                    </Modal>
                </div>
                <div
                    className="border-solid border-b-[1px] border-deep-blue w-full max-h-[50%] overflow-y-auto">
                <HoverTable data={form}
                                headings={["Form ID", "Type", "Location", "Status", "Assignee", "Created By", "Priority", "Date Created"]}
                                keys={["formID", "type", "location", "status", "assignee", "employeeName", "priority", "dateCreated"]}
                                dataUpdated={dataUpdated} setDataUpdated={setDataUpdated}/>
                </div>

            </div>
    );
}


export default LogBook;
