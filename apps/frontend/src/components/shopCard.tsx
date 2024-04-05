
function ShopCard(props:{image: string, name: string, cost: number}) {
    return(
        <div className="border-deep-blue border-2 bg-white border-rounded w-fit">
            <h3>{props.name}</h3>
        </div>
    );
}

export default ShopCard;
