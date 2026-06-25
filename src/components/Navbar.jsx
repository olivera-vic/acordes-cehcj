function Navbar() {
  return (
    <nav
      className="navbar navbar-dark rounded mb-4"
      style={{
        background:
          "linear-gradient(90deg,#0c055c 0%,#2d6eb3 35%,#f28c28 100%)",
      }}
    >
      <div className="container-fluid justify-content-center">
        <span className="navbar-brand mb-0 h1 text-center">
          🎵 Repertorio de canciones CEHCJ 🎵
        </span>
      </div>
    </nav>
  );
}

export default Navbar;