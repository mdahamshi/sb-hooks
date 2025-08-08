import { useEffect } from 'react';

const defaultPalette = [
  "#8e1330", "#8a6c1d", "#406555", "#7c0e45", "#8d1978",
  "#181770", "#cc38d7", "#47504e", "#0fa080", "#0f64a0",
  "#460fa0", "#a00f65", "#a00f24", "#0f94a0", "#0fa067",
  "#0fa03c", "#38a00f", "#a09d0f", "#a0670f", "#a0370f",
  "#a00f0f", "#2b634d", "#2b4c63", "#2e6bc6", "#1992d4",
];

function getRandomColor(palette) {
  const activePalette = Array.isArray(palette) && palette.length > 0 ? palette : defaultPalette;
  return activePalette[Math.floor(Math.random() * activePalette.length)];
}

export default function useRandomPrimaryColor(palette) {
  useEffect(() => {
    const color = getRandomColor(palette);
    document.documentElement.style.setProperty('--primary', color);
  }, [palette]);
}
