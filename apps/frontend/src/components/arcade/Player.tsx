
function Player(props:{xpos: number; ypos: number;
    vase: { hasVase: boolean, flowers: string[] }}) {

    function createFlower(flower: string, position: number) {
        const branchPos = {
            left: 10 + position*6 + "px",
        };
        const flowerPos = {
            left: 9 + position*6 + "px",
        };
        if (flower == "Tulip") {
            return (
                <>
                    <div className="absolute bottom-[75px] w-[3px] h-[30px] bg-green-800" style={branchPos}></div>
                    <div className="absolute bottom-[105px] w-[5px] h-[8px] bg-pink-400" style={flowerPos}></div>
                </>
            );
        }
        if (flower == "Rose") {
            return (
                <>
                    <div className="absolute bottom-[75px] w-[3px] h-[30px] bg-green-800" style={branchPos}></div>
                    <div className="absolute bottom-[105px] w-[5px] h-[8px] bg-red-800" style={flowerPos}></div>
                </>
            );
        }
    }

    function createFlowers() {
        return props.vase.flowers.map((flower, index) =>
            createFlower(flower, index)
        );
    }
    function createVase() {
        if (props.vase.hasVase) {
            return (
                <>
                    <div className="absolute bottom-[40px] left-[5px] w-[30px] h-[35px] bg-gray-400"></div>
                    {createFlowers()}
                </>
            );
        }
    }

    return(
        <>
            <div className="absolute flex flex-col-reverse" style = {{left: props.xpos + "px", top: props.ypos + "px"}}>
                <div className="w-[40px] h-[40px] bg-black"></div>
                {createVase()}
            </div>
        </>
    );
}

export default Player;
