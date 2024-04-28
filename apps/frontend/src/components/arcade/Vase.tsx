import {useEffect, useRef} from "react";
import wavyVasePNG from "../../assets/arcade/vase-wavy.png";
import stripeVasePNG from "../../assets/arcade/vase-stripe.png";
import ArcadeButton from "@/components/arcade/ArcadeButton.tsx";

function Vase(props:{mode: string, playerX: number, playerY: number, scale: number, type: string,
    scoreVase: (score: number) => void, choosePattern: (pattern: string) => void}) {

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const ctx = useRef<CanvasRenderingContext2D>(null);
    if (canvasRef.current) {
        ctx.current = canvasRef.current.getContext('2d');
    }

    const isDrawing = useRef(false);

    const mouseX = useRef(0);
    const mouseY = useRef(0);

    const lastX = useRef(0);
    const lastY = useRef(0);

    const wavyImage = new Image(840, 840);
    wavyImage.src = wavyVasePNG;
    const stripeImage = new Image(840, 840);
    stripeImage.src = stripeVasePNG;

    const offsetX = useRef(0);
    const offsetY = useRef(0);

    const drawn = useRef(false);

    const ogImageColors = useRef([0,0]);

    useEffect(() => {

        if (canvasRef.current != null && ctx.current != null) {

            if ((drawn.current) && (props.mode == "noVase")) {
                drawn.current = false;
            }

            offsetX.current = canvasRef.current.offsetLeft + canvasRef.current.getBoundingClientRect().left;
            offsetY.current = canvasRef.current.offsetTop + canvasRef.current.getBoundingClientRect().top;

            if (!drawn.current && (props.mode != "noVase")) {
                ctx.current.imageSmoothingEnabled = true;
                ctx.current.imageSmoothingQuality = "high";

                if (props.type == "wavy") {
                    ctx.current.drawImage(wavyImage, 0, 0, 400, 400);
                }
                else {
                    ctx.current.drawImage(stripeImage, 0, 0, 400, 400);
                }

                ctx.current.beginPath();
                ctx.current.moveTo(110,20);
                ctx.current.lineTo(290,20);
                ctx.current.lineTo(260,70);
                ctx.current.lineTo(260,100);
                ctx.current.lineTo(335,200);
                ctx.current.lineTo(240,360);
                ctx.current.lineTo(260,385);
                ctx.current.lineTo(140,385);
                ctx.current.lineTo(160,360);
                ctx.current.lineTo(65,200);
                ctx.current.lineTo(140,100);
                ctx.current.lineTo(140,70);
                ctx.current.lineTo(110,20);
                ctx.current.clip();

                drawn.current = true;
                ctx.current.strokeStyle = "#012D5A";
                ctx.current.lineWidth = 20;
                ctx.current.lineCap = 'round';
                ctx.current.lineJoin = 'round';

                ogImageColors.current = getImageColors();
            }

        }

    });

    function getImageColors() {
        const colors: number[] = [0,0];

        //const paintColor = [1,45,90];
        const traceColor = [196,196,196];
        const vaseColor = [241,241,241];

        if (ctx.current){
            const pixels = ctx.current.getImageData(0, 0, 400, 400).data;
            for (let i = 0; i < pixels.length; i+=4) {
               if ((pixels[i] == traceColor[0]) && (pixels[i+1] == traceColor[1]) && (pixels[i+2] == traceColor[2])){
                   colors[0]++;
               }
                if ((pixels[i] == vaseColor[0]) && (pixels[i+1] == vaseColor[1]) && (pixels[i+2] == vaseColor[2])){
                    colors[1]++;
                }
            }
        }
        return colors;
    }


    function toggleDraw(e: React.MouseEvent, drawing: boolean) {
        isDrawing.current = drawing;
        mouseX.current = e.clientX - offsetX.current;
        mouseY.current = e.clientY - offsetY.current;
        lastX.current = e.clientX - offsetX.current;
        lastY.current = e.clientY - offsetY.current;
        if (ctx.current) ctx.current.beginPath();
    }
    function move(e: React.MouseEvent) {
        if (isDrawing.current) {
            lastX.current = mouseX.current;
            lastY.current = mouseY.current;
            mouseX.current = e.clientX - offsetX.current;
            mouseY.current = e.clientY - offsetY.current;

            if (ctx.current) {
                ctx.current.beginPath();
                ctx.current.moveTo(lastX.current, lastY.current);
                ctx.current.lineTo(mouseX.current, mouseY.current);
                ctx.current.stroke();
            }
        }

    }

    function getVasePosition() {
        if (props.mode == "move") {
            return {
                top: props.playerY - 275 + "px",
                left: props.playerX -180 + "px",
                transform: `scale(0.25, 0.25) translate(0px, ${props.playerY/4}px)`,
                display: "block"
            };
        }
        if (props.mode == "paint") {
            return {
                top: "100px",
                left: "300px",
                display: "block"
            };
        }
        if ((props.mode == "noVase") || (props.mode == "choose")) {
            return {
                display: "none"
            };
        }
    }
    function showBox() {
        if (props.mode == "paint") {
            return {
                display: "flex"
            };
        }
        else {
            return {
                display: "none"
            };
        }
    }

    function finishedPaint() {
        const newColors = getImageColors();
        //alert(newColors);

        let score = 100;

        const calcVaseScore = (Math.abs(ogImageColors.current[1] - newColors[1])+ newColors[0]);

        const worstScore= ogImageColors.current[1]+ogImageColors.current[0];
        score -= Math.min(calcVaseScore/worstScore*300, 100);

        props.scoreVase(score);
    }

    function showChoice() {
        if (props.mode == "choose") {
            return {
                display: "flex"
            };
        }
        else {
            return {
                display: "none"
            };
        }
    }


    return(
        <>
            <div className="absolute centerContent flex flex-col bg-bone-white top-[180px] gap-6
            left-[370px] w-[250px] h-[200px] z-0 rounded-4 shadow-2xl rounded-2xl p-3" style={showChoice()}>
                <ArcadeButton onClick={() => {props.choosePattern("wavy"); drawn.current = false;}}>Wavy Vase</ArcadeButton>
                <ArcadeButton onClick={() => {props.choosePattern("stripe"); drawn.current = false;}}>Striped Vase</ArcadeButton>
            </div>
            <div className="absolute centerContent flex flex-col shadow-gray-800 place-content-between top-[40px] bg-bone-white
            left-[300px] w-[400px] h-[525px] z-0 rounded-4 shadow-2xl rounded-2xl p-3" style={showBox()}>
                <h2 className="font-bold text-lg">Paint the vase by tracing the pattern!</h2>
                <ArcadeButton onClick={finishedPaint}>Done</ArcadeButton>
            </div>
            <div className="absolute" style={getVasePosition()}>
                <canvas width={400} height={400} ref={canvasRef}
                        onMouseDown={(e: React.MouseEvent) => toggleDraw(e, true)}
                        onMouseUp={(e: React.MouseEvent) => toggleDraw(e, false)}
                        onMouseMove={(e: React.MouseEvent) => move(e)}></canvas>

            </div>
        </>
    );
}

export default Vase;
