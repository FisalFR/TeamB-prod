import React, {useState, useEffect, useRef} from "react"; // , useMemo
import axios from "axios";
import Table from "../components/Table.tsx";
import Button from "../components/Button.tsx";
import Chart from "react-apexcharts";
//import {LoadingDot} from "../components/loadingDot.tsx";
// import useTable from "react-table";

const options = {
    chart: {
        id: "basic-bar"
    },
    xaxis: {
        categories: ['Nodes', 'Edges', 'Employees']
    },
    plotOptions: {
        bar: {
            distributed: true,
            borderRadius: 10,
        }
    },

    colors: ['#F00072', '#00CEF0', '#F0D600'],

    title:{
        text: "CSV Distribution",
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


export function CsvManager() {

    const [nodeCount, setNodeCount] = useState(0);

    const getNodes = () => {
        axios.get("/api/csvManager/countNodes").then((response) => {
            setNodeCount(response.data);
        });
    };

    const [edgeCount, setEdgeCount] = useState(0);

    const getEdges = () => {
        axios.get("/api/csvManager/countEdges").then((response) => {
            setEdgeCount(response.data);
        });
    };


    useEffect(() => {
        getNodes();
        getEdges();
    }, []);

    const series = [
        {
            name: "Count",
            data: [nodeCount,edgeCount,680],
        }
    ];







    // TODO refactor to work with two separate GET URLs based on radio button input
    const [nodeData, setNodeData] = useState(["Error accessing node data."]);
    const [edgeData, setEdgeData] = useState(["Error accessing edge data."]);

    const formRefNodes = useRef<HTMLFormElement>(null);
    const formRefEdges = useRef<HTMLFormElement>(null);



    // TODO extract to external function to be called here and in map.tsx
    // With no dependencies listed, the Effect will re-run after every re-render of the component.
    useEffect( () => {
        resetTable();
    }, []);

    function resetTable() {
        axios.get("/api/csvManager/nodes").then((response) => {
            const tempNodeData = [];
            for (let i = 0; i < response.data.length; i++) {
                tempNodeData.push({name: response.data[i].longName, id: response.data[i].nodeID, xcord: response.data[i].xcoord, ycord: response.data[i].ycoord,
                    floor: response.data[i].floor, building: response.data[i].building, nodeType: response.data[i].nodeType, longName: response.data[i].longName, shortName: response.data[i].shortName});
            }
            setNodeData(tempNodeData);
        });

        axios.get("/api/csvManager/edges").then((response) => {
            const tempEdgeData = [];
            for (let i = 0; i < response.data.length; i++) {
                tempEdgeData.push({edgeID: response.data[i].edgeID, startNodeID: response.data[i].startNodeID, endNodeID: response.data[i].endNodeID});
            }
            setEdgeData(tempEdgeData);
        });
    }

    function handleExportNodes(): void {
        axios.get("/api/csvManager/exportNodes").then((response) => {
            const csvData = response.data;
            const blob = new Blob([csvData], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const element = document.createElement("a");
            element.href = url;
            element.download = "nodeDataFile.csv";
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        });
    }

    function handleExportEdges(): void {
        axios.get("/api/csvManager/exportEdges").then((response) => {
            const csvData = response.data;
            const blob = new Blob([csvData], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const element = document.createElement("a");
            element.href = url;
            element.download = "edgeDataFile.csv";
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        });
    }

    function handleImportNodes() {
        const formNodeData = new FormData(formRefNodes.current as HTMLFormElement);
        axios.post("/api/csvManager/uploadNodes",formNodeData,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            alert(response.data);
            resetTable();
        }
        );
    }

    function handleImportEdges() {
        const formEdgeData = new FormData(formRefEdges.current as HTMLFormElement);
        axios.post("/api/csvManager/uploadEdges", formEdgeData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            alert(response.data);
            resetTable();
        });
    };

    const [activeTab, setActiveTab] = useState<string>("nodes"); // State for active tab

    // Function to handle tab button click
    const handleTabClick = (tabId: string) => {
        setActiveTab(tabId);
    };

    // Function to render tab content based on active tab
    const renderTabContent = () => {
        switch (activeTab) {
            case "nodes":
                return (
                    <div className="">
                        {<div className="max-h-[92vh] overflow-auto w-full">
                            <Table data={nodeData}
                                   headings={["Name", "Node ID", "X-Coord", "Y-Coord", "Floor", "Building", "Node Type", "Long Name", "Short Name"]}
                                   keys={["name", "id", "xcord", "ycord", "floor", "building", "nodeType", "longName", "shortName"]}
                                   px = "px-2" py = "py-2" />
                        </div>}
                    </div>
                );
            case "edges":
                return (
                    <div className=" flex flex-xl-grow-1 w-full">
                        {<div className="max-h-[92vh] overflow-auto flex-grow w-full">
                            <Table data={edgeData}
                                   headings={["Edge ID", "Start Node", "End Node"]}
                                   keys={["edgeID", "startNodeID", "endNodeID"]}/>
                        </div>}
                    </div>
                );
            case "employees":
                return (
                    <div className="">
                        {<p className="text-sm text-gray-500 dark:text-gray-400">This is some placeholder content
                            the <strong
                                className="font-medium text-gray-800 dark:text-white">Settings tab's associated
                                content</strong>. Clicking
                            another tab will toggle the visibility of this one for the next. The tab JavaScript swaps
                            classes to
                            control the content visibility and styling.</p>}
                    </div>
                );
            default:
                return null;
        }
    };

    const renderTabUpload = () => {
        switch (activeTab) {
            case "nodes":
                return (
                    <div className="shadow-xl p-3 rounded-xl bg-white w-full">
                        <h3 className={"flex items-start text-xl font-OpenSans font-bold pb-4 pt-2"}>Upload Node
                            CSV</h3>
                        <form ref={formRefNodes} onSubmit={e => {
                            e.preventDefault();
                        }}>
                            <div className={"flex flex-row justify-between bg-light-white p-2 rounded-md"}>
                                <input className={"space-x-10"} type="file" name="importedNodes"/>
                            </div>
                            <div className={"flex centerContent space-x-5 pt-5"}>
                                <Button onClick={handleImportNodes}>Upload</Button>
                                {<Button onClick={handleExportNodes}>Download</Button>}
                            </div>
                        </form>
                    </div>
                );
            case "edges":
                return (
                    <div className="shadow-xl p-3 rounded-xl bg-white w-full">
                    <h3 className={"flex items-start text-xl font-OpenSans font-bold pb-4 pt-2"}>Upload Edge CSV</h3>
                <form ref={formRefEdges} onSubmit={e => {
                    e.preventDefault();
                }}>
                    <div className={"flex flex-row justify-between bg-light-white p-2 rounded-md"}>
                        <input type="file" name="importedEdges" className="left-4"/>
                    </div>
                    <div className={"flex centerContent space-x-5 pt-5"}>
                        <Button onClick={handleImportEdges}>Upload</Button>
                        {<Button onClick={handleExportEdges}>Download</Button>}
                    </div>
                </form>
                    </div>

            )
                ;
            case "employees":
                return (
                    <div className="shadow-xl p-3 rounded-xl bg-white w-full">
                        <h3 className={"flex items-start text-xl font-OpenSans font-bold pb-4 pt-2"}>Upload Employee CSV</h3>
                        <form ref={formRefEdges} onSubmit={e => {
                            e.preventDefault();
                        }}>
                            <div className={"flex flex-row justify-between bg-light-white p-2 rounded-md"}>
                                <input type="file" name="importedEdges" className="left-4"/>
                            </div>
                            <div className={"flex centerContent space-x-5 pt-5"}>
                                <Button onClick={handleImportEdges}>Upload</Button>
                                {<Button onClick={handleExportEdges}>Download</Button>}
                            </div>
                        </form>
                    </div>
                );
            default:
                return null;
        }
    };


    return (
        <div className="flex">
        <div className={"flex flex-row max-h-full bg-bone-white overflow-y-hidden"}>
                <div className="flex mx-3 space-y-7 h-full max-h-[93vh] min-w-fit overflow-y-auto overflow-x-hidden">
                    <div className="flex h-full max-h-[93vh]">

                        <div className="flex flex-col items-start pt-3 rounded-3xl w-1/3 min-w-fit h-[92vh]">
                            <h2 className={"font-extrabold text-3xl font-OpenSans flex items-start pb-5 pl-2"}>CSV
                                Manager</h2>
                            {/* Tabbed interface */}
                            <div className={"flex flex-col w-full max-h-[93vh]"}>
                                <div className="border-b border-gray-200 pb-1 overflow-hidden">
                                    <ul className="flex justify-centerz` text-sm font-medium text-center w-full rounded-md bg-gray-200 mb-4"
                                        role="tablist">
                                        {/* Node tab button */}
                                        <li className={activeTab === "nodes" ? "me-2 active" : "me-2"}
                                            onClick={() => handleTabClick("nodes")} role="presentation">
                                            <button
                                                className={`inline-block text-md p-2 border-b-2 my-1 ml-1 rounded-md hover:bg-gray-100 px-8 font-bold ${activeTab === "nodes" ? "bg-gray-100 font-extrabold" : ""}`}
                                                aria-selected={activeTab === "nodes"}>Nodes
                                            </button>
                                        </li>
                                        {/* Edge tab button */}
                                        <li className={activeTab === "edges" ? "me-2 active" : "me-2"}
                                            onClick={() => handleTabClick("edges")} role="presentation">
                                            <button
                                                className={`inline-block text-md p-2 border-b-2 my-1 rounded-md hover:bg-gray-100 px-9  font-bold ${activeTab === "edges" ? "bg-gray-100 font-extrabold" : ""}`}
                                                aria-selected={activeTab === "edges"}>Edges
                                            </button>
                                        </li>
                                        {/* Employee tab button */}
                                        <li className={activeTab === "employees" ? "me-2 active" : "me-2"}
                                            onClick={() => handleTabClick("employees")} role="presentation">
                                            <button
                                                className={`inline-block text-md p-2 border-b-2 my-1 rounded-md hover:bg-gray-100 px-5 font-bold  ${activeTab === "employees" ? "bg-gray-100 font-extrabold" : ""}`}
                                                aria-selected={activeTab === "employees"}>Employees
                                            </button>
                                        </li>
                                    </ul>

                                    <div className="flex w-full" id="default-tab-content">
                                        {renderTabUpload()}
                                    </div>

                                </div>

                                <div className="flex flex-col flex-grow items-center bg-white p-4 mt-5 rounded-xl shadowl-xl">
                                    <div className="flex flex-grow" id="chart">
                                        <Chart options={options}
                                               series={series}
                                               type="bar"
                                               height={285}
                                        />
                                    </div>
                                    <div id="html-dist"></div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>


            {/* Tab content */}
            <div className="flex flex-grow w-full" id="default-tab-content">
                <div className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="nodes" role="tabpanel"
                     aria-labelledby="nodes-tab">
                </div>
                <div className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="edges" role="tabpanel"
                     aria-labelledby="edges-tab">
                </div>
                <div className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="settings" role="tabpanel"
                     aria-labelledby="employees-tab">
                </div>

                <div className="flex flex-fill w-full" id="default-tab-content">
                        {renderTabContent()}
                </div>

            </div>
        </div>
        </div>
    );
}

export default CsvManager;
