import React from "react";

import Home from "src/screen/Home";
import TableScreen from "src/screen/Table";
import Load from "src/screen/Load";
import Message from "src/screen/Message";
import IconScreen from "src/screen/IconScreen";

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