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
        total: total,
        next: data?.next,
        previous: data?.previous
    };
}

export async function getPokemonById(id){
    const response = await http.get(`/pokemon/${id}`);
    return response.data;
}

export function imageUrl(path, size){
    if(!path) return null;
    if(/^https?:\/\//i.test(path)) return path;
    //omitir el esquema
    if(/^\/\//.test(path)) return "https:" + path;

    //normalizarlo
    const cleanPath = path.startsWith("/") ? path : `/${path}`;

    //si no te pasan el size, lo calculamos
    const chosen = String(size ?? cdnSizeForImagePath(cleanPath).replace(/\/+$/g, ""));
    //nos asegura de que termine con una sola / cuando agregamos la url

    //armamos nuestra url

    return `https://pokeapi.co/api/v2/${chosen}${cleanPath}`;
}
