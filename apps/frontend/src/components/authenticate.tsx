import {ComponentType} from "react";
import {withAuthenticationRequired} from "@auth0/auth0-react";


interface authenticateProps {
    component:ComponentType<unknown>;

}
export const Authenticate = ({component:Component}:authenticateProps) => {
    const Wrapper = withAuthenticationRequired(Component);
    return <Wrapper/>;};
