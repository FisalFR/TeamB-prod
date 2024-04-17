import auth0 from "../contexts/auth0-client.ts";


export function HandleLogin() {
    console.log("login");
    const redirectUri = `${window.location.origin}/map`;

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
