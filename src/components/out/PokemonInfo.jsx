import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "../../styles/PokemonList.css"

export default function PokemonInfo () {

    const [pokemonInfo, setPokemonInfo] = useState()
    const [genSelected, setGenSelected] = useState("i")

    const [pokemonSprites, setPokemonSprites] = useState([])

    const navigate = useNavigate()

    const goBack = () => {
        localStorage.clear()
        navigate('/pokemon-list')
    }

    const handleChangeGeneration = (version) => {
        if (!pokemonInfo) return
        setGenSelected(version)
        let spritesGenerationSelected = new Map(Object.entries(pokemonInfo.sprites.versions["generation-" + version]))
        let arraySpritesVersion = []
        spritesGenerationSelected.forEach((element, nombreVersion) => {
            arraySpritesVersion.push({
                url: element.front_default,
                version: nombreVersion
            })
        })
        setPokemonSprites(arraySpritesVersion)
    }

    useEffect(() => {
        handleChangeGeneration("i")
    }, [pokemonInfo])

    useEffect(() => {
        setPokemonInfo(JSON.parse(localStorage.getItem('pokemoninfo')))
    }, [])

    return (
        <>
            {pokemonInfo &&
                <div className="container">
                    <div className="mt-5">
                        <ul className="nav__gen nav nav-tabs border-bottom-0">
                            <li className="nav-item">
                                <div className={`nav-link ${genSelected === "i" && 'active'}`} onClick={() => handleChangeGeneration("i")}>Generation I</div>
                            </li>
                            <li className="nav-item">
                                <div className={`nav-link ${genSelected === "ii" && 'active'}`} onClick={() => handleChangeGeneration("ii")}>Generation II</div>
                            </li>
                            <li className="nav-item">
                                <div className={`nav-link ${genSelected === "iii" && 'active'}`} onClick={() => handleChangeGeneration("iii")}>Generation III</div>
                            </li>
                            <li className="nav-item">
                                <div className={`nav-link ${genSelected === "iv" && 'active'}`} onClick={() => handleChangeGeneration("iv")}>Generation IV</div>
                            </li>
                            <li className="nav-item">
                                <div className={`nav-link ${genSelected === "v" && 'active'}`} onClick={() => handleChangeGeneration("v")}>Generation V</div>
                            </li>
                            <li className="nav-item">
                                <div className={`nav-link ${genSelected === "vi" && 'active'}`} onClick={() => handleChangeGeneration("vi")}>Generation VI</div>
                            </li>
                            <li className="nav-item">
                                <div className={`nav-link ${genSelected === "vii" && 'active'}`} onClick={() => handleChangeGeneration("vii")}>Generation VII</div>
                            </li>
                            <li className="nav-item">
                                <div className={`nav-link ${genSelected === "viii" && 'active'}`} onClick={() => handleChangeGeneration("viii")}>Generation VIII</div>
                            </li>
                        </ul>
                    </div>
                    <div className="pokemon__card__info">
                        <h2>{pokemonInfo.name.charAt(0).toUpperCase() + pokemonInfo.name.slice(1)}</h2>
                        <div className="">
                            <div className="d-flex justify-content-center gap-4">
                                { pokemonSprites.map((sprite, index) => {
                                    return (
                                        <div key={index} className="sprite-pokemon text-center">
                                            <img src={sprite.url}/>
                                            <p>{sprite.version} version</p>
                                        </div>
                                    )
                                })}
                            </div>
                            
                            <div className="d-flex justify-content-center mt-3">
                                <p style={{ margin: '3px 0px' }}>Types: </p>
                                {
                                    pokemonInfo.types.map((element, index) => {
                                        return (
                                            <div key={index} className={`pokemon-type-box ${element.type.name} mx-2`}>
                                                {element.type.name.charAt(0).toUpperCase() + element.type.name.slice(1)}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div>
                                <p>Abilities: </p>
                            </div>
                        </div>
                    </div>
                    <div className="div__botones mt-5">
                        <button className="button__volver" onClick={goBack}>Volver</button>
                    </div>
                </div>
            }
        </>
    )
}