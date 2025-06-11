export const rgbToHex = (r: number, g: number, b: number) => {
  return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
};

export const hexToRgb = (hex: string) => {
  const bigint = parseInt(hex.slice(1), 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
};

export const colorMatch = (
  r1: number,
  g1: number,
  b1: number,
  r2: number,
  g2: number,
  b2: number,
  tolerance = 60
) => {
  return (
    Math.abs(r1 - r2) <= tolerance &&
    Math.abs(g1 - g2) <= tolerance &&
    Math.abs(b1 - b2) <= tolerance
  );
};

export const downloadCanvasAsImage = (
  canvas: HTMLCanvasElement,
  fileName: string
) => {
  const link = document.createElement("a");
  link.download = fileName;
  link.href = canvas.toDataURL("image/png");
  link.click();
};
