function OrderCard(props:{order: string[]}) {

    function showFlowers() {
        return props.order.map((flower) =>
           <>
               <p>{flower}</p>
           </>
        );
    }

    return(
        <>
            <div className="bg-bone-white flex flex-col p-6 rounded gap-1">
                <h2 className="text-lg font-bold">Order</h2>
                {showFlowers()}
            </div>
        </>
    );
}

export default OrderCard;
