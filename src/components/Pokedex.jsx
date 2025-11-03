import React, { useEffect, useState } from "react";
import "../styles/Pokedex.css";
import Pokemon3DScene from "./Pokemon3DScene";

// Componente para tarjeta individual con tipo y efecto flip
const PokemonCard = ({ pokemon, onClick }) => {
  const [type, setType] = useState(null);
  const [flipped, setFlipped] = useState(false);
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`);
        const data = await res.json();
        setType(data.types[0].type.name);
        setDetails(data);
      } catch (err) {
        console.error("Error loading details:", err);
      }
    };
    fetchDetails();
  }, [pokemon.id]);

  const handleClick = () => {
    setFlipped(!flipped);
  };

  if (!details) {
    return (
      <div className="pokemon-card loading">
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div className="pokemon-card-container" onClick={handleClick}>
      <div className={`pokemon-card-flip ${flipped ? 'flipped' : ''} ${type ? `type-${type}` : ''}`}>
        {/* Frente de la tarjeta */}
        <div className="pokemon-card-front">
          <div className="pokemon-card-header">
            <span className="pokemon-id">#{String(pokemon.id).padStart(3, "0")}</span>
          </div>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
            alt={pokemon.name}
            className="pokemon-image-large"
          />
          <div className="pokemon-card-content">
            <h3 className="pokemon-name-large">{pokemon.name}</h3>
            <div className="pokemon-types-inline">
              {details.types.map((t) => (
                <span key={t.type.name} className={`type-badge ${t.type.name}`}>
                  {t.type.name}
                </span>
              ))}
            </div>
            <div className="pokemon-quick-stats">
              <div className="quick-stat">
                <span className="stat-label">Altura</span>
                <span className="stat-value">{details.height / 10}m</span>
              </div>
              <div className="quick-stat">
                <span className="stat-label">Peso</span>
                <span className="stat-value">{details.weight / 10}kg</span>
              </div>
            </div>
            <p className="flip-hint">Click para voltear</p>
          </div>
        </div>

        {/* Reverso de la tarjeta */}
        <div className="pokemon-card-back">
          <div className="pokemon-card-header">
            <h3 className="pokemon-name-large">{pokemon.name}</h3>
            <span className="pokemon-id">#{String(pokemon.id).padStart(3, "0")}</span>
          </div>
          
          {flipped && (
            <div className="pokemon-3d-mini">
              <Pokemon3DScene pokemon={details} height="180px" />
            </div>
          )}

          <div className="pokemon-stats-detailed">
            <h4>Estadísticas Base</h4>
            {details.stats.map((stat) => {
              const statName = stat.stat.name.replace('special-', 'sp. ').replace('-', ' ');
              const percentage = (stat.base_stat / 255) * 100;
              
              return (
                <div key={stat.stat.name} className="stat-row">
                  <div className="stat-row-header">
                    <span className="stat-name">{statName}</span>
                    <span className="stat-value">{stat.base_stat}</span>
                  </div>
                  <div className="stat-bar-container">
                    <div className="stat-bar-fill" style={{ width: `${percentage}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="flip-hint">Click para volver</p>
        </div>
      </div>
    </div>
  );
};

const Pokedex = () => {
  const [allPokemon, setAllPokemon] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pokemonPerPage = 12;


  useEffect(() => {
    const loadPokemon = async () => {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1000");
        const data = await res.json();
        const pokemonWithIds = data.results.map((p) => {
          const id = p.url.split("/").filter(Boolean).pop();
          return { name: p.name, id, url: p.url };
        });
        setAllPokemon(pokemonWithIds);
      } catch (err) {
        console.error(err);
        setError("Error al cargar Pokémon");
      } finally {
        setLoading(false);
      }
    };
    loadPokemon();
  }, []);

  
  const filtered = search.trim()
    ? allPokemon.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase().trim())
      )
    : allPokemon;

  
  const totalPages = Math.ceil(filtered.length / pokemonPerPage);
  const start = (currentPage - 1) * pokemonPerPage;
  const current = filtered.slice(start, start + pokemonPerPage);

  useEffect(() => setCurrentPage(1), [search]);

  if (loading) return <div className="pokedex-container"><p>Cargando Pokémon...</p></div>;
  if (error) return <div className="pokedex-container"><p>{error}</p></div>;

  return (
    <div className="pokedex-container">
      <h1 className="pokedex-title">Pokédex</h1>

     
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Buscar Pokémon..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <button className="clear-button" onClick={() => setSearch("")}>
            ✕
          </button>
        )}
      </div>

      
      <div className="pokedex-grid">
        {current.map((p) => (
          <PokemonCard 
            key={p.id} 
            pokemon={p}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button 
            className="pagination-button" 
            onClick={() => setCurrentPage(1)} 
            disabled={currentPage === 1}
          >
            « Primera
          </button>
          <button
            className="pagination-button"
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            ‹ Anterior
          </button>
          <span className="pagination-info">Página {currentPage} de {totalPages}</span>
          <button
            className="pagination-button"
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Siguiente ›
          </button>
          <button 
            className="pagination-button"
            onClick={() => setCurrentPage(totalPages)} 
            disabled={currentPage === totalPages}
          >
            Última »
          </button>
        </div>
      )}
    </div>
  );
};

export default Pokedex;
