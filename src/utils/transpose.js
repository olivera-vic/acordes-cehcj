const notas = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];

const equivalencias = {
  Db: "C#",
  Eb: "D#",
  Gb: "F#",
  Ab: "G#",
  Bb: "A#",
};

function moverNota(nota, pasos) {
  nota = equivalencias[nota] || nota;

  const indice = notas.indexOf(nota);

  if (indice === -1) return nota;

  return notas[(indice + pasos + 12) % 12];
}

export function transponerAcorde(acorde, pasos) {
  if (!acorde) return acorde;

  const partes = acorde.split("/");

  const principal = partes[0];

  const match = principal.match(/^([A-G](?:#|b)?)(.*)$/);

  if (!match) return acorde;

  const nuevoPrincipal =
    moverNota(match[1], pasos) + match[2];

  if (partes.length === 1) {
    return nuevoPrincipal;
  }

  const nuevoBajo = moverNota(partes[1], pasos);

  return `${nuevoPrincipal}/${nuevoBajo}`;
}