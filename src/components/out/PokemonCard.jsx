import "../../styles/PokemonList.css"

export default function PokemonCard ({name}) {
    return (
        <div className="pokemon__card">
            <p>{name}</p>
        </div>
    )
}