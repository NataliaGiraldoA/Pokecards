import React from "react";

const PokemonDetails = ({ pokemon }) => {
  if (!pokemon) return <p>Selecciona un Pokemon para ver sus detalles.</p>;

  return (
    <div className="pokemon-details">
      <h2>{pokemon.name}</h2>
      <p>ID: {pokemon.id}</p>
      <div className="types">
        {pokemon.types.map((t) => (
          <span key={t.type.name}>{t.type.name}</span>
        ))}
      </div>
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className="pokemon-sprite"
      />
    </div>
  );
};

export default PokemonDetails;
 