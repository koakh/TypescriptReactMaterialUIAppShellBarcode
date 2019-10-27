import beepSound from '../assets/sounds/beep.mp3';

export const playBeep = async () => {
  playSound(beepSound);
}

export const playSound = async (file: string) => {
  const audio: HTMLAudioElement = new Audio(file);
  audio.load();
  const audioPromise = audio.play();
  if (audioPromise !== undefined) {
    await audioPromise.catch((error: any) => {
      // catch dom exception
      console.error(error)
    })
  }
}
