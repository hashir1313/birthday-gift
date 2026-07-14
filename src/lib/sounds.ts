let audioCtx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    audioCtx = new Ctor();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

function tone(freq: number, duration: number, type: OscillatorType, volume: number, delay = 0) {
  const ctx = getCtx();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  osc.connect(gain);
  gain.connect(ctx.destination);
  const start = ctx.currentTime + delay;
  gain.gain.setValueAtTime(0, start);
  gain.gain.linearRampToValueAtTime(volume, start + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
  osc.start(start);
  osc.stop(start + duration);
}

export const sounds = {
  click: () => tone(800, 0.05, 'sine', 0.08),
  startup: () => {
    tone(220, 0.15, 'sine', 0.1, 0);
    tone(330, 0.15, 'sine', 0.1, 0.08);
    tone(440, 0.3, 'sine', 0.1, 0.16);
  },
  complete: () => {
    tone(523, 0.15, 'sine', 0.12, 0);
    tone(659, 0.15, 'sine', 0.12, 0.1);
    tone(784, 0.15, 'sine', 0.12, 0.2);
    tone(1047, 0.4, 'sine', 0.12, 0.3);
  },
  error: () => {
    tone(200, 0.1, 'sawtooth', 0.06, 0);
    tone(150, 0.15, 'sawtooth', 0.06, 0.08);
  },
  levelUp: () => {
    tone(440, 0.1, 'square', 0.08, 0);
    tone(554, 0.1, 'square', 0.08, 0.06);
    tone(659, 0.1, 'square', 0.08, 0.12);
    tone(880, 0.3, 'square', 0.1, 0.18);
  },
};
