import { useNavigate } from "react-router-dom"
import { getPokemonInfo } from "../../services/pokeapiService"
import "../../styles/PokemonList.css"
import { getToken } from "../../utils/auth"

export default function PokemonCard ({number, name, icon, url, setLoading}) {

    const navigate = useNavigate()

    const goToPokemonInfo = () => {
        setLoading(true)
        getPokemonInfo(url, getToken()).then((resp) => {
            setLoading(false)
            localStorage.setItem('pokemoninfo', JSON.stringify(resp))
            navigate('/pokedex/pokemon-info')
        })
    }

    return (
        <div className="pokemon__card">
            <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                    <p className="pe-3">#{number}</p>
                    <img src={icon} />
                    <p>{name}</p>
                </div>
                <div>
                    <button className="button__info" onClick={goToPokemonInfo}>Información</button>
                </div>
            </div>
        </div>
    )
}