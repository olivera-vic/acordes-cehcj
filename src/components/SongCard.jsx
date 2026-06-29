import { Link } from "react-router-dom";

function SongCard({ id, titulo, tono, favorita }) {
  return (
    <div className="card shadow-sm mb-3">
      <div className="card-body d-flex justify-content-between align-items-center">
        <div className="text-start">
          <h5 className="mb-1">{titulo}</h5>

          <small className="text-muted d-flex align-items-center">
            <span>
              Tono: <strong>{tono}</strong>
            </span>

            {favorita && (
              <span
                style={{
                  marginLeft: "18px",
                  fontSize: "1rem",
                }}
              >
                💛
              </span>
            )}
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