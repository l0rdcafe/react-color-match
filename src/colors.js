const colors = ["black", "blue", "red", "green", "yellow", "orange", "purple", "pink", "gold"];
const pickRandom = arr => arr[Math.floor(Math.random() * colors.length)];

const randomColors = () => {
  const meaningWord = pickRandom(colors);
  const inkWord = pickRandom(colors);
  const inkColor = Math.random() < 0.4 ? meaningWord : pickRandom(colors);

  return {
      meaningWord,
      inkWord,
      inkColor,
      meaningInkMatch: meaningWord === inkColor
  };
}

export default randomColors;