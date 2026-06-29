import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getSong,
  isFavorite,
  addFavorite,
  removeFavorite,
} from "../services/database";
import ChordLyrics from "../components/ChordLyrics";
import { transponerAcorde } from "../utils/transpose";

function SongDetail() {
  const { id } = useParams();

  const [song, setSong] = useState(null);
  const [tono, setTono] = useState("");
  const [transposicion, setTransposicion] = useState(0);
  const [favorita, setFavorita] = useState(false);
  const [animando, setAnimando] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    cargarCancion();
  }, [id]);

  async function cargarCancion() {
    const data = await getSong(id);

    if (!data) {
      console.log("Canción no encontrada");
      return;
    }

    setSong(data);
    setTono(data.tono);
    setTransposicion(0);

    const fav = await isFavorite(id);
    setFavorita(fav);
  }

  async function toggleFavorita() {
    setAnimando(true);

    setTimeout(() => {
      setAnimando(false);
    }, 180);

    if (favorita) {
      await removeFavorite(id);
      setFavorita(false);
    } else {
      await addFavorite(id);
      setFavorita(true);
    }
  }

  function cambiarTono(pasos) {
    setTransposicion((actual) => actual + pasos);
    setTono((actual) => transponerAcorde(actual, pasos));
  }

  if (!song) {
    return <h3>Cargando...</h3>;
  }

  return (
    <div
      className="mx-auto"
      style={{ maxWidth: "700px" }}
    >
      {/* Barra superior */}
      <div
        className="d-flex justify-content-between align-items-center mb-4"
        style={{
          paddingRight: "8px",
        }}
      >
        <button
          className="btn btn-secondary"
          onClick={() => window.history.back()}
        >
          ← Volver
        </button>

        <button
          type="button"
          onClick={toggleFavorita}
          className="btn border-0 bg-transparent p-0"
          style={{
            fontSize: "2.5rem",
            lineHeight: 1,
            background: "transparent",
            border: "none",
            cursor: "pointer",
            userSelect: "none",
            transition:
              "transform .18s cubic-bezier(.34,1.56,.64,1), filter .18s",
            transform: animando
              ? "scale(1.35) rotate(-12deg)"
              : "scale(1)",
            filter: favorita
              ? "drop-shadow(0 2px 6px rgba(255,193,7,.45))"
              : "none",
          }}
          title={
            favorita
              ? "Quitar de favoritos"
              : "Agregar a favoritos"
          }
        >
          {favorita ? "⭐" : "☆"}
        </button>
      </div>

      {/* Título */}
      <h2
        className="text-center fw-bold mb-4"
        style={{
          color: "#666",
        }}
      >
        {song.titulo}
      </h2>

      {/* Cambio de tono */}
      <div className="d-flex align-items-center gap-2 mb-4">
        <button
          className="btn btn-outline-primary"
          onClick={() => cambiarTono(-1)}
        >
          -
        </button>

        <button className="btn btn-primary">
          {tono}
        </button>

        <button
          className="btn btn-outline-primary"
          onClick={() => cambiarTono(1)}
        >
          +
        </button>
      </div>

      {/* Letra */}
      <ChordLyrics
        letra={song.letra}
        transposicion={transposicion}
      />
    </div>
  );
}

export default SongDetail;