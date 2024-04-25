function OrderCard(props:{order: string[]; time: number}) {

    function showFlowers() {
        return props.order.map((flower) =>
           <>
               <p>{flower}</p>
           </>
        );
    }

    function showTime() {
        const min = Math.floor(props.time/60);
        const sec = props.time%60;
        let zero = "";
        if (sec < 10) zero = "0";
        return (
            <>
                <p>{min + " : " + zero + sec}</p>
            </>
        );
    }

    return(
        <>
            <div className="bg-bone-white flex flex-col p-6 rounded gap-1">
                <h2 className="text-lg font-bold">Order</h2>
                {showFlowers()}
                {showTime()}
            </div>
        </>
    );
}

export default OrderCard;
