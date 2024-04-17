import auth0 from "../contexts/auth0-client.ts";


export function HandleLogin(props:{path:string}) {
    console.log("login");
    const redirectUri = `${window.location.origin.concat(props.path)}`;

    if(redirectUri === `${window.location.origin.concat('/map')}` ){
        return window.location.href = `${window.location.origin.concat('/map')}`;

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
export default HandleLogin;
