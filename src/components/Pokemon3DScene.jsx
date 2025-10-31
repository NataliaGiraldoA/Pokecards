import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import "../styles/Pokedex.css"; 

const typeColor = {
  fire: "orange",
  water: "blue",
  grass: "green",
  electric: "yellow",
  ice: "lightblue",
  poison: "purple",
  normal: "gray",
  bug: "limegreen",
  flying: "skyblue",
  ground: "saddlebrown",
  fighting: "red",
  psychic: "magenta",
  rock: "brown",
  ghost: "indigo",
  dark: "black",
  steel: "silver",
  fairy: "pink",
  dragon: "darkblue",
  shadow: "darkgray",
};

const TypeShape = ({ type }) => {
  switch (type) {
    case "fire": return <coneGeometry args={[0.8, 1.5, 16]} />;
    case "water": return <sphereGeometry args={[1, 32, 32]} />;
    case "grass": return <planeGeometry args={[1.5, 1.5]} />;
    case "electric": return <tetrahedronGeometry args={[1]} />;
    case "ice": return <dodecahedronGeometry args={[1]} />;
    case "poison": return <cylinderGeometry args={[0.6, 0.6, 1.5, 16]} />;
    case "normal": return <icosahedronGeometry args={[1]} />;
    case "bug": return <torusGeometry args={[0.8, 0.25, 16, 100]} />;
    case "flying": return <ringGeometry args={[0.6, 1.2, 32]} />;
    case "ground": return <circleGeometry args={[1, 32]} />;
    case "fighting": return <octahedronGeometry args={[1]} />;
    case "psychic": return <cylinderGeometry args={[0.5, 0.9, 1.4, 32]} />;
    case "rock": return <tetrahedronGeometry args={[1.2]} />;
    case "ghost": return <torusKnotGeometry args={[0.7, 0.2, 100, 16]} />;
    case "dark": return <coneGeometry args={[0.8, 1.5, 8]} />;
    case "steel": return <cylinderGeometry args={[0.8, 0.8, 1.5, 32]} />;
    case "fairy": return <sphereGeometry args={[0.8, 16, 16]} />;
    case "dragon": return <dodecahedronGeometry args={[1.2]} />;
    case "shadow": return <icosahedronGeometry args={[1.1]} />;
    default: return <boxGeometry args={[1.2, 1.2, 1.2]} />;
  }
};

const RotatingShape = ({ type }) => {
  const ref = useRef();
  useFrame(() => (ref.current.rotation.y += 0.01));
  const color = typeColor[type] || "white";

  return (
    <group>
      <mesh ref={ref}>
        <TypeShape type={type} />
        <meshStandardMaterial color={color} />
      </mesh>
      <Text
        position={[0, -2, 0]}   // Mueve el texto hacia abajo
        fontSize={0.45}         
        color="white"
        fontWeight="bold"
      >
        {type.toUpperCase()}
      </Text>
    </group>
  );
};


const Pokemon3DScene = ({ pokemon }) => {
  if (!pokemon) return null;
  const type = pokemon.types?.[0]?.type?.name || "normal";

  return (
    <div className={`pokemon-3d-container ${type}`}>
      <Canvas style={{ height: "280px" }}> 
        <ambientLight intensity={0.8} />
        <directionalLight position={[3, 3, 3]} />
        <OrbitControls enableZoom={false} />
        <RotatingShape type={type} />
      </Canvas>
    </div>
  );
};

export default Pokemon3DScene;
