import { transponerAcorde } from "../utils/transpose";

function ChordLyrics({ letra, transposicion }) {
  const regex = /\[([^\]]+)\]/g;

  return (
    <div
      style={{
        width: "100%",
        overflowX: "auto",
        whiteSpace: "pre-wrap",
        wordBreak: "normal",
        fontFamily: "Consolas, monospace",
        fontSize: "clamp(17px, 3.8vw, 24px)",
        lineHeight: "1.25",
        textAlign: "left",
        paddingBottom: "120px",
      }}
    >
      {letra.split("\n").map((linea, index) => {
        // Si la línea está vacía, respetar el espacio
        if (linea.trim() === "") {
          return <br key={index} />;
        }

        const partes = linea.split(regex);

        return (
          <div key={index}>
            {partes.map((parte, i) => {
              // Los índices impares son acordes
              if (i % 2 === 1) {
                return (
                  <span
                    key={i}
                    style={{
                      color: "#0d6efd",
                      fontWeight: "bold",
                    }}
                  >
                    {" "}
                    {transponerAcorde(parte, transposicion)}
                    {" "}
                  </span>
                );
              }

              return <span key={i}>{parte}</span>;
            })}
          </div>
        );
      })}
    </div>
  );
}

export default ChordLyrics;