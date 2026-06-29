import { useEffect, useState } from "react";
import SongCard from "../components/SongCard";
import SearchBar from "../components/SearchBar";
import { sincronizarCanciones } from "../services/sync";
import { getSongs } from "../services/database";

function Home() {
  const [canciones, setCanciones] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    cargarCanciones();
  }, []);

  async function cargarCanciones() {
    // 1. Mostrar inmediatamente las canciones guardadas
    let data = await getSongs();

    data.sort((a, b) => a.titulo.localeCompare(b.titulo));

    setCanciones(data);

    // 2. Sincronizar en segundo plano
    await sincronizarCanciones();

    // 3. Volver a leer la base local por si hubo cambios
    data = await getSongs();

    data.sort((a, b) => a.titulo.localeCompare(b.titulo));

    setCanciones(data);
  }

  const cancionesFiltradas = canciones.filter((cancion) =>
    cancion.titulo.toLowerCase().includes(busqueda.toLowerCase())
  );

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

      <SearchBar
        busqueda={busqueda}
        setBusqueda={setBusqueda}
      />

      <div className="mt-4">
        {cancionesFiltradas.map((cancion) => (
          <SongCard
            key={cancion.id}
            id={cancion.id}
            titulo={cancion.titulo}
            tono={cancion.tono}
          />
        ))}
      </div>
    </>
  );
}

export default Home;