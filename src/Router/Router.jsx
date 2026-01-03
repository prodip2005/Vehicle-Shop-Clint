// src/router/router.jsx
import { createBrowserRouter } from "react-router";
import MainSection from "../Main/MainSection";
import Home from "../components/Home";
import Apps from "../Pages/Apps";
import GameDetails from "../components/GameDetails";
import Login from "../Pages/Login";
import Registration from "../Pages/Registration";
import PrivateRoute from "../provider/PrivateRoute";
import Loading from "../components/Loading";
import ErrorPage from "../Pages/ErrorPage";
import ProfilePage from "../Pages/ProfilePage";
import UpdateProfile from "../Pages/UpdateProfile";
import AddVahicles from "../Pages/AddVahicles";
import My_Vehicles from "../components/My_Vehicles";
import My_Bookings from "../components/My_Bookings"; // ⬅️ বুকিং লিস্ট দেখাবে
import UpdateVehicle from "../components/UpdateVehicle";
import Dashboard from "../Pages/Dashboard/Dashboard";

const router = createBrowserRouter([
    {
        path: "/",
        Component: MainSection,
        children: [
            {
                index: true,
                Component: Home,
                hydrateFallbackElement: <Loading />,
            },
            {
                path: "/apps",
                hydrateFallbackElement: <Loading />,
                Component: Apps,
            },
            {
                path: "details/:id",
                hydrateFallbackElement: <Loading />,
                element: (
                    <PrivateRoute>
                        <GameDetails />
                    </PrivateRoute>
                ),
            },

            {
                path: "/login",
                Component: Login,
            },
            {
                path: "/register",
                Component: Registration,
            },
            {
                path: "/profile",
                element: (
                    <PrivateRoute>
                        <ProfilePage />
                    </PrivateRoute>
                ),
            },
            {
                path: "/update",
                element: (
                    <PrivateRoute>
                        <UpdateProfile />
                    </PrivateRoute>
                ),
            },
         
           
            {
                path: "*",
                Component: ErrorPage,
            },
        ],

    },
    {
        path: 'dashboard',
        element: <PrivateRoute>
            <Dashboard></Dashboard>
        </PrivateRoute>,
        children: [
            {
                path: 'myVehicles',
                element:
                    <PrivateRoute>
                        <My_Vehicles></My_Vehicles>
                    </PrivateRoute>
            },
            {
                path: 'myBookings',
                element:
                    <PrivateRoute>
                        <My_Bookings></My_Bookings>
                    </PrivateRoute>
            },

            {
                path: "addVehicles",
                element: (
                    <PrivateRoute>
                        <AddVahicles></AddVahicles>
                    </PrivateRoute>
                )
            },
            {
                path: 'updateVehicle/:id',
                element:
                    <PrivateRoute>
                        <UpdateVehicle></UpdateVehicle>
                    </PrivateRoute>
            },
        ]
    }
]);
export default router;