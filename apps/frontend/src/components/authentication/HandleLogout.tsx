import {useAuth0} from "@auth0/auth0-react";
//
function HandleLogout() {
    const {logout} = useAuth0();
    const homeRedirect = `${window.location.origin.concat("/")}`;
   return () => logout({ logoutParams : {returnTo: homeRedirect }});
}



export default HandleLogout;
