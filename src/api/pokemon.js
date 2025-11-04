import {http} from './http';

export async function getPokemonList(limit = 12, offset = 0){
    const response = await http.get(`/pokemon?limit=${limit}&offset=${offset}`);
    const data = response.data;
    const list = data?.results ?? [];
    const total = data?.count ?? 0;

    const pokemonId = list.map((pokemon) => {
        const id = pokemon.url.split('/').filter(Boolean).pop();
        return {
            ...pokemon,
            id: parseInt(id)
        }
    });

    return {
        pokemon: pokemonId,
        total: total
    };
}

export async function getPokemonById(id){
    const response = await http.get(`/pokemon/${id}`);
    return response.data;
}

