import Home from "screen/Home";
import Login from "screen/Login";
import Signup from "screen/Signup";
import Profile from "screen/Profile";

import Medication from "screen/Medication";
import MedicationAdd from "screen/MedicationAdd";
import ManageMedication from "screen/ManageMedication";
import MedicationOrder from "screen/MedicationOrder";

import DoctorPharmacist from "screen/DoctorPharmacist";
import Service from "screen/Service";
import ProductsFromProvider from "screen/ProductsFromProvider";
import ProviderNewsAdd from "screen/ProviderNewsAdd";

import ProviderList from "screen/ProviderList";
import Provider from "screen/Provider";
import ProviderSetting from "screen/ProviderSetting";
import RegisterProvider from "screen/ProviderSetting/RegisterProvider";
import RegisterProviderChange from "screen/ProviderSetting/RegisterProvider/components/RegisterProviderChange";
import RegisterProviderDelete from "screen/ProviderSetting/RegisterProvider/components/RegisterProviderDelete";
import ProviderAbout from "screen/ProviderSetting/ProviderAbout";

import Extend from "screen/Extend";

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
        path: '/signup',
        element: <Signup />
    },
    {
        path: '/profile/:id',
        element: <Profile />
    },

    // Provider
    {
        path: '/provider/list',
        element: <ProviderList />
    },
    {
        path: '/provider/:id',
        element: <Provider />
    },
    {
        path: '/provider/setting',
        element: <ProviderSetting />
    },
    {
        path: '/provider/setting/register',
        element: <RegisterProvider />
    },
    {
        path: '/provider/setting/register/change',
        element: <RegisterProviderChange />
    },
    {
        path: '/provider/setting/register/delete',
        element: <RegisterProviderDelete />
    },
    {
        path: '/provider/setting/about',
        element: <ProviderAbout />
    },
    {
        path: '/provider/:id/news/add',
        element: <ProviderNewsAdd />
    },

    // Medication
    {
        path: 'medication/:id',
        element: <Medication />
    },
    {
        path: '/provider/:id/addMedication',
        element: <MedicationAdd />
    },
    {
        path: '/provider/:id/manageMedication',
        element: <ManageMedication />
    },
    {
        path: '/provider/:id/medications',
        element: <ProductsFromProvider />
    },
    {
        path: '/medication/order/:id',
        element: <MedicationOrder />
    },
    
    ///////////////////////////////

    {
        path: '/doctorPharmacist/:id',
        element: <DoctorPharmacist />
    },
    {
        path: '/service/:id',
        element: <Service />
    },

    // extend
    {
        path: '/extend',
        element: <Extend />
    }
]