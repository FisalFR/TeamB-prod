import auth0 from "../../contexts/auth0-client.ts";


export function HandleLogin(props:{path:string,auth:boolean,load:boolean}) {
    console.log("login");
   const redirectUri = `${window.location.origin.concat(props.path)}`;


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

export default HandleLogin;
