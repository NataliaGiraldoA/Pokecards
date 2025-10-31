import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";

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
    case "fire": return <coneGeometry args={[0.5, 1, 16]} />;
    case "water": return <sphereGeometry args={[0.6, 32, 32]} />;
    case "grass": return <planeGeometry args={[1, 1]} />;
    case "electric": return <tetrahedronGeometry args={[0.6]} />;
    case "ice": return <dodecahedronGeometry args={[0.6]} />;
    case "poison": return <cylinderGeometry args={[0.4, 0.4, 1, 16]} />;
    case "normal": return <icosahedronGeometry args={[0.6]} />;
    case "bug": return <torusGeometry args={[0.4, 0.15, 16, 100]} />;
    case "flying": return <ringGeometry args={[0.3, 0.6, 32]} />;
    case "ground": return <circleGeometry args={[0.6, 32]} />;
    case "fighting": return <octahedronGeometry args={[0.6]} />;
    case "psychic": return <cylinderGeometry args={[0.3, 0.6, 1, 32]} />;
    case "rock": return <tetrahedronGeometry args={[0.7]} />;
    case "ghost": return <torusKnotGeometry args={[0.4, 0.1, 100, 16]} />;
    case "dark": return <coneGeometry args={[0.5, 1, 8]} />;
    case "steel": return <cylinderGeometry args={[0.5, 0.5, 1, 32]} />;
    case "fairy": return <sphereGeometry args={[0.5, 16, 16]} />;
    case "dragon": return <dodecahedronGeometry args={[0.8]} />;
    case "shadow": return <icosahedronGeometry args={[0.7]} />;
    default: return <boxGeometry args={[1, 1, 1]} />;
  }
};

const RotatingShape = ({ type, name }) => {
  const ref = useRef();
  useFrame(() => (ref.current.rotation.y += 0.01));
  const color = typeColor[type] || "white";

  return (
    <group>
      <mesh ref={ref}>
        <TypeShape type={type} />
        <meshStandardMaterial color={color} />
      </mesh>
      <Text position={[0, -1.5, 0]} fontSize={0.3} color="white">
        {name}
      </Text>
    </group>
  );
};

const Pokemon3DScene = ({ pokemon }) => {
  if (!pokemon) return null;
  const type = pokemon.types[0].type.name;

  return (
    <Canvas style={{ height: "250px" }}>
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} />
      <RotatingShape type={type} name={pokemon.name} />
      <OrbitControls />
    </Canvas>
  );
};

export default Pokemon3DScene;
