export default function GameStatsSlider() {
  return (
    <>
      <div
        className="navigation"
        style={{
          position: "absolute",
          /* top: "50%", */
          left: "50%",
          zIndex: "2",
        }}
      >
        <div className="gameInfo" style={{}}>
          "STATS AT TOP"
        </div>
      </div>

      {/* GAME TIME SLIDER */}
      <div
        className="navigation"
        style={{
          position: "absolute",
          bottom: "5%",
          left: "10%",
          zIndex: "2",
        }}
      >
        <div className="gameSlider">
          <input type="range" min="0" max="100" step="25" />
        </div>
      </div>
    </>
  );
}
