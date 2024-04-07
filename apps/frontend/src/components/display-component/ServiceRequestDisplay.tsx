import {SecurityRequestType} from "common/src/SecurityRequestType.ts";

export function ServiceRequestDisplay(props: {
  submittedRequest: SecurityRequestType;
}) {
  return (
      // justify-items-center w-full text-sm border-2 border-deep-blue rounded-2xl p-2 flex flex-col gap-5 rounded-2
      <tr className={"table-fixed"}>
        {/*  flex flex-col justify-items-center gap-2 px-10*/}
          <td> {props.submittedRequest.name} </td>
          <td> {props.submittedRequest.priority} </td>
          <td> {props.submittedRequest.location} </td>
          <td> {props.submittedRequest.securityNeeded} </td>
          <td> {props.submittedRequest.reason} </td>
          <td> {props.submittedRequest.status} </td>
      </tr>
  );
}
