import FirstProvider from "screen/FirstProvider";

import Home from "screen/Home";
import Department from "screen/Department";
import DepartmentSetup from "screen/DepartmentSetup";
import DepartmentCreate from "screen/DepartmentCreate";
import DepartmentEdit from "screen/DepartmentEdit";
import DepartmentGroupCreate from "screen/DepartmentGroupCreate";
import DepartmentGroupSetup from "screen/DepartmentGroupSetup";

import Chest from "screen/Chest";

export const elements = [
    {
        path: '/firstProvider',
        element: <FirstProvider />
    },
    {
        path: '/',
        element: <Home />
    },

    // Department
    {
        path: '/department',
        element: <Department />
    },
    {
        path: '/department/setup',
        element: <DepartmentSetup />
    },
    {
        path: '/department/create',
        element: <DepartmentCreate />
    },
    {
        path: '/department/edit',
        element: <DepartmentEdit />
    },
    {
        path: '/departmentGroup/setup',
        element: <DepartmentGroupSetup />
    },
    {
        path: '/departmentGroup/create',
        element: <DepartmentGroupCreate />
    },

    // Chest
    {
        path: '/chest',
        element: <Chest />
    },
]