import {SideTab} from "./SideTab.tsx";

export function PathDirections(){
    return (
        <SideTab height={"h-[172px]"} yPos={"top-56"} arrow={false}
            tabChildren={
                <div>
                    <b style={{color: "white"}}>PD</b>
                </div>}
            bodyChildren={
                <div>
                    <h1 style={{color: "#012D5A"}}>PATH<br/>DIRECTIONS</h1>
                </div>
        }/>
    );
}
