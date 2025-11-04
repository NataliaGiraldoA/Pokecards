# Pokédex Interactiva con Representación 3D de Tipos

El proyecto consiste en una **Pokédex interactiva** desarrollada con **React**, que obtiene información de la **PokéAPI** y representa a cada Pokémon con un diseño visual distintivo basado en su tipo.  
Además de mostrar los datos de cada Pokemon (nombre, ID, tipos e imagen), la aplicación asocia cada tipo con **colores y figuras geométricas 3D** que refuerzan visualmente sus características.

---

## 👥 Integrantes del grupo

- **Natalia Giraldo Amador-300001** –  
- **Valerie Sofia Olave Pineda-30000117256** –  
- **Bylen Yesid Naspiran Realpe-300001** –  
---

## 🧩 Descripción corta del proyecto

La aplicación muestra una lista de Pokémon organizados en tarjetas individuales.  
Cada tarjeta presenta la información esencial del Pokémon, junto con una figura tridimensional que cambia según su tipo elemental (fuego, agua, planta, etc.) en su reverso, además de estadísticas de combate.

---

## 🌐 Conexión con la API

La aplicación se conecta a la **PokéAPI (https://pokeapi.co)** para obtener los datos en tiempo real.  
La lógica de conexión se implementó en el archivo `pokemon.js`, donde se realizan peticiones HTTP para traer los Pokémon de forma paginada y obtener detalles individuales mediante su ID.

El flujo básico es el siguiente:
- `getPokemonList()` obtiene un conjunto de Pokémon con su nombre, ID y enlace a los detalles.
- `getPokemonById(id)` utiliza el ID para obtener la información completa de cada Pokémon, incluyendo su sprite, tipos y estadísticas.

Esto permite que la aplicación muestre contenido actualizado y preciso directamente desde la API oficial.

---

## 🎨 Representación de los tipos: colores y figuras

Se creó un sistema de **colores y figuras 3D asociadas**.  
Cada tipo tiene un **color característico** que simboliza su elemento y una **figura geométrica** que representa visualmente su esencia.

- **Fuego:** se representa con un color **naranja intenso** y la figura de un **cono**, que simboliza la forma de una llama. 
- **Agua:** usa el color **azul** y la figura de una **esfera**, asociada a la forma de una gota.  
- **Planta:** se representa con el color **verde** y un **plano cuadrado**, que representa la tierra y a la superficie donde crecen las plantas.  
- **Eléctrico:** se muestra en **amarillo brillante** con un **tetraedro**, de formas angulosas que simbolizan energía y descargas.  
- **Hielo:** utiliza **celeste claro** con un **dodecaedro**, reflejando la estructura de los cristales de hielo.  
- **Veneno:** un tono **púrpura** y un **cilindro**, que representa la idea de un tubo o recipiente químico.  
- **Normal:** es de color **gris neutro** con una figura de **icosaedro**, representando simplicidad.  
- **Bicho:** combina el color **verde lima** con un **toroide (aro)**, que simboliza el desplazamiento de insectos.  
- **Volador:** usa **azul cielo** con un **anillo**, representando la capacidad aérea.  
- **Tierra:** se representa con un **marrón oscuro** y un **círculo plano**, haciendo referencia al suelo.  
- **Lucha:** se identifica con **rojo** y un **octaedro**, que transmite fuerza y energía.  
- **Psíquico:** utiliza **magenta** con un **cilindro**, que sugiere enfoque y profundidad mental.  
- **Roca:** emplea **marrón** y una **pirámide (tetraedro)**, que simboliza dureza.  
- **Fantasma:** tiene color **índigo oscuro** y la figura de un **nudo toroidal**, que representa enigmático.  
- **Siniestro:** se identifica con **negro** y un **cono**, relacionado con lo misterioso.  
- **Acero:** se muestra con **plateado** y un **cilindro metálico**, transmitiendo resistencia y rigidez.  
- **Hada:** utiliza **rosado** y una **esfera pequeña**, representando sutileza mística.  
- **Dragón:** adopta un **azul oscuro** con un **dodecaedro grande**, representando poder y rareza.  
- **Sombra:** usa **gris oscuro** con un **icosaedro**, simbolizando neutralidad y sigilo.

El objetivo de esta representación es reforzar la **identidad visual y conceptual** de cada tipo Pokémon mediante elementos fácilmente reconocibles.

---

## 💻 Tecnologías utilizadas

- **React** – Biblioteca principal para la interfaz  
- **PokéAPI** – Fuente de datos externa  
- **React Three Fiber / Three.js** – Renderizado de figuras 3D  
- **CSS modular** – Estilos y animaciones de las tarjetas

---

## 🧭 Ejecución del proyecto

1. Instalar dependencias:
   ```bash
   npm install
2. Ejecutar el proyecto:
    ```bash
    npm run dev
3. Abrir en el navegador:
    http://localhost:5173/