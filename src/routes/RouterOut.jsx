import { Route, Routes } from "react-router-dom"
import { lazy } from "react"

const HomeOut = lazy(() => import('../components/out/HomeOut'))
const PokemonList = lazy(() => import('../components/out/PokemonList'))
const PokemonInfo = lazy(() => import('../components/out/PokemonInfo'))

export default function RouterOut () {
    return (
        <Routes>
            <Route path="/" element={<HomeOut />} />
            <Route path="/pokemon-list" element={<PokemonList />} />
            <Route path="/pokemon-info" element={<PokemonInfo />} />
        </Routes>
    )
}