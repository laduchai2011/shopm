import Home from "../../screen/Home";
import Login from "../../screen/Login";

import Log from "screen/Log";

import ChestManager from "screen/ChestManager";
import ChestGroupCreate from "screen/ChestGroupCreate";
import ChestGroupCustom from "screen/ChesrGroupCustom";

export const elements = [
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/log',
        element: <Log />
    },
    {
        path: '/chestManager',
        element: <ChestManager />
    },
    {
        path: '/chestGroupCreate',
        element: <ChestGroupCreate />
    },
    {
        path: '/chestGroupCustom',
        element: <ChestGroupCustom />
    }
]