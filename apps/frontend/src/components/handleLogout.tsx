import {useAuth0} from "@auth0/auth0-react";

export function HandleLogout() {
    const { logout } = useAuth0();

    return () => {
        logout(
            {
                logoutParams: {
                    returnTo: `${window.location.origin}/`,

                },
            });
        console.log("logged out");
    };
}
export default HandleLogout;
