import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text3D, Center } from "@react-three/drei";
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

const RotatingShape = ({ type, name }) => {
  const ref = useRef();
  useFrame(() => (ref.current.rotation.y += 0.01));
  const color = typeColor[type] || "white";

  return (
    <group position={[0, 0.5, 0]}>
      {/* Figura geométrica del tipo */}
      <mesh ref={ref} position={[0, 0, 0]} castShadow receiveShadow>
        <TypeShape type={type} />
        <meshStandardMaterial 
          color={color} 
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>
      
      {/* Nombre del Pokemon en texto 3D */}
      <Center position={[0, -2, 0]}>
        <Text3D
          font="/fonts/helvetiker_regular.typeface.json"
          size={0.35}
          height={0.15}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelSegments={5}
        >
          {name.toUpperCase()}
          <meshStandardMaterial 
            color="#ffffff"
            metalness={0.6}
            roughness={0.2}
          />
        </Text3D>
      </Center>
    </group>
  );
};


const Pokemon3DScene = ({ pokemon, height = "280px" }) => {
  if (!pokemon) return null;
  const type = pokemon.types?.[0]?.type?.name || "normal";
  const name = pokemon.name || "Pokemon";

  return (
    <div className={`pokemon-3d-container ${type}`}>
      <Canvas shadows style={{ height: height, width: "100%" }}> 
        <ambientLight intensity={0.4} />
        <directionalLight 
          position={[5, 8, 5]} 
          intensity={1.2}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <OrbitControls enableZoom={false} />
        <RotatingShape type={type} name={name} />
        {/* Plano para recibir la sombra */}
        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
          <planeGeometry args={[10, 10]} />
          <shadowMaterial opacity={0.4} />
        </mesh>
      </Canvas>
    </div>
  );
};

export default Pokemon3DScene;
