import "../../styles/Header.css"
import pokeapiLogo from "../../assets/logo_pokeapi.webp"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../auth/AuthProvider";
import { IconLogout, IconUser, IconUserFilled } from "../../assets/icons";

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
                        <div className="home__header__menu__items dropdown">
                            <div className="profile__dropdown dropdown">
                                <span className="dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false"><IconUser color={"#A7A7A7"}/><span className="ms-3">Hola {usuario.decoded.nombre + " "}</span></span>
                                <ul className="dropdown-menu">
                                    <li className="dropdown-item" onClick={() => goToPage('/pokedex/edit-profile')}><IconUserFilled color={"#A7A7A7"} className="pe-1"/>Editar perfil</li>
                                    <li className="dropdown-item" onClick={logout}><IconLogout color={"#A7A7A7"} className="pe-1" />Cerrar sesión</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                }
            </div>
            
        </div>
    )
}