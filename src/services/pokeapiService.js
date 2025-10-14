import { URL_BACKEND } from "../environments/variables"

export const getPokemonList = async (limit) => {
    try {
        const response = await fetch(`${URL_BACKEND}/getPokemonList?limit=${limit}`, {
            method: 'GET'
        })
        const json = response.json()
        return json
    } catch (err) {
        throw err
    }
}

export const getFilteredPokemon = async (limit, text) => {
    try {
        const response = await fetch(`${URL_BACKEND}/searchPokemon?limit=${limit}&searchText=${text}`, {
            method: 'GET'
        })
        const json = response.json()
        return json
    } catch (err) {
        throw err
    }
}

export const getPokemonInfo = async (url) => {
    try {
        const response = await fetch(`${URL_BACKEND}/getPokemonInfo?urlPokemon=${url}`, {
            method: 'GET'
        })
        const json = response.json()
        return json
    } catch (err) {
        throw err
    }
}