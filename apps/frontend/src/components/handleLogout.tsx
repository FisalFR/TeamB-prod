//import {useAuth0} from "@auth0/auth0-react";
//import auth0 from "../contexts/auth0-client.ts";
import {useAuth0} from "@auth0/auth0-react";
//
function HandleLogout() {
    const {logout} = useAuth0();
    const homeRedirect = `${window.location.origin.concat("/")}`;
   return () => logout({ logoutParams : {returnTo: homeRedirect }});
}



export default HandleLogout;
