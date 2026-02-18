import "../loader.css";

export default function Loader({ message }) {
  return (
    <div className="loader">
        {message && (
            <p className="absolute bottom-10 text-white text-sm font-medium">{message}</p>
        )}
        <div className="pill">
            <div className="medicine">
            {Array.from({ length: 20 }).map((_, i) => (
                <i key={i}></i>
            ))}
            </div>

            <div className="side"></div>
            <div className="side"></div>
        </div>
    </div>
  );
}
