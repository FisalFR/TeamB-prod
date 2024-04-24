import Button from "../Button.tsx";


function ToggleNodes( props: {
    onClick?: () => void;
    isOn?: boolean;
}){
    return (
        <div className="absolute top-5 right-7 h-fit rounded-xl">
            <Button
                onClick={props.onClick ? props.onClick : () => {}}
                px="px-5"
                py="py-2"
            >
                {props.isOn ? 'Hide Nodes' : 'Show Nodes'}
            </Button>
        </div>
    );

}

export default ToggleNodes;
