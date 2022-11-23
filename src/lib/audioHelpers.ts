const audio = new Audio("/chime.mp3");

export const playOrderNotification = () => {
  return audio.play();
};
