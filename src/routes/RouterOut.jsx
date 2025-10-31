import { Route, Routes } from "react-router-dom"
import { lazy } from "react"

const HomeOut = lazy(() => import('../components/out/HomeOut'))
const AuthLogin = lazy(() => import('../components/auth/AuthLogin'))
const AuthRegister = lazy(() => import('../components/auth/AuthRegister'))
const AuthPasswordRecover = lazy(() => import('../components/auth/AuthPasswordRecover'))

export default function RouterOut () {
    return (
        <Routes>
            <Route path="/" element={<HomeOut />} />
            <Route path="/login"  element={<AuthLogin />} />
            <Route path="/register" element={<AuthRegister />}/>
            <Route path="/recover" element={<AuthPasswordRecover />} />
        </Routes>
    )
}