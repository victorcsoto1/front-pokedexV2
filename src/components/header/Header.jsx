import "../../styles/Header.css"
import pokeapiLogo from "../../assets/logo_pokeapi.webp"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../auth/AuthProvider";

export default function Header () {

    const {usuario, logout} = useAuth();

    const navigate = useNavigate();

    const goToPage = (page) => {
        navigate(page)
    }

    return (
        <div className="home__header">
            <div className="container d-flex justify-content-between align-items-center">
                <div className="home__header__logo" onClick={() => goToPage(usuario ? '/pokedex/pokemon-list' : '/')}>
                    <img src={pokeapiLogo} />
                </div>
                { usuario &&
                    <div className="home__header__menu">
                        <div className="home__header__menu__items">
                            <span onClick={logout}>Cerrar sesión</span>
                            <span onClick={() => goToPage('/pokedex/edit-profile')}>Ver perfil</span>
                        </div>
                    </div>
                }
            </div>
            
        </div>
    )
}