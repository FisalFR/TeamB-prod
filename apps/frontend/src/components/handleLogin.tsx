import auth0 from "../contexts/auth0-client";

export function HandleLogin() {
    console.log("firing");
    const redirectUri = `${window.location.origin}/map`;
    document.addEventListener('click',async () =>{
        await auth0.loginWithRedirect({
            authorizationParams:{
                redirect_uri: redirectUri,
            }
        });
        const user = await auth0.getUser();
        console.log(user);
    });

}
export default HandleLogin;
