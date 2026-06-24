import { Link } from "react-router-dom";

function SongCard({ id, titulo, tono }) {
  return (
    <div className="card shadow-sm mb-3">
      <div className="card-body d-flex justify-content-between align-items-center">
        <div>
          <h5 className="mb-1">{titulo}</h5>

          <small className="text-muted">
            Tono: <strong>{tono}</strong>
          </small>
        </div>

        <Link
          to={`/song/${id}`}
          className="btn btn-outline-primary"
        >
          Ver
        </Link>
      </div>
    </div>
  );
}

export default SongCard;