import { useEffect, useState } from "react"
import { getPokemonList } from "../../services/pokeapiService"
import { limitePokemon } from "../../environments/variables"
import PokemonCard from "./PokemonCard"

export default function PokemonList () {

    const [pokemonList, setPokemonList] = useState()
    const [nextPage, setNextPage] = useState()
    const [previousPage, setPreviousPage] = useState()

    useEffect(() => {
        getPokemonList(limitePokemon).then((resp) => {
            console.log(resp)
            setPokemonList(resp.results)
        })
    },[])

    return (
        <div className="container">
            <div className="pokelist__header pb-5 pt-5">
                <h1>Listado de pokémon</h1>
            </div>
            <div className="pokelist__body">
                <p>Escriba en el buscador el pokémon para ver su información completa:</p>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Escriba aquí el pokémon" aria-label="Recipient's username" aria-describedby="button-addon2" />
                    <button className="btn btn-outline-secondary" type="button" id="button-addon2">Buscar</button>
                </div>
                <div className="pt-5">
                    {pokemonList &&
                        pokemonList.map((pokemon, index) => {
                            pokemon.name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
                            return (
                                <PokemonCard name={pokemon.name} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}