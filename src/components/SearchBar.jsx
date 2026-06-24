function SearchBar({ busqueda, setBusqueda }) {
  return (
    <input
      type="text"
      className="form-control mb-4"
      placeholder="🔍 Buscar canción..."
      value={busqueda}
      onChange={(e) => setBusqueda(e.target.value)}
    />
  );
}

export default SearchBar;