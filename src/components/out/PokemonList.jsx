import { useEffect, useState } from "react"
import { getFilteredPokemon, getPokemonList } from "../../services/pokeapiService"
import { limitePokemon } from "../../environments/variables"
import PokemonCard from "./PokemonCard"
import LoaderScreen from "../loaders/LoaderScreen"

export default function PokemonList () {

    const [pokemonList, setPokemonList] = useState()
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [currentItems, setCurrentItems] = useState([])
    const [textPokemon, setTextPokemon] = useState('')
    const [loading, setLoading] = useState(true)

    const itemsPerPage = 50

    const goToPage = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber)
            let startIndex = (pageNumber - 1) * itemsPerPage;
            let endIndex = startIndex + itemsPerPage;
            setCurrentItems(pokemonList.slice(startIndex, endIndex))
        }
    }

    const searchPokemon = () => {
        setLoading(true)
        getFilteredPokemon(limitePokemon, textPokemon).then((resp) => {
            setPokemonList(resp)
            setLoading(false)
        })
    }

    const handleChangeInput = (e) => {
        setTextPokemon(e.target.value)
    }

    useEffect(() => {
        getPokemonList(limitePokemon).then((resp) => {
            setPokemonList(resp)
            setLoading(false)
        })
    },[])

    useEffect(() => {
        if (!pokemonList) return

        let startIndex = (currentPage - 1) * itemsPerPage;
        let endIndex = startIndex + itemsPerPage;
        setCurrentItems(pokemonList.slice(startIndex, endIndex))
        setTotalPages(Math.ceil(pokemonList.length / itemsPerPage))
    }, [pokemonList])

    return (
        <>
            {
                loading && <LoaderScreen />
            }
            <div className="container">
                <div className="pokelist__header pb-5 pt-5">
                    <h1>Listado de pokémon</h1>
                </div>
                <div className="pokelist__body">
                    <p>Escriba en el buscador el pokémon para ver su información completa:</p>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Escriba aquí el pokémon" aria-label="Recipient's username" aria-describedby="button-addon2" onChange={handleChangeInput} />
                        <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={searchPokemon}>Buscar</button>
                    </div>
                    <div className="pt-5">
                        {currentItems &&
                            currentItems.map((pokemon, index) => {
                                pokemon.name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
                                return (
                                    <PokemonCard key={index} number={pokemon.id} name={pokemon.name} icon={pokemon.icon} url={pokemon.url} setLoading={setLoading} />
                                )
                            })
                        }
                    </div>
                    { totalPages !== 0 &&
                        <nav aria-label="Page navigation example">
                            <ul className="pagination justify-content-center">
                                <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
                                    <div 
                                        className="page-link"
                                        style={{cursor: 'pointer'}}
                                        onClick={() => goToPage(currentPage - 1)}
                                    >
                                        Atrás
                                    </div>
                                </li>
                                {[...Array(totalPages)].map((element, i) => {
                                    return (
                                        <li key={i} className="page-item">
                                            <div className={`page-link ${i + 1 === currentPage && 'active'}`} style={{cursor: 'pointer'}} onClick={() => goToPage(i + 1)}>{i + 1}</div>
                                        </li>
                                    )
                                })}
                                <li className={`page-item ${currentPage === totalPages && 'disabled'}`}>
                                    <div
                                        className="page-link"
                                        style={{cursor: 'pointer'}}
                                        onClick={() => goToPage(currentPage + 1)}
                                    >
                                        Siguiente
                                    </div>
                                </li>
                            </ul>
                        </nav>
                    }
                </div>
            </div>
        </>
    )
}