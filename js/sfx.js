/* ============================================================
   SFX — Wii-style UI sounds, synthesized with WebAudio.
   No audio files: soft sine/triangle blips with fast envelopes,
   tuned to feel like the Wii Menu (hover tick, select "du-dunk",
   channel-open sweep, back whoosh, message-board pop).
   ============================================================ */

const SFX = (() => {
  let ctx = null, master = null;
  let muted = false;
  try { muted = localStorage.wii_muted === "1"; } catch (e) {}

  function ensure() {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return false;
      ctx = new AC();
      master = ctx.createGain();
      master.gain.value = 0.5;
      master.connect(ctx.destination);
    }
    if (ctx.state === "suspended") ctx.resume();
    return true;
  }

  /* one enveloped tone; f2 = pitch glide target */
  function tone({ f = 880, f2 = 0, type = "sine", dur = 0.1, vol = 0.25, delay = 0 }) {
    if (muted || !ensure()) return;
    const t0 = ctx.currentTime + delay;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(f, t0);
    if (f2) o.frequency.exponentialRampToValueAtTime(f2, t0 + dur);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(vol, t0 + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g); g.connect(master);
    o.start(t0); o.stop(t0 + dur + 0.03);
  }

  return {
    /* cursor slides onto a channel */
    hover()  { tone({ f: 1420, dur: 0.05, vol: 0.10 }); },
    /* button press — two quick rising notes */
    select() { tone({ f: 659, dur: 0.09, vol: 0.22 });
               tone({ f: 988, dur: 0.14, vol: 0.20, delay: 0.07 }); },
    /* channel zooms open — upward sweep + high chime */
    open()   { tone({ f: 392, f2: 784, dur: 0.30, vol: 0.18 });
               tone({ f: 1319, dur: 0.30, vol: 0.10, delay: 0.16 }); },
    /* zoom back out — downward sweep */
    back()   { tone({ f: 784, f2: 392, dur: 0.24, vol: 0.16 });
               tone({ f: 523, dur: 0.16, vol: 0.10, delay: 0.10 }); },
    /* message-board / overlay pop */
    pop()    { tone({ f: 520, f2: 760, dur: 0.08, vol: 0.22, type: "triangle" });
               tone({ f: 1046, dur: 0.12, vol: 0.10, delay: 0.05 }); },

    get muted() { return muted; },
    toggle() {
      muted = !muted;
      try { localStorage.wii_muted = muted ? "1" : "0"; } catch (e) {}
      if (!muted) this.select();
      return muted;
    },
  };
})();
