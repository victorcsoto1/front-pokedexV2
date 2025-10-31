import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const HomeIn = lazy(() => import ('../components/in/HomeIn'))
const PokemonList = lazy(() => import('../components/in/PokemonList'))
const PokemonInfo = lazy(() => import('../components/in/PokemonInfo'))
const EditProfile = lazy(() => import('../components/in/EditProfile'))

export default function RouterIn () {
    return (
        <Routes>
            <Route path="/" element={<HomeIn />} />
            <Route path="/pokemon-list" element={<PokemonList />} />
            <Route path="/pokemon-info" element={<PokemonInfo />} />
            <Route path="/edit-profile" element={<EditProfile />} />
        </Routes>
    )
}