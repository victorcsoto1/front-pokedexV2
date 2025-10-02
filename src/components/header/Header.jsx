import "../../styles/Header.css"
import pokeapiLogo from "../../assets/logo_pokeapi.webp"
import { useNavigate } from "react-router-dom"

export default function Header () {

    const navigate = useNavigate();

    const goToPage = (page) => {
        navigate(page)
    }

    return (
        <div className="home__header">
            <div className="container d-flex justify-content-between">
                <div className="home__header__logo" onClick={() => goToPage('/')}>
                    <img src={pokeapiLogo} />
                </div>
                <div className="home__header__menu" onClick={() => goToPage('/pokemon-list')}>
                    <div className="home__header__menu__items">
                        <p>Lista de Pokémon</p>
                    </div>
                </div>
            </div>
            
        </div>
    )
}