import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SongCard from "../components/SongCard";
import SearchBar from "../components/SearchBar";
import { sincronizarCanciones } from "../services/sync";
import {
  getSongs,
  getFavorites,
} from "../services/database";

function Home() {
  const location = useLocation();

  const [canciones, setCanciones] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [mostrarFavoritos, setMostrarFavoritos] = useState(false);

  useEffect(() => {
    cargarCanciones();
  }, []);

  // Cuando regresamos desde SongDetail
  useEffect(() => {
    if (location.state?.mostrarFavoritos !== undefined) {
      setMostrarFavoritos(location.state.mostrarFavoritos);
    }

    cargarFavoritos();
  }, [location]);

  async function cargarFavoritos() {
    const favoritosDB = await getFavorites();
    setFavoritos(favoritosDB);
  }

  async function cargarCanciones() {
    let data = await getSongs();

    data.sort((a, b) => a.titulo.localeCompare(b.titulo));

    const favoritosDB = await getFavorites();

    setFavoritos(favoritosDB);
    setCanciones(data);

    await sincronizarCanciones();

    data = await getSongs();

    data.sort((a, b) => a.titulo.localeCompare(b.titulo));

    setCanciones(data);
  }

  const cancionesFiltradas = canciones.filter((cancion) => {
    const coincideBusqueda = cancion.titulo
      .toLowerCase()
      .includes(busqueda.toLowerCase());

    const esFavorita = favoritos.some(
      (f) => f.id === cancion.id
    );

    if (mostrarFavoritos) {
      return coincideBusqueda && esFavorita;
    }

    return coincideBusqueda;
  });

  return (
    <>
      <h2
        className="text-center mb-4"
        style={{
          color: "#999",
          fontWeight: "700",
        }}
      >
        Canciones ({canciones.length})
      </h2>

      <div className="btn-group w-100 mb-3">
        <button
          className={
            mostrarFavoritos
              ? "btn btn-outline-primary"
              : "btn btn-primary"
          }
          onClick={() => setMostrarFavoritos(false)}
        >
          🎵 Todas ({canciones.length})
        </button>

        <button
          className={
            mostrarFavoritos
              ? "btn btn-primary"
              : "btn btn-outline-primary"
          }
          onClick={() => setMostrarFavoritos(true)}
        >
          💛 Favoritas ({favoritos.length})
        </button>
      </div>

      <SearchBar
        busqueda={busqueda}
        setBusqueda={setBusqueda}
      />

      <div className="mt-4">

        {mostrarFavoritos && favoritos.length === 0 && (
          <div className="card shadow-sm">
            <div className="card-body text-center py-5">

              <div style={{ fontSize: "3rem" }}>
                💛
              </div>

              <h5 className="mt-3">
                Sin favoritos
              </h5>

              <p className="text-muted mb-0">
                Aún no tienes canciones favoritas.
              </p>

              <p className="text-muted">
                Abre una canción y pulsa el corazón
                para agregarla.
              </p>

            </div>
          </div>
        )}

        {cancionesFiltradas.map((cancion) => (
          <SongCard
            key={cancion.id}
            id={cancion.id}
            titulo={cancion.titulo}
            tono={cancion.tono}
            favorita={favoritos.some(
              (f) => f.id === cancion.id
            )}
            mostrarFavoritos={mostrarFavoritos}
          />
        ))}

      </div>
    </>
  );
}

export default Home;