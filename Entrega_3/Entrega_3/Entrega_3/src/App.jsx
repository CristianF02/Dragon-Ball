import { useState, useEffect } from "react";
import { getAllcharacters } from "./Api/httRequest";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [filter, setFilter] = useState("all"); 
  const [showAbout, setShowAbout] = useState(false);

  useEffect(() => {
    const getCharacterDataRequest = async () => {
      const characterData = await getAllcharacters();
      setCharacters(characterData);
    };
    getCharacterDataRequest();
  }, []);

  const handleCharacterClick = (item) => {
    setSelectedCharacter(item);
    setShowAbout(false);
  };

  const closeDetails = () => {
    setSelectedCharacter(null);
  };

  
  const filteredCharacters =
    filter === "all"
      ? characters
      : filter === "No-Human"
      ? characters.filter((character) => character.race !== "Human")
      : characters.filter((character) => character.race === filter);

  return (
    <>
      <h1 className="text-center my-3 text-white">Dragon Ball Z API</h1>
      <div className="container">
        {/* Contenedor izquierdo con la imagen y los botones */}
        <div className="sidebar-left">
          <img
            src="https://storage.googleapis.com/pod_public/750/232853.jpg"
            alt="Dragon Ball Z"
            className="sidebar-image"
          />
          <div className="button-container">
            <button onClick={() => setFilter("all")}>Home</button>
            <button onClick={() => setFilter("Human")}>Humanos</button>
            <button onClick={() => setFilter("No-Human")}>No Humanos</button>
            <button onClick={() => setShowAbout(true)}>Acerca de...</button>
          </div>
        </div>

        <div className="cardContainer">
          {filteredCharacters.map((item) => (
            <div
              className="card"
              key={item.id}
              onClick={() => handleCharacterClick(item)}
            >
              <div className="card-image-container">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="card-body">
                <h5 className="card-title">Nombre: {item.name}</h5>
                <p className="card-race">Raza: {item.race}</p>
                <p className="card-genero">Género: {item.gender}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tarjeta para mostrar detalles del personaje */}
        {selectedCharacter && (
          <div className="details-card">
            <span className="close" onClick={closeDetails}>
              &times;
            </span>
            <h2>Detalles de {selectedCharacter.name}</h2>
            <p>
              <strong>Afiliación:</strong> {selectedCharacter.affiliation}
            </p>
            <p>
              <strong>Descripción:</strong> {selectedCharacter.description}
            </p>
            <p>
              <strong>Ki:</strong> {selectedCharacter.ki}
            </p>
            <p>
              <strong>Maximo Ki:</strong> {selectedCharacter.maxKi}
            </p>
          </div>
        )}

        {/* Tarjeta de "Acerca de..." */}
        {showAbout && (
          <div className="details-card">
            <span className="close" onClick={() => setShowAbout(false)}>
              &times;
            </span>
            <h2>Acerca de...</h2>
            <p>
              Esto es una página que ha sido desarrollada por el estudiante
              Cristhian Felipe, estudiante de Ingeniería de Sistemas de la
              Uniamazonia, para la asignatura de Programación Web.
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
