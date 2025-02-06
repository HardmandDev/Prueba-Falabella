import { createBrowserRouter } from "react-router-dom";

import ConstantsRoutes from "@/contants/ContantsRoutes";

import LayoutPublic from "@/layouts/LayoutPublic";
import LandingPage from "@/pages/web/LandingPage";

import LayoutPrivate from "@/layouts/LayoutPrivate";

import PrivateRoute from "@/components/PrivateRoute";


export const router = createBrowserRouter([
    {
        path: ConstantsRoutes.HOME,
        element: <LayoutPublic />,
        children: [
            {
                index: true,
                element: <LandingPage />
            }
        ]
    },
    {
        path: ConstantsRoutes.APP, // Todas las rutas bajo /app
        element: <LayoutPrivate />,
        children: [
            {
                path: '/',
                index: true,
                element: <PrivateRoute element={<Dashboard />} />
            },
            {
                path: ConstantsRoutes.MARKETPLACE,
                element: <PrivateRoute element={<MarketplacePage />} />
            },
            {
                path: ConstantsRoutes.PURCHASE_HISTORY,
                element: <PrivateRoute element={<PurchaseHistoryPage />} />
            },
            {
                path: ConstantsRoutes.SETTINGS,
                element: <PrivateRoute element={<SettingsPage />} />
            }
        ]
    }
]);
