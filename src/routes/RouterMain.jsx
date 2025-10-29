import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

const RouterOut = lazy(() => import('../routes/RouterOut'))
const RouterIn = lazy(() => import('../routes/RouterIn'))

export default function RouterMain () {
    return (
        <Routes>
            <Route path="/*" element={<RouterOut />} />
            <Route path="/pokedex/*" element={<ProtectedRoute><RouterIn /></ProtectedRoute>} />
        </Routes>
    )
}