import Chart from "react-apexcharts";
import React, {useEffect, useState} from "react";
import axios from "axios";



function UserProfile(){

    const [maintenanceCount, setMaintenanceCount] = useState(0);
    const [maintenanceMediumCount, setMaintenanceMediumCount] = useState(0);
    const [maintenanceHighCount, setMaintenanceHighCount] = useState(0);
    const [maintenanceEmergencyCount, setMaintenanceEmergencyCount] = useState(0);

    const [languageCount, setLanguageCount] = useState(0);
    const [languageMediumCount, setLanguageMediumCount] = useState(0);
    const [languageHighCount, setLanguageHighCount] = useState(0);
    const [languageEmergencyCount, setLanguageEmergencyCount] = useState(0);

    const [sanitationCount, setSanitationCount] = useState(0);
    const [sanitationMediumCount, setSanitationMediumCount] = useState(0);
    const [sanitationHighCount, setSanitationHighCount] = useState(0);
    const [sanitationEmergencyCount, setSanitationEmergencyCount] = useState(0);

    const [medicineCount, setMedicineCount] = useState(0);
    const [medicineMediumCount, setMedicineMediumCount] = useState(0);
    const [medicineHighCount, setMedicineHighCount] = useState(0);
    const [medicineEmergencyCount, setMedicineEmergencyCount] = useState(0);

    const [securityCount, setSecurityCount] = useState(0);
    const [securityMediumCount, setSecurityMediumCount] = useState(0);
    const [securityHighCount, setSecurityHighCount] = useState(0);
    const [securityEmergencyCount, setSecurityEmergencyCount] = useState(0);

    const [internalCount, setInternalCount] = useState(0);
    const [internalMediumCount, setInternalMediumCount] = useState(0);
    const [internalHighCount, setInternalHighCount] = useState(0);
    const [internalEmergencyCount, setInternalEmergencyCount] = useState(0);

    const [externalCount, setExternalCount] = useState(0);
    const [externalMediumCount, setExternalMediumCount] = useState(0);
    const [externalHighCount, setExternalHighCount] = useState(0);
    const [externalEmergencyCount, setExternalEmergencyCount] = useState(0);

    const [giftCount, setGiftCount] = useState(0);
    const [giftMediumCount, setGiftMediumCount] = useState(0);
    const [giftHighCount, setGiftHighCount] = useState(0);
    const [giftEmergencyCount, setGiftEmergencyCount] = useState(0);

    function getMaintenanceCount(priority:string) {
        const requestData = { priority };
        console.log(requestData);
        axios.post("/api/csvManager/countMaintenancePriority", JSON.stringify(requestData) , {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if(priority == "Low"){
                setMaintenanceCount(response.data);
            } else if(priority == "Medium"){
                setMaintenanceMediumCount(response.data);
            } else if(priority == "High"){
                setMaintenanceHighCount(response.data);
            } else if(priority == "Emergency"){
                setMaintenanceEmergencyCount(response.data);
            }

        });
    };

    function getLanguageCount(priority:string) {
        const requestData = { priority };
        console.log(requestData);
        axios.post("/api/csvManager/countLanguagePriority", JSON.stringify(requestData) , {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if(priority == "Low"){
                setLanguageCount(response.data);
            } else if(priority == "Medium"){
                setLanguageMediumCount(response.data);
            } else if(priority == "High"){
                setLanguageHighCount(response.data);
            } else if(priority == "Emergency"){
                setLanguageEmergencyCount(response.data);
            }
        });
    };

    function getSanitationCount(priority:string) {
        const requestData = { priority };
        console.log(JSON.stringify(requestData));
        axios.post("/api/csvManager/countSanitationPriority", JSON.stringify(requestData) , {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if(priority == "Low"){
                setSanitationCount(response.data);
            } else if(priority == "Medium"){
                setSanitationMediumCount(response.data);
            } else if(priority == "High"){
                setSanitationHighCount(response.data);
            } else if(priority == "Emergency"){
                setSanitationEmergencyCount(response.data);
            }
        });
    };

    function getMedicineCount(priority:string) {
        const requestData = { priority };
        axios.post("/api/csvManager/countMedicinePriority", JSON.stringify(requestData) , {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if(priority == "Low"){
                setMedicineCount(response.data);
            } else if(priority == "Medium"){
                setMedicineMediumCount(response.data);
            } else if(priority == "High"){
                setMedicineHighCount(response.data);
            } else if(priority == "Emergency"){
                setMedicineEmergencyCount(response.data);
            }
        });
    };

    function getSecurityCount(priority:string) {
        const requestData = { priority };
        axios.post("/api/csvManager/countSecurityPriority", JSON.stringify(requestData) , {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if(priority == "Low"){
                setSecurityCount(response.data);
            } else if(priority == "Medium"){
                setSecurityMediumCount(response.data);
            } else if(priority == "High"){
                setSecurityHighCount(response.data);
            } else if(priority == "Emergency"){
                setSecurityEmergencyCount(response.data);
            }
        });
    };

    function getInternalCount(priority:string) {
        const requestData = { priority };
        axios.post("/api/csvManager/countInternalPriority", JSON.stringify(requestData) , {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if(priority == "Low"){
                setInternalCount(response.data);
            } else if(priority == "Medium"){
                setInternalMediumCount(response.data);
            } else if(priority == "High"){
                setInternalHighCount(response.data);
            } else if(priority == "Emergency"){
                setInternalEmergencyCount(response.data);
            }
        });
    };

    function getExternalCount(priority:string) {
        const requestData = { priority };
        axios.post("/api/csvManager/countExternalPriority", JSON.stringify(requestData) , {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if(priority == "Low"){
                setExternalCount(response.data);
            } else if(priority == "Medium"){
                setExternalMediumCount(response.data);
            } else if(priority == "High"){
                setExternalHighCount(response.data);
            } else if(priority == "Emergency"){
                setExternalEmergencyCount(response.data);
            }
        });
    };

    function getGiftCount(priority:string) {
        const requestData = { priority };
        axios.post("/api/csvManager/countGiftPriority", JSON.stringify(requestData) , {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if(priority == "Low"){
                setGiftCount(response.data);
            } else if(priority == "Medium"){
                setGiftMediumCount(response.data);
            } else if(priority == "High"){
                setGiftHighCount(response.data);
            } else if(priority == "Emergency"){
                setGiftEmergencyCount(response.data);
            }
        });
    };

    useEffect(() => {
        let priorities: string[] =
            ["Low", "Medium", "High", "Emergency"];
            for(let j = 0; j < 4; j++){
                    getMaintenanceCount(priorities[j]);
                    getLanguageCount(priorities[j]);
                    getSanitationCount(priorities[j]);
                    getMedicineCount(priorities[j]);
                    getSecurityCount(priorities[j]);
                    getInternalCount(priorities[j]);
                    getExternalCount(priorities[j]);
                    getGiftCount(priorities[j]);
            }
        getCreatedBy("Colin");
    }, []);

    const [unassignedCount, setUnassignedCount] = useState(0);
    const [assignedCount, setAssignedCount] = useState(0);
    const [inProgressCount, setInProgressCount] = useState(0);
    const [closedCount, setClosedCount] = useState(0);
    const [lowCount, setLowCount] = useState(0);
    const [mediumCount, setMediumCount] = useState(0);
    const [highCount, setHighCount] = useState(0);
    const [emergencyCount, setEmergencyCount] = useState(0);


    function getCreatedBy(name:string) {
        const requestData = { name };
        axios.post("/api/csvManager/countFormUnassigned", JSON.stringify(requestData) , {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            setUnassignedCount(response.data);
        });
        axios.post("/api/csvManager/countFormAssigned", JSON.stringify(requestData) , {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            setAssignedCount(response.data);
        });
        axios.post("/api/csvManager/countFormInProgress", JSON.stringify(requestData) , {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            setInProgressCount(response.data);
        });
        axios.post("/api/csvManager/countFormClosed", JSON.stringify(requestData) , {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            setClosedCount(response.data);
        });
        axios.post("/api/csvManager/countFormLow", JSON.stringify(requestData) , {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            setLowCount(response.data);
        });
        axios.post("/api/csvManager/countFormMedium", JSON.stringify(requestData) , {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            setMediumCount(response.data);
        });
        axios.post("/api/csvManager/countFormHigh", JSON.stringify(requestData) , {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            setHighCount(response.data);
        });
        axios.post("/api/csvManager/countFormEmergency", JSON.stringify(requestData) , {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            setEmergencyCount(response.data);
        });
    }

    // const state = {
    //     series: [
    //         {
    //             name: 'Maintenance',
    //             data: [{
    //                     x: 'Low',
    //                     y: [maintenanceCount,]
    //                 }, {
    //                     x: 'Medium',
    //                     y: [maintenanceMediumCount,]
    //                 }, {
    //                     x: 'High',
    //                     y: [maintenanceHighCount,]
    //                 }, {
    //                     x: 'Emergency',
    //                     y: [maintenanceEmergencyCount,]
    //                 }
    //             ]
    //         },
    //         {
    //             name: 'Language',
    //             data: [{
    //                     x: 'Low',
    //                     y: [languageCount,]
    //                 }, {
    //                     x: 'Medium',
    //                     y: [languageMediumCount,]
    //                 }, {
    //                     x: 'High',
    //                     y: [languageHighCount,]
    //                 }, {
    //                     x: 'Emergency',
    //                     y: [languageEmergencyCount,]
    //                 }
    //             ]
    //         },
    //         {
    //             name: 'Sanitation',
    //             data: [{
    //                     x: 'Low',
    //                     y: [sanitationCount,]
    //                 }, {
    //                     x: 'Medium',
    //                     y: [sanitationMediumCount,]
    //                 }, {
    //                     x: 'High',
    //                     y: [sanitationHighCount,]
    //                 }, {
    //                     x: 'Emergency',
    //                     y: [sanitationEmergencyCount,]}
    //             ]
    //         },
    //         {
    //             name: 'Medicine',
    //             data: [{
    //                     x: 'Low',
    //                     y: [medicineCount,]
    //                 }, {
    //                     x: 'Medium',
    //                     y: [medicineMediumCount,]
    //                 }, {
    //                     x: 'High',
    //                     y: [medicineHighCount,]
    //                 }, {
    //                     x: 'Emergency',
    //                     y: [medicineEmergencyCount,]
    //                 }
    //             ]
    //         },
    //         {
    //             name: 'Security',
    //             data: [{
    //                     x: 'Low',
    //                     y: [securityCount,]
    //                 }, {
    //                     x: 'Medium',
    //                     y: [securityMediumCount,]
    //                 }, {
    //                     x: 'High',
    //                     y: [securityHighCount,]
    //                 }, {
    //                     x: 'Emergency',
    //                     y: [securityEmergencyCount,]
    //                 }
    //             ]
    //         },
    //         {
    //             name: 'Int. Transport',
    //             data: [{
    //                     x: 'Low',
    //                     y: [internalCount,]
    //                 }, {
    //                     x: 'Medium',
    //                     y: [internalMediumCount,]
    //                 }, {
    //                     x: 'High',
    //                     y: [internalHighCount,]
    //                 }, {
    //                     x: 'Emergency',
    //                     y: [internalEmergencyCount,]
    //                 }
    //             ]
    //         },
    //         {
    //             name: 'Ext. Transport',
    //             data: [{
    //                     x: 'Low',
    //                     y: [externalCount,]
    //                 }, {
    //                     x: 'Medium',
    //                     y: [externalMediumCount,]
    //                 }, {
    //                     x: 'High',
    //                     y: [externalHighCount,]
    //                 }, {
    //                     x: 'Emergency',
    //                     y: [externalEmergencyCount,]
    //                 }
    //             ]
    //         },
    //         {
    //             name: 'Gift Delivery',
    //             data: [{
    //                     x: 'Low',
    //                     y: [giftCount,]
    //                 }, {
    //                     x: 'Medium',
    //                     y: [giftMediumCount,]
    //                 }, {
    //                     x: 'High',
    //                     y: [giftHighCount,]
    //                 }, {
    //                     x: 'Emergency',
    //                     y: [giftEmergencyCount,]
    //                 }
    //             ]
    //         },
    //     ],
    //     options: {
    //         chart: {
    //             height: 350,
    //             type: 'rangeBar'
    //         },
    //         plotOptions: {
    //             bar: {
    //                 borderRadius: 10,
    //             }
    //         },
    //         dataLabels: {
    //             enabled: true,
    //         },
    //         fill: {
    //             type: 'gradient',
    //             gradient: {
    //                 shade: 'light',
    //                 type: 'vertical',
    //                 shadeIntensity: 0.25,
    //                 gradientToColors: undefined,
    //                 inverseColors: true,
    //                 opacityFrom: 1,
    //                 opacityTo: 1,
    //                 stops: [50, 0, 100, 100]
    //             }
    //         },
    //         title:{
    //             text: "Form Priority Distribution",
    //             align: 'middle',
    //             margin: 10,
    //             offsetX: 0,
    //             offsetY: 0,
    //             floating: false,
    //             style: {
    //                 fontSize: '25px',
    //                 fontWeight: '1000',
    //                 fontFamily: 'Open Sans',
    //                 color: '#263238'
    //             }
    //         },
    //         xaxis: {
    //             type: 'number',
    //             label: 'Priority'
    //         },
    //         legend: {
    //             position: 'bottom'
    //         }
    //     },
    // };

    const yourState = {
        series: [
            {
                name: 'Maintenance',
                data: [maintenanceCount, maintenanceMediumCount, maintenanceHighCount, maintenanceEmergencyCount]
            }, {
                name: 'Language',
                data: [languageCount, languageMediumCount, languageHighCount, languageEmergencyCount]
            }, {
                name: 'Sanitation',
                data: [sanitationCount, sanitationMediumCount, sanitationHighCount, sanitationEmergencyCount]
            }, {
                name: 'Medicine',
                data: [medicineCount, medicineMediumCount, medicineHighCount, medicineEmergencyCount]
            }, {
                name: 'Security',
                data: [securityCount, securityMediumCount, securityHighCount, securityEmergencyCount]
            }, {
                name: 'Int. Transport',
                data: [internalCount, internalMediumCount, internalHighCount, internalEmergencyCount]
            }, {
                name: 'Ext. Transport',
                data: [externalCount, externalMediumCount, externalHighCount, externalEmergencyCount]
            }, {
                name: 'Gift Delivery',
                data: [giftCount, giftMediumCount, giftHighCount, giftEmergencyCount]
            },
        ],
        options: {
            chart: {
                height: 350,
                type: 'bar',
                stacked: true,
            },
            plotOptions: {
                bar: {
                    columnWidth: 150,
                    horizontal: false,
                    borderRadius: 20,
                    borderRadiusApplication: 'end',
                    borderRadiusWhenStacked: 'last',
                    dataLabels: {
                        total: {
                            enabled: true,
                            style: {
                                fontSize: '13px',
                                fontWeight: 900
                            }
                        }
                    }
                },
            area:{
                fillTo: 'end'
            }
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shade: 'light',
                    type: 'vertical',
                    shadeIntensity: 0.25,
                    gradientToColors: undefined,
                    inverseColors: true,
                    opacityFrom: 1,
                    opacityTo: 1,
                    stops: [50, 0, 100, 100]
                }
            },
            title:{
                text: "Total Form Priority Distribution",
                align: 'middle',
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
            xaxis: {
                type: 'string',
                categories: ['Low', 'Medium', 'High', 'Emergency'],
            },
            legend: {
                position: 'bottom'
            },
        },
    };


    const donutRequest = {
        options: {
            chart: {
                height: 450,
                type: "pie"
            },
            plotOptions: {
                pie: {
                    donut: {
                        labels: {
                            show: true,
                            total: {
                                show: true,
                            },
                        },
                    },
                },
            },
            series: [unassignedCount, assignedCount, inProgressCount, closedCount], // Include your actual data along with 0 for "Total"
            legend: {
                show: true,
                position: 'bottom',
                horizontalAlign: 'center',
                markers: {
                    fillColors: ['#008FFB', '#00E396', '#FEB019', '#FF4560'] // Adjust colors accordingly
                },
                style:{
                    fontWeight: '200',
                },
            },
            title:{
                text: "Request Status",
                align: 'middle',
                offsetX: 0,
                offsetY: 5,
                floating: false,
                style: {
                    fontSize: '25px',
                    fontWeight: '1000',
                    fontFamily: 'Open Sans',
                    color: '#263238'
                }
            },
            labels: ['Unassigned', 'Assigned', 'InProgress', 'Closed'], // Include labels for each data point and "Total"
            dataLabels: {
                enabled: true,
                dropShadow: false,
            },
        },
    };

    const donutAssignment = {
        options: {
            chart: {
                height: 450,
                type: "pie"
            },
            plotOptions: {
                pie: {
                    donut: {
                        labels: {
                            show: true,
                            total: {
                                show: true,
                            },
                        },
                    },
                },
            },
            series: [lowCount, mediumCount, highCount, emergencyCount], // Include your actual data along with 0 for "Total"
            legend: {
                show: true,
                position: 'bottom',
                horizontalAlign: 'center',
                markers: {
                    fillColors: ['#008FFB', '#00E396', '#FEB019', '#FF4560'] // Adjust colors accordingly
                },
                offsetY: 5,
            },
            title:{
                text: "Assignments (Priority)",
                align: 'middle',
                offsetX: 0,
                offsetY: 5,
                floating: false,
                style: {
                    fontSize: '25px',
                    fontWeight: '1000',
                    fontFamily: 'Open Sans',
                    color: '#263238'
                }
            },
            labels: ['Low', 'Medium', 'High', 'Emergency'], // Include labels for each data point and "Total"
            dataLabels: {
                enabled: true,
                dropShadow: false,
            },
        },
    };

    return (
        <div className={"flex flex-row"}>
            <div className={"h-[640px] w-100 bg-white text-wrap rounded-xl shadow-xl ml-10 mt-4 overflow-hidden"}>
                <p className={"text-wrap w-full h-full"}>One two three four five six seven eight nine ten</p>
            </div>
            <div className={"flex flex-col space-y-5 mt-4"}>
                <div className="flex flex-row w-fit h-fit ml-5 space-x-5" id="rangeBar">
                    <div className={" bg-white rounded-xl shadow-xl h-[295px] w-[360px]"}>
                        t
                        {/*<Chart options={state.options}*/}
                        {/*       series={state.series}*/}
                        {/*       type="bar"*/}
                        {/*       height={285}*/}
                        {/*       width={360}*/}
                        {/*/>*/}
                    </div>
                    <div className={"bg-white rounded-xl shadow-xl"}>
                        <Chart options={donutRequest.options}
                               series={donutRequest.options.series}
                               type="donut"
                               height={325}
                               width={300}
                        />
                    </div>
                    <div className={" bg-white rounded-xl shadow-xl "}>
                        <Chart options={donutAssignment.options}
                               series={donutAssignment.options.series}
                               type="donut"
                               height={325}
                               width={300}
                        />
                    </div>
                </div>
                <div className="w-fit h-fit bg-white rounded-xl shadow-xl ml-5" id="rangeBar">
                    <Chart options={yourState.options}
                           series={yourState.series}
                           type="bar"
                           height={310}
                           width={1000}
                    />
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
