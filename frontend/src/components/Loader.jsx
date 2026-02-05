import "../loader.css";

export default function Loader() {
  return (
    <div className="loader">
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
