import {useRef, useState} from 'react';
import {giftInfo} from "../common/giftInfo.ts";
import Table from "../components/Table.tsx";
import Button from "../components/Button.tsx";
import ShopCard from "../components/shopCard.tsx";

function GiftDelivery() {

    const cost = {"Flowers": 10.99,
        "Balloons": 15.99,
        "Candy": 3.00,
        "Plushie": 8.00};

    const nameRef = useRef<HTMLInputElement>(null);
    const priorityRef = useRef<HTMLSelectElement>(null);
    const locationRef = useRef<HTMLInputElement>(null);
    const giftTypeRef = useRef<HTMLSelectElement>(null);
    const quantityRef = useRef<HTMLInputElement>(null);
    const statusRef = useRef<HTMLSelectElement>(null);
    const anonRef = useRef<HTMLInputElement>(null);

    const [requestList, setRequestList] = useState<giftInfo[]>([]);
    function handleSubmit(){
        const typeString = (giftTypeRef.current as HTMLSelectElement).value;
        const newRequest =
            {name: (nameRef.current as HTMLInputElement).value,
                priority: (priorityRef.current as HTMLSelectElement).value,
                location: (locationRef.current as HTMLInputElement).value,
                giftType: (giftTypeRef.current as HTMLSelectElement).value,
                quantity: parseInt((quantityRef.current as HTMLInputElement).value),
                status: (statusRef.current as HTMLSelectElement).value,
                isAnon: (anonRef.current as HTMLInputElement).checked,
                cost: cost[typeString as keyof typeof cost] * parseInt((quantityRef.current as HTMLInputElement).value) };
        //console.log(newRequest);
        setRequestList(requestList => [...requestList,newRequest]);
        //alert(request.isAnon);

        (nameRef.current as HTMLInputElement).value = "";
        (priorityRef.current as HTMLSelectElement).value = "";
        (locationRef.current as HTMLInputElement).value = "";
        (giftTypeRef.current as HTMLSelectElement).value = "";
        (quantityRef.current as HTMLInputElement).value = "";
        (statusRef.current as HTMLSelectElement).value = "";
        (anonRef.current as HTMLInputElement).checked = false;

    }


    return (
        <>
            <h1 className="text-3xl font-HeadlandOne">
                Gift Delivery Request Form
            </h1>
            <form onSubmit={e => {
                e.preventDefault();
            }}>
                <label htmlFor="name">Name: </label>
                <input type="text" id="name" name="name" ref={nameRef}></input> <br/> <br/>

                <label htmlFor="priority"> Request Priority: </label>
                <select name="priority" id="priority" ref={priorityRef}>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Emergency">Emergency</option>
                </select> <br/> <br/>

                <label htmlFor="location">Location: </label>
                <input type="text" id="location" name="location" ref={locationRef}></input> <br/> <br/>

                <label htmlFor="giftType"> Type of Gift: </label>
                <select name="giftType" id="giftType" ref={giftTypeRef}>
                    <option value="Flowers">Flowers-$10.99</option>
                    <option value="Balloons">Balloons-$15.99</option>
                    <option value="Candy">Candy-$3.00</option>
                    <option value=" Stuffed Animal ">Stuffed Animal-$8.00</option>
                </select> <br/> <br/>

                <label htmlFor="quantity">Quantity: </label>
                <input type="number" id="quantity" name="quantity" min="1" max="10" ref={quantityRef}></input> <br/>
                <br/>

                <label htmlFor="status"> Status of Request: </label>
                <select name="status" id="status" ref={statusRef}>
                    <option value="Unassigned">Unassigned</option>
                    <option value="Assigned">Assigned</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Closed">Closed</option>
                </select> <br/> <br/>

                <label htmlFor="isAnon">Is this delivery anonymous? </label>
                <input type="checkbox" id="isAnon" name="isAnon" ref={anonRef}></input><br/> <br/>

                <Button onClick={handleSubmit} children={"Submit"}/>
                <br/><br/>
                <ShopCard image="ahhhh" cost={26.99} name="Really cool singular flower"/>
                <br/><br/>
                <Table data={requestList}
                       headings={[" Name ", " Priority ", " Location ", " Gift Type ", " Quantity ", " Status ", " isAnon ", " Cost "]}
                       keys={["name", "priority", "location", "giftType", "quantity", "status", "isAnon", "cost"]}/>

            </form>

        </>
    );
}

export default GiftDelivery;
