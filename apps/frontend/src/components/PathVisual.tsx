import { JSX } from "react/jsx-runtime";

function PathVisual(props: { path: number[][]; image: string; width: number; height: number; scale:number; showPath: boolean} ) {
    const pathArray = props.path;

    function createPaths() {
        if (props.showPath) {
            const lines: JSX.Element[] = [];
            for (let i = 0; i < pathArray.length - 1; i++){
                lines.push(<line x1={pathArray[i][0]} y1={pathArray[i][1]} x2={pathArray[i+1][0]} y2={pathArray[i+1][1]} stroke="#012D5A" strokeWidth={4} />);
            }
            return lines;
        }
    }

    const viewBox = "0 0 " + (props.width)  + " " + (props.height);

    return (
        <svg width={props.width * props.scale} height={props.height * props.scale} viewBox={viewBox}>
            <image xlinkHref={props.image} width={props.width} height={props.height}></image>
            {createPaths()}
            <circle cx={pathArray[0][0]} cy={pathArray[0][1]} r={8} fill="red"/>
            <circle cx={pathArray[pathArray.length-1][0]} cy={pathArray[pathArray.length-1][1]} r={8} fill="green"/>
        </svg>
    );
}

export default PathVisual;
