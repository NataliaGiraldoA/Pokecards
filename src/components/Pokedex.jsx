import React, { useEffect, useState } from "react";
import "../styles/Pokedex.css";
import Pokemon3DScene from "./Pokemon3DScene";

const Pokedex = () => {
  const [allPokemon, setAllPokemon] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pokemonPerPage = 20;


  useEffect(() => {
    const loadPokemon = async () => {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1000");
        const data = await res.json();
        const pokemonWithIds = data.results.map((p) => {
          const id = p.url.split("/").filter(Boolean).pop();
          return { name: p.name, id };
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

  
  const handleSelect = async (name) => {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = await res.json();
      setSelectedPokemon(data);
    } catch (err) {
      console.error("Error cargando detalles:", err);
    }
  };

  const closeModal = () => setSelectedPokemon(null);


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
          <div key={p.id} className="pokemon-card" onClick={() => handleSelect(p.name)}>
            <div className="pokemon-card-header">
              <span className="pokemon-id">#{String(p.id).padStart(3, "0")}</span>
            </div>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`}
              alt={p.name}
              className="pokemon-image"
            />
            <p className="pokemon-name">{p.name}</p>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
            « Primera
          </button>
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            ‹ Anterior
          </button>
          <span>Página {currentPage} de {totalPages}</span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Siguiente ›
          </button>
          <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>
            Última »
          </button>
        </div>
      )}

      
      {selectedPokemon && (
        <div className="pokemon-modal" onClick={closeModal}>
          <div className="pokemon-details" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>✕</button>
            <h2>{selectedPokemon.name.toUpperCase()}</h2>

            <img
              src={selectedPokemon.sprites.front_default}
              alt={selectedPokemon.name}
              className="pokemon-detail-image"
            />

            <div className="pokemon-3d-container">
              <Pokemon3DScene pokemon={selectedPokemon} />
            </div>

            <div className="pokemon-info">
              <p><strong>ID:</strong> #{selectedPokemon.id}</p>
              <p><strong>Altura:</strong> {selectedPokemon.height / 10} m</p>
              <p><strong>Peso:</strong> {selectedPokemon.weight / 10} kg</p>
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
                {selectedPokemon.stats.map((s) => (
                  <div key={s.stat.name} className="stat-bar">
                    <span className="stat-name">{s.stat.name}:</span>
                    <span className="stat-value">{s.base_stat}</span>
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
