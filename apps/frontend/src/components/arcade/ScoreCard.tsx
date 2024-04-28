import ArcadeButton from "@/components/arcade/ArcadeButton.tsx";

function ScoreCard(props:{score: {flowers: number, vase: number, time: number}, order: string, gameOver: boolean,
    closeCard: () => void}) {


    function starString(score: number) {
        let starstring = "";
        let graystring = "";
        for (let i = 0; i < Math.ceil(score/20); i++) {
            starstring += "★";
        }
        for (let i = 0; i < 5-starstring.length; i++) {
            graystring += "★";
        }
        return (
            <>
                <span style={{color: "#F6BD38"}}>{starstring}</span>
                <span style={{color: "#e0e0e0"}}>{graystring}</span>

            </>
        );
    }
    function topText() {
        if (props.gameOver) {
            return "That's all the orders for today!";
        }
        return props.order;
    }
    function scoreBar() {
        const avg = (props.score.flowers*3 + props.score.vase*2 + props.score.time)/6;
        const width = 288 * (avg/100);

        return (
            <>
                <div className="absolute left-0 bg-[#F6BD38] h-2 rounded" style = {{width: width + "px"}}></div>
                <div className="w-full bg-[#e0e0e0] h-full rounded"></div>
            </>
        );
    }
    function overallLine() {
        if (props.gameOver) {
            return (<h3 className="text-xl font-bold pt-6">Overall Scores</h3>);
        }
    }

    function showAvgStars() {
        const avg = (props.score.flowers*3 + props.score.vase*2 + props.score.time)/6;
        return (
            <>
                <h2 className="text-2xl font-bold">{topText()}</h2>
                {overallLine()}
                <p className="text-6xl">{starString(avg)}</p>
                <div className="relative w-72 h-4 pt-2 rounded overflow-hidden">{scoreBar()}</div>
            </>
        );
    }
    function showStars(title: string, key: string) {
        return (
            <>
                <h3 className="text-lg">{title}</h3>
                <p className="text-2xl">{starString(props.score[key])}</p>
            </>
        );
    }

    function buttonText() {
        if (props.gameOver) {
            return "Play Again";
        }
        return "Close";
    }

    return(
        <>
            <div className="absolute centerContent flex flex-col place-content-between top-[70px] bg-bone-white
            left-[300px] w-[400px] h-fit z-50 rounded-4 shadow-gray-800 shadow-2xl rounded-2xl p-6">
                {showAvgStars()}
                <div className="flex flex-col py-2">
                    {showStars("Flowers", "flowers")}
                    {showStars("Vase", "vase")}
                    {showStars("Time", "time")}
                </div>
                <ArcadeButton onClick={props.closeCard}>{buttonText()}</ArcadeButton>
            </div>
        </>
    );
}

export default ScoreCard;
