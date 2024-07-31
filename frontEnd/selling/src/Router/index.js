import { RouterProvider } from "react-router-dom";

import { router } from "./router";

// import { useNavigate } from "react-router-dom";

// import { getCookie } from "auth/cookie";

const Router = () => {

    // const navigate = useNavigate();

    // const selectedProviderCookie = getCookie('selectedProvider');
    // // let selectedProvider = null;

    // if (selectedProviderCookie) {
    //     // selectedProvider = JSON.parse(selectedProviderCookie);
    // } else {
    //     navigate('/firstProvider');
    // }

    return (
        <RouterProvider router={router} />
    )
}

export default Router;