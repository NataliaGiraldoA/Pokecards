import React, { useEffect, useState } from "react";
import "../styles/Pokedex.css";
import Pokemon3DScene from "./Pokemon3DScene";
import { getPokemonList, getPokemonById } from "../api/pokemon";

const PokemonCard = ({ pokemon, onClick }) => {
  const [type, setType] = useState(null);
  const [flipped, setFlipped] = useState(false);
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await getPokemonById(pokemon.id);
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
        {/* Frente de la tarjeta*/}
        <div className="pokemon-card-front card-style">
          {/* Header con HP */}
          <div className="card-header">
            <div className="card-name-section">
              <h2 className="card-pokemon-name">{details.name}</h2>
              <div className="card-types">
                {details.types.map((t) => (
                  <span key={t.type.name} className={`type-badge-card ${t.type.name}`}>
                    {t.type.name}
                  </span>
                ))}
              </div>
            </div>
            <div className="card-hp">
              <span className="hp-label">HP</span>
              <span className="hp-value">{details.stats.find((s) => s.stat.name === "hp")?.base_stat}</span>
            </div>
          </div>

          {/* Imagen del Pokémon */}
          <div className="card-image-container">
            <div className="holographic-overlay"></div>
            <div className="decorative-circles">
              <span className="circle"></span>
              <span className="circle"></span>
              <span className="circle"></span>
            </div>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
              alt={details.name}
              className="card-pokemon-image"
            />
          </div>

          {/* Stats principales */}
          <div className="card-stats-section">
            <h3 className="stats-title">ESTADÍSTICAS</h3>
            <div className="main-stats-grid">
              {details.stats.slice(1, 4).map((stat) => {
                const statName = stat.stat.name
                  .replace("attack", "ATK")
                  .replace("defense", "DEF")
                  .replace("special-attack", "SP.ATK");
                return (
                  <div key={stat.stat.name} className="stat-item">
                    <span className="stat-label">{statName}</span>
                    <span className="stat-value">{stat.base_stat}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Otra info */}
          <div className="card-info-grid">
            <div className="info-item">
              <span className="info-label">Altura</span>
              <span className="info-value">{details.height / 10}m</span>
            </div>
            <div className="info-item">
              <span className="info-label">Peso</span>
              <span className="info-value">{details.weight / 10}kg</span>
            </div>
            <div className="info-item">
              <span className="info-label">N.º</span>
              <span className="info-value">#{pokemon.id.toString().padStart(3, "0")}</span>
            </div>
          </div>

          {/* Footer de la tarjeta */}
          <div className="card-footer">
            <span className="footer-text">Pokedex</span>
            <div className="status-lights">
              <span className="light red"></span>
              <span className="light yellow"></span>
              <span className="light green"></span>
            </div>
          </div>

          <p className="flip-hint">Click para voltear</p>
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
            <h4>Estadisticas</h4>
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

          {/* Habilidades */}
          <div className="abilities-section">
            <h4>Habilidades</h4>
            <div className="abilities-list">
              {details.abilities.map((ability) => (
                <div key={ability.ability.name} className="ability-badge">
                  {ability.ability.name.replace("-", " ")}
                </div>
              ))}
            </div>
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
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    const loadPokemon = async () => {
      try {
        const data = await getPokemonList(151, 0);
        setAllPokemon(data.pokemon);
        // Seleccionar el primero
        if (data.pokemon.length > 0) {
          setSelectedPokemon(data.pokemon[0]);
        }
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

  if (loading) return <div className="pokedex-loading"><p>Cargando Pokémon...</p></div>;
  if (error) return <div className="pokedex-loading"><p>{error}</p></div>;

  return (
    <div className="pokedex-layout">
      {/* Sidebar con lista de Pokemon */}
      <aside className="pokemon-sidebar">
        <div className="sidebar-header">
          <h1 className="sidebar-title">Pokédex</h1>
          <p className="sidebar-subtitle">Selecciona un Pokémon</p>
        </div>

        {/* Búsqueda */}
        <div className="sidebar-search">
          <input
            type="text"
            className="search-input-sidebar"
            placeholder="Buscar Pokemon..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button className="clear-button-sidebar" onClick={() => setSearch("")}>
              ✕
            </button>
          )}
        </div>

        {/* Lista de Pokemon */}
        <div className="pokemon-list-sidebar">
          {filtered.map((p) => (
            <button
              key={p.id}
              className={`pokemon-list-item ${selectedPokemon?.id === p.id ? 'active' : ''}`}
              onClick={() => setSelectedPokemon(p)}
            >
              <span className="list-item-number">#{String(p.id).padStart(4, "0")}</span>
              <span className="list-item-name">{p.name}</span>
            </button>
          ))}
        </div>
      </aside>

      <main className="pokemon-display-area">
        {selectedPokemon ? (
          <PokemonCard pokemon={selectedPokemon} key={selectedPokemon.id} />
        ) : (
          <div className="no-selection">
            <p>Selecciona un Pokemon de la lista</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Pokedex;
