import Chart from "react-apexcharts";
import React from "react";

const state = {

    series: [
        {
            name: 'Maintenance',
            data: [
                {
                    x: 'Low',
                    y: [
                        10,
                    ]
                },
                {
                    x: 'Medium',
                    y: [
                        20,
                    ]
                },
                {
                    x: 'High',
                    y: [
                        30,
                    ]
                },
                {
                    x: 'Emergency',
                    y: [
                        30,
                    ]
                }
            ]
        },
        {
            name: 'Language',
            data: [
                {
                    x: 'Low',
                    y: [
                        40,
                    ]
                },
                {
                    x: 'Medium',
                    y: [
                       60,
                    ]
                },
                {
                    x: 'High',
                    y: [
                        60,
                    ]
                },
                {
                    x: 'Emergency',
                    y: [
                        30,
                    ]
                }
            ]
        },
        {
            name: 'Medicine',
            data: [
                {
                    x: 'Low',
                    y: [

                        20,
                    ]
                },
                {
                    x: 'Medium',
                    y: [
                       70,

                    ]
                },
                {
                    x: 'High',
                    y: [


                        20,
                    ]
                },
                {
                    x: 'Emergency',
                    y: [
                        30,
                    ]
                }
            ]
        },
        {
            name: 'Sanitation',
            data: [
                {
                    x: 'Low',
                    y: [
                        40,

                    ]
                },
                {
                    x: 'Medium',
                    y: [
                       50,

                    ]
                },
                {
                    x: 'High',
                    y: [
                        60,

                    ]
                },
                {
                    x: 'Emergency',
                    y: [
                        30,
                    ]
                }
            ]
        },
        {
            name: 'Security',
            data: [
                {
                    x: 'Low',
                    y: [
                        40,

                    ]
                },
                {
                    x: 'Medium',
                    y: [

                        70,


                    ]
                },
                {
                    x: 'High',
                    y: [

                        20,
                    ]
                },
                {
                    x: 'Emergency',
                    y: [
                        30,
                    ]
                }
            ]
        },
        {
            name: 'Int. Transport',
            data: [
                {
                    x: 'Low',
                    y: [
                        40,

                    ]
                },
                {
                    x: 'Medium',
                    y: [

                        70,


                    ]
                },
                {
                    x: 'High',
                    y: [

                        20,
                    ]
                },
                {
                    x: 'Emergency',
                    y: [
                        30,
                    ]
                }
            ]
        },
        {
            name: 'Ext. Transport',
            data: [
                {
                    x: 'Low',
                    y: [
                        40,

                    ]
                },
                {
                    x: 'Medium',
                    y: [

                        70,


                    ]
                },
                {
                    x: 'High',
                    y: [

                        20,
                    ]
                },
                {
                    x: 'Emergency',
                    y: [
                        30,
                    ]
                }
            ]
        },
        {
            name: 'Gift Delivery',
            data: [
                {
                    x: 'Low',
                    y: [
                        40,
                    ]
                },
                {
                    x: 'Medium',
                    y: [
                        20,
                    ]
                },
                {
                    x: 'High',
                    y: [
                        60,
                    ]
                },
                {
                    x: 'Emergency',
                    y: [
                        30,
                    ]
                }
            ]
        },







    ],
    options: {
        chart: {
            height: 350,
            type: 'rangeBar'
        },
        plotOptions: {
            bar: {
                borderRadius: 10,
            }
        },
        dataLabels: {
            enabled: true,
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
        xaxis: {
            type: 'number'
        },
        legend: {
            position: 'bottom'
        }
    },


};


export function userProfile(){



    return (
        <div className={"flex flex-row  h-full"}>
            <div className={"h-[80%] w-100 bg-white text-wrap rounded-xl shadow-xl ml-10 mt-14"}>
                <p className={"text-wrap w-full h-full"}>One two three four five six seven eight nine ten</p>
            </div>
            <div className={"flex flex-col space-y-16"}>
                <div className="w-fit h-fit" id="rangeBar">
                    <Chart options={state.options}
                           series={state.series}
                           type="bar"
                           height={285}
                           width={1000}
                    />
                </div>
                <div className="w-fit h-fit" id="rangeBar">
                    <Chart options={state.options}
                           series={state.series}
                           type="bar"
                           height={285}
                           width={1000}
                    />
                </div>
            </div>
        </div>
    );
}

export default userProfile;
