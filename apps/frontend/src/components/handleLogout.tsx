import auth0 from "../contexts/auth0-client.ts";


export function HandleLogout() {

    const redirectUri = `${window.location.origin}/`;
    document.addEventListener('click',async () =>{
        await auth0.logout({
           logoutParams:{
               returnTo:redirectUri,
           }
        });
        console.log("logged out");
    });


}
export default HandleLogout;
