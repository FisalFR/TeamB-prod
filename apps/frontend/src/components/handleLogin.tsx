import auth0 from "../contexts/auth0-client.ts";
//import {useAuth0} from "@auth0/auth0-react";

//import {useEffect} from "react";

export function HandleLogin(props:{path:string,auth:boolean,load:boolean}) {
    console.log("login");
   const redirectUri = `${window.location.origin.concat(props.path)}`;
   // console.log(redirectUri);





    if(props.auth && !props.load){
        console.log("here");
        return window.location.href = redirectUri;
    }
    const login = async () => {
        await auth0.loginWithRedirect({
            authorizationParams:{
                redirect_uri: redirectUri,
            },
        });
    };
    login().then();


}
// import { useEffect } from 'react';
// import { useAuth0 } from "@auth0/auth0-react";
//
// export default  function HandleLogin(props:{path:string}) {
//     const { isAuthenticated, loginWithRedirect } = useAuth0();
//     const redirectUri = `${window.location.origin.concat(props.path)}`;
//
//     useEffect(() => {
//         if(isAuthenticated){
//             window.location.href = redirectUri;
//         } else {
//             loginWithRedirect({
//                 authorizationParams: {
//                     redirect_uri: redirectUri,
//                 }
//             });
//         }
//     }, [isAuthenticated, loginWithRedirect, redirectUri]);
//
//     //return null;
// }
export default HandleLogin;
