import Home from "screen/Home";
import Manager from "screen/Manager";
import Add from "screen/Add";
import Profile from "screen/Profile";

export const elements = [
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/manager',
        element: <Manager />
    },
    {
        path: '/add',
        element: <Add />
    },
    {
        path: '/profile',
        element: <Profile />
    }
]