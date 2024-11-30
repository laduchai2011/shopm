import React from "react"

import Home from "screen/Home";
import TableScreen from "screen/Table";
import Load from "screen/Load";
import Message from "screen/Message";
import IconScreen from "screen/IconScreen";

export const elements = [
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/table',
        element: <TableScreen />
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