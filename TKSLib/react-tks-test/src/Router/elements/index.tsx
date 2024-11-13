import React from "react"

import Home from "screen/Home";
import Load from "screen/Load";
import Message from "screen/Message";
import IconScreen from "screen/IconScreen";

export const elements = [
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/load',
        element: <Load />
    },
    {
        path: '/message',
        element: <Message />
    },
    {
        path: '/iconScreen',
        element: <IconScreen />
    }
]