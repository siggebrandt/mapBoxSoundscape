import { useState } from "react";

export default function GameStatsSlider() {
  const steps = ["0'", "25'", "50'", "75'", "90'"]; // eleda.gameEvents.length
  const [index, setIndex] = useState(0);
  return (
    <>
      {/* GAME TIME SLIDER */}
      <div
        className="navigation"
        style={{
          position: "absolute",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)", // Centrerar exakt i mitten
          zIndex: 10,
          background: "rgba(0,0,0, 0.3)",
          backdropFilter: "blur(4px)",
          padding: "8px 16px",
          borderRadius: "20px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <div
          className="gameInfo"
          style={{ fontSize: "14px", fontWeight: "600" }}
        >
          STATS AT TOP: {steps[index]}
        </div>
      </div>

      {/* 2. GAME TIME SLIDER LÄNGST NER */}
      <div
        className="navigation"
        style={{
          position: "absolute",
          bottom: "40px",
          left: "50%",
          transform: "translateX(-50%)", // Centrerar i mitten
          width: "min(90%, 500px)", // Responsiv bredd som maxar på 500px
          zIndex: 10,
          background: "rgba(0, 0, 0, 0.3)",
          backdropFilter: "blur(6px)",
          padding: "16px 24px",
          borderRadius: "16px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
        }}
      >
        <div className="gameSlider">
          {/* SJÄLVA SLIDERN */}
          <input
            type="range"
            min={0}
            max={steps.length - 1}
            step={1}
            value={index}
            onChange={(e) => setIndex(Number(e.target.value))}
            style={{
              width: "100%",
              height: "6px",
              appearance: "none",
              WebkitAppearance: "none",
              backgroundColor: "#e2e8f0",
              borderRadius: "3px",
              outline: "none",
              cursor: "pointer",
            }}
          />
          {/* ETIKETTER UNDER SLIDERN */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "8px",
            }}
          >
            {steps.map((label, i) => (
              <span
                key={i}
                onClick={() => setIndex(i)}
                style={{
                  cursor: "pointer",
                  fontSize: "12px",
                  fontWeight: index === i ? "700" : "400",
                  color: index === i ? "#2563eb" : "#64748b",
                  transition: "all 0.15s ease",
                }}
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
