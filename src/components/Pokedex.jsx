import React, { useEffect, useState } from "react";
import { getPokemonList } from "../api/pokemon";
import "../styles/Pokedex.css";

const Pokedex = () => {
  const [allPokemon, setAllPokemon] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pokemonPerPage = 20;

  useEffect(() => {
    const loadAllPokemon = async () => {
      setLoading(true);
      try {
        // Cargar TODOS los Pokémon de una vez
        const data = await getPokemonList(10000, 0);
        setAllPokemon(data.pokemon);
      } catch (err) {
        setError("Error fetching Pokémon");
      } finally {
        setLoading(false);
      }
    };
    loadAllPokemon();
  }, []);

  const handleSelect = async (name) => {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = await res.json();
      setSelectedPokemon(data);
    } catch (err) {
      console.error("Error loading Pokémon details:", err);
    }
  };

  const closeModal = () => {
    setSelectedPokemon(null);
  };

  // Filtrar por búsqueda en TODOS los pokémon
  const filteredPokemon = search.trim() === ""
    ? allPokemon
    : allPokemon.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(search.toLowerCase().trim())
      );

  // Calcular paginación sobre los pokémon filtrados
  const totalPages = Math.ceil(filteredPokemon.length / pokemonPerPage);
  const startIndex = (currentPage - 1) * pokemonPerPage;
  const endIndex = startIndex + pokemonPerPage;
  const currentPokemon = filteredPokemon.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Resetear a página 1 cuando se busca
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  if (loading) {
    return (
      <div className="pokedex-container">
        <p className="loading-message">Cargando todos los Pokémon...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pokedex-container">
        <p className="error-message">{error}</p>
      </div>
    );
  }

  return (
    <div className="pokedex-container">
      <h1 className="pokedex-title">Pokedex</h1>
      
      <div className="search-container">
        <input
          className="search-input"
          type="text"
          placeholder="Buscar Pokémon..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <button 
            className="clear-button" 
            onClick={() => setSearch("")}
            aria-label="Limpiar búsqueda"
          >
            ✕
          </button>
        )}
      </div>

      {filteredPokemon.length === 0 ? (
        <p className="no-results">No se encontraron Pokémon con ese nombre</p>
      ) : (
        <>
          <p className="results-count">
            {search 
              ? `Encontrados: ${filteredPokemon.length} Pokémon` 
              : `Total: ${allPokemon.length} Pokémon`}
            {` - Mostrando página ${currentPage} de ${totalPages}`}
          </p>
          
          <div className="pokedex-grid">
            {currentPokemon.map((pokemon) => (
              <div
                key={pokemon.id}
                className="pokemon-card"
                onClick={() => handleSelect(pokemon.name)}
              >
                <div className="pokemon-card-header">
                  <span className="pokemon-id">#{pokemon.id.toString().padStart(3, '0')}</span>
                </div>
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                  alt={pokemon.name}
                  className="pokemon-image"
                />
                <p className="pokemon-name">{pokemon.name}</p>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button 
                className="pagination-button"
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
              >
                « Primera
              </button>
              <button 
                className="pagination-button"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                ‹ Anterior
              </button>
              <span className="pagination-info">
                Página {currentPage} de {totalPages}
              </span>
              <button 
                className="pagination-button"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Siguiente ›
              </button>
              <button 
                className="pagination-button"
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
              >
                Última »
              </button>
            </div>
          )}
        </>
      )}

      {selectedPokemon && (
        <div className="pokemon-modal" onClick={closeModal}>
          <div
            className="pokemon-details"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-button" onClick={closeModal}>
              ✕
            </button>
            
            <h2 className="pokemon-detail-name">
              {selectedPokemon.name.toUpperCase()}
            </h2>
            
            <img
              src={selectedPokemon.sprites.front_default}
              alt={selectedPokemon.name}
              className="pokemon-detail-image"
            />
            
            <div className="pokemon-info">
              <p><strong>ID:</strong> #{selectedPokemon.id}</p>
              <p><strong>Altura:</strong> {selectedPokemon.height / 10}m</p>
              <p><strong>Peso:</strong> {selectedPokemon.weight / 10}kg</p>
              <div className="pokemon-types">
                <strong>Tipos:</strong>
                <div className="types-list">
                  {selectedPokemon.types.map((t) => (
                    <span key={t.type.name} className={`type-badge ${t.type.name}`}>
                      {t.type.name}
                    </span>
                  ))}
                </div>
              </div>
              <div className="pokemon-stats">
                <strong>Estadísticas:</strong>
                {selectedPokemon.stats.map((stat) => (
                  <div key={stat.stat.name} className="stat-bar">
                    <span className="stat-name">{stat.stat.name}:</span>
                    <span className="stat-value">{stat.base_stat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pokedex;