import { Route, Routes } from "react-router-dom"
import { lazy } from "react"
import PokemonList from "../components/out/PokemonList"

const HomeOut = lazy(() => import('../components/out/HomeOut'))

export default function RouterOut () {
    return (
        <Routes>
            <Route path="/" element={<HomeOut />} />
            <Route path="/pokemon-list" element={<PokemonList />} />
        </Routes>
    )
}