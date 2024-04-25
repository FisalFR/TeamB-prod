import {useEffect, useRef} from "react";
import OrderCard from "@/components/arcade/OrderCard.tsx";

function OrderManager(props:{flowers: string[]; orderMax: number; currentTime: number;
    addOrder: (order: string[]) => void; orders: string[][]; orderTimes: number[]}) {

    const MIN_TIME_BETWEEN_ORDERS = 20;
    const RANDOM_TIME = 5;
    const MAX_ORDERS = 3;

    const nextTime = useRef(1000);


    useEffect(() => {
        if ((props.currentTime == nextTime.current) && (props.currentTime > 0)) {
            nextTime.current = props.currentTime + (MIN_TIME_BETWEEN_ORDERS + Math.floor(Math.random()*RANDOM_TIME))*1000;
            generateOrder();
        }
    });

    function generateOrder() {
        if (props.orders.length < MAX_ORDERS) {
            const orderFlowers = [];
            for (let i = 0; i < props.orderMax; i++) {
                orderFlowers[i] = props.flowers[Math.floor(Math.random()*props.flowers.length)];
            }
            props.addOrder(orderFlowers);
        }
    }

    function showOrders() {
        return props.orders.map((order, index) =>
            <>
                <OrderCard order={order} time={props.orderTimes[index]}/>
            </>
        );
    }

    return(
        <>
            <div className="absolute top-2 left-2 flex flex-row gap-10">{showOrders()}</div>
        </>
    );
}

export default OrderManager;
