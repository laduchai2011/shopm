import FirstProvider from "screen/FirstProvider";

import Home from "screen/Home";
import Department from "screen/Department";

export const elements = [
    {
        path: '/firstProvider',
        element: <FirstProvider />
    },
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/department',
        element: <Department />
    }
]