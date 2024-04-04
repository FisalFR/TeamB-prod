
function Table(props:{data: NonNullable<unknown>[]; headings: string[], keys: string[]}) {


    function createTableHeader(){
        return props.headings.map((heading) =>
            <th className="border-collapse p-2 border-solid border-t-[0px] border-[1px] border-deep-blue bg-deep-blue text-bone-white">
                {heading}
            </th>

        );}

    function createTableRows(){
        return props.data.map((request) =>
            <tr>
                {createRow(request)}
            </tr>

        );}
    function createRow(request){
        return props.keys.map((key) =>
            <td className="border-collapse p-2 border-solid border-[1px] border-t-[0px] border-deep-blue">
                {request[key]}
            </td>

        );}

    return(
        <table className="overflow-scroll border-collapse p-6 border-solid border-[1px] border-t-[0px] border-deep-blue w-full bg-white">
            <thead className="sticky top-0">
                {createTableHeader()}
            </thead>
            <tbody>
                {createTableRows()}
            </tbody>
        </table>
    );
}

export default Table;
