import ArcadeButton from "@/components/arcade/ArcadeButton.tsx";

function OrderCard(props:{order: {flowers: string[]; vase: string;}; time: number; current: boolean;
    orderNum: number, setCurrent: (num: number) => void, totalNum: number}) {

    function showFlowers() {
        return props.order.flowers.map((flower, index) => {
            if (index < props.order.flowers.length-1) {
                return (<span>{flower}, </span>);
            }
            return (<span>{flower} </span>);
        });
    }

    function showVase() {
        let vaseString = "";
        if (props.order.vase == "wavy") {
            vaseString = "Wavy Vase";
        }
        else {
            vaseString = "Striped Vase";
        }
        return (
            <>
                <p>{vaseString}</p>
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

    function style() {
        if (props.current) {
            return {
                border: "5px solid #F6BD38"
            };
        }
    }
    function showButton() {
        if (!props.current) {
            return {
                display: "block"
            };
        }
        return {display: "none"};
    }
    function showText() {
        if (props.current) {
            return {
                display: "block"
            };
        }
        return {display: "none"};
    }

    return(
        <>
            <div className="bg-bone-white flex flex-col p-2 w-[210px] rounded-2xl gap-1 centerContent" style={style()}>
                <h2 className="text-lg font-bold">Order {props.totalNum}</h2>
                <p>{showFlowers()}</p>
                {showVase()}
                {showTime()}
                <div style={showButton()}>
                    <ArcadeButton onClick={() => props.setCurrent(props.orderNum)} px={"px-[15px]"}
                                  color={"bg-[#F6BD38]"}>Switch</ArcadeButton>
                </div>
                <div style={showText()}>
                    <p className="py-1 text-[21px] text-[#F6BD38] font-bold">Current</p>
                </div>

            </div>
        </>
    );
}

export default OrderCard;
