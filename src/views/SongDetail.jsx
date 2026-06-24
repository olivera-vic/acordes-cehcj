import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../services/supabase";
import ChordLyrics from "../components/ChordLyrics";
import { transponerAcorde } from "../utils/transpose";

function SongDetail() {
  const { id } = useParams();

  const [song, setSong] = useState(null);
  const [tono, setTono] = useState("");
  const [transposicion, setTransposicion] = useState(0);

  useEffect(() => {
    cargarCancion();
  }, [id]);

  async function cargarCancion() {
    const { data, error } = await supabase
      .from("songs")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.log(error);
      return;
    }

    setSong(data);
    setTono(data.tono);
    setTransposicion(0);
  }

  function cambiarTono(pasos) {
    setTransposicion((actual) => actual + pasos);

    setTono((actual) =>
      transponerAcorde(actual, pasos)
    );
  }

  if (!song) {
    return <h3>Cargando...</h3>;
  }

  return (
    <div
      className="mx-auto"
      style={{ maxWidth: "700px" }}
    >
      <button
        className="btn btn-secondary mb-4"
        onClick={() => window.history.back()}
      >
        ← Volver
      </button>

      <h2
        className="text-center fw-bold mb-4"
        style={{ color: "#666" }}
      >
        {song.titulo}
      </h2>

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

      <ChordLyrics
        letra={song.letra}
        transposicion={transposicion}
      />
    </div>
  );
}

export default SongDetail;