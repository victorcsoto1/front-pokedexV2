import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "../../styles/PokemonList.css"
import { getPokemonAbility, getPokemonSpecies } from "../../services/pokeapiService"
import { getToken } from "../../utils/auth"

export default function PokemonInfo () {

    const [pokemonInfo, setPokemonInfo] = useState()
    const [genSelected, setGenSelected] = useState("i")

    const [pokemonSprites, setPokemonSprites] = useState([])
    const [pokemonAbilities, setPokemonAbilities] = useState([])
    const [pokemonDescriptions, setPokemonDescriptions] = useState([]);
    const [pokemonSpeciesDescription, setPokemonSpeciesDescription] = useState()

    const genList = ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii"]
    const genListAbilities = ["iii", "iv", "v", "vi", "vii", "viii"]

    const [availableGens, setAvailableGens] = useState([])

    let arrayDescriptions = []

    const navigate = useNavigate()

    const goBack = () => {
        localStorage.removeItem('pokemoninfo')
        navigate('/pokedex/pokemon-list')
    }

    const handleChangeGeneration = async (version) => {
        if (!pokemonInfo) return
        setGenSelected(version)
        let spritesGenerationSelected = new Map(Object.entries(pokemonInfo.sprites.versions["generation-" + version]))
        let arraySpritesVersion = []
        let arrayVersions = []
        
        spritesGenerationSelected.forEach((element, nombreVersion) => {
            if (nombreVersion.includes("-")) {
                nombreVersion.split("-").forEach((version) => {
                    if(version !== "ultra")
                        arrayVersions.push(version)
                })
            } else {
                if (version === "viii") {
                    arrayVersions.push("sword")
                    arrayVersions.push("shield")
                } else {
                    arrayVersions.push(nombreVersion)
                }
            }
            
            if (version !== "vii" || nombreVersion !== "icons") {
                arraySpritesVersion.push({
                    url: (version === "vi" || version === "vii" || version === "viii") 
                        ? pokemonInfo.sprites.other.showdown.front_default
                        : element.front_default,
                    version: nombreVersion
                                .split('-')
                                .filter(word => word.toLowerCase() !== "ultra")
                                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                .join(' & ')
                })
            
            }
        })
        setPokemonSprites(arraySpritesVersion.filter(v => v.version !== "Omegaruby & Alphasapphire"))

        //Descripcion pokemon por version de la generacion seleccionada
        arrayDescriptions = !pokemonSpeciesDescription ? arrayDescriptions.filter(x => arrayVersions.includes(x.version.name)) : pokemonSpeciesDescription.filter(x => arrayVersions.includes(x.version.name))

        let arrayObjectDescriptions = []
        if (arrayDescriptions.length === 0) {
            arrayObjectDescriptions.push({
                description: ""
            })
        } else {
            arrayDescriptions.forEach((d) => {
                arrayObjectDescriptions.push({
                    version: d.version.name,
                    description: d.flavor_text.replace(/(\f)/gm, " ")
                })
            })
        }
        setPokemonDescriptions(arrayObjectDescriptions)

        setPokemonAbilities([])
        if (genListAbilities.includes(version)) {
            let arrayPokemonAbilities = []
            for(let i = 0; i < pokemonInfo.abilities.length; i++) {
                let ability = pokemonInfo.abilities[i].ability
                let resp = await getPokemonAbility(ability.url, getToken())
                let abilityObject = {
                    name: ability.name,
                    effect: resp.effect_entries.find(effect => effect.language.name === 'en').short_effect
                }
                arrayPokemonAbilities.push(abilityObject)
            }
            setPokemonAbilities(arrayPokemonAbilities)
        }
    }

    useEffect(() => {
        if (!pokemonInfo) return
        getPokemonSpecies(pokemonInfo.species.url, getToken()).then((resp) => {
            arrayDescriptions = resp.flavor_text_entries.filter(x => x.language.name === "en")
            setPokemonSpeciesDescription(arrayDescriptions)
            let generationName = resp.generation.name
            let generation = generationName.slice(generationName.indexOf("-") + 1)
            setAvailableGens(genList.slice(genList.indexOf(generation)))
            handleChangeGeneration(generation)
        })
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
                            {
                                availableGens.map((gen, index) => {
                                    return (
                                        <li className="nav-item">
                                            <div className={`nav-link gen__tab ${genSelected === gen && 'active'}`} onClick={() => handleChangeGeneration(gen)}>Generation {gen.toUpperCase()}</div>
                                        </li>
                                    )
                                })
                            }
                            
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
                                            <p>{genSelected === "viii" ? "Sword & Shield" : sprite.version} version</p>
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
                            <div className="mt-3">
                                <p className="fw-bold">Description:</p>
                                <ul>
                                    { pokemonDescriptions.map((element) => {
                                        return (
                                            element.description !== "" ?
                                                <li><strong>{element.version.charAt(0).toUpperCase() + element.version.slice(1)} version: </strong>{element.description}</li>
                                            : "Not available description of this pokémon for this generation."
                                        )
                                    })}
                                </ul>
                            </div>
                            { genListAbilities.includes(genSelected) &&
                                <div className="">
                                    <p className="fw-bold">Abilities: </p>
                                    <ul>
                                        { pokemonAbilities.map((ability, index) => {
                                            return (
                                                <li><strong>{ability.name.charAt(0).toUpperCase() + ability.name.slice(1)}: </strong>{ability.effect}</li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            }
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