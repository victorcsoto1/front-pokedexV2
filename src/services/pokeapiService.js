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