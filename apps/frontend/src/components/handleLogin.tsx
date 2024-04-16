import auth0 from "../contexts/auth0-client.ts";


export function HandleLogin(props:{path:string}) {
    console.log("login");
    const redirectUri = `${window.location.origin.concat(props.path)}`;
    return async () => {

        await auth0.loginWithRedirect({
            authorizationParams:{
                redirect_uri: redirectUri,
            }



        });
        console.log("logged in");

    };
}
export default HandleLogin;
