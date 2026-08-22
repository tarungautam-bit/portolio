import React from 'react'
import {
    createBrowserRouter,
    Navigate,
    Outlet,
    RouterProvider,
    useNavigate,
} from "react-router";
import { useSelector } from 'react-redux'
import Loading from '../../shared/components/Loading'
import VillageGate from '../../screens/entry/ui/VillageGate';
import Profile from '../../screens/profile/ui/Profile';
import Mission from '../../screens/missions/ui/Mission';
import MissionDetails from '../../screens/mission-details/ui/MissionDetails';
import Journey from '../../screens/journey/ui/Journey';
import Contact from '../../screens/contact/ui/Contact';
import PortfolioLayout from '../../shared/components/PortfolioLayout';
import Homepage from '../../screens/home/ui/HomePage';

const EntryGuard = ()=>{
    const {hasEntered,loading}=useSelector((state)=>state.entry)

    const navigate = useNavigate();
    if(loading||hasEntered===null){
        return <Loading/>
    }
     if (!hasEntered) {
        return <Navigate to="/entry" replace />;
    }

    return <Outlet/>
}

const router = createBrowserRouter([
    {
        path:"/entry",
        element:<VillageGate/>
    },
    {
        path:"/",
        element :<EntryGuard/>,
        children:[
            {
                path:"",
                element:<PortfolioLayout/>,
                children:[
                    {
                        index:true,
                        element:<Homepage/>
                    },
                    {
                        path:"about",
                        element:<Profile/>
                    },
                    {
                        path:"projects",
                        element:<Mission/>
                    },
                    {
                        path:"projects/:id",
                        element:<MissionDetails/>
                    },
                    {
                        path:"experience",
                        element:<Journey/>
    
                    },
                    {
                        path:"contact",
                        element:<Contact/>
                    }
                ]
            }
        ]
    },
    {
        path: "*",
        element: <Navigate to="/" replace />,
    },
])

const AppRoutes = () => {
    return (
        <RouterProvider router={router} />
    );
}

export default AppRoutes