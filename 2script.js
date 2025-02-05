const colorkit = {
    // Generate random hex color
    random: () =>
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0"),
  
    // Create gradient between two colors
    gradient: (color1, color2, steps) => {
      const hex2rgb = (hex) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return [r, g, b];
      };
  
      const rgb2hex = (r, g, b) =>
        "#" +
        [r, g, b]
          .map((x) => Math.round(x).toString(16).padStart(2, "0"))
          .join("");
  
      const [r1, g1, b1] = hex2rgb(color1);
      const [r2, g2, b2] = hex2rgb(color2);
  
      return Array.from({ length: steps }, (_, i) => {
        const factor = i / (steps - 1);
        const r = r1 + (r2 - r1) * factor;
        const g = g1 + (g2 - g1) * factor;
        const b = b1 + (b2 - b1) * factor;
        return rgb2hex(r, g, b);
      });
    },
  
    // Apply pulsing animation to element
    pulse: (element, color1, color2, duration = "2s") => {
      element.style.animation = `pulse ${duration} infinite`;
      const style = document.createElement("style");
      style.textContent = `
        @keyframes pulse {
          0%, 100% { background-color: ${color1}; }
          50% { background-color: ${color2}; }
        }
      `;
      document.head.appendChild(style);
    },
  
    // Generate complementary color
    complement: (color) => {
      const hex = color.replace("#", "");
      const rgb = parseInt(hex, 16);
      const comp = 0xffffff - rgb;
      return "#" + comp.toString(16).padStart(6, "0");
    },
  
    // Add sparkle effect to element
    sparkle: (element) => {
      element.style.position = "relative";
      const sparkle = document.createElement("div");
      sparkle.style.cssText = `
        position: absolute;
        width: 100%;
        height: 100%;
        pointer-events: none;
      `;
      element.appendChild(sparkle);
  
      setInterval(() => {
        const star = document.createElement("div");
        const size = Math.random() * 24 + 12;
        star.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          background: white;
          border-radius: 50%;
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
          animation: twinkle 0.8s linear forwards;
        `;
        sparkle.appendChild(star);
        setTimeout(() => star.remove(), 800);
      }, 50);
  
      const style = document.createElement("style");
      style.textContent = `
        @keyframes twinkle {
          0% { transform: scale(0); opacity: 1; }
          100% { transform: scale(1); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }
  };
  
  if (typeof module !== "undefined" && module.exports) {
    module.exports = colorkit;
  } else {
    window.colorkit = colorkit;
  }