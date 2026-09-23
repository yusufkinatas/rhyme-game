# Kafiye Oyunu (Turkish Rhyme Game)

A simple Turkish freestyle-rap practice tool, inspired by The Rhyme Game.
Pick a beat, follow the bouncing ball, and land the rhyme word on the 4th beat
of each bar. Turkish rhyme families are color-matched so you can see the scheme.

## Live

https://rhyme.yusuf.app (Vercel, auto-deploys from `main`)

## Run

The game seeks each track to its musical drop, which needs a server that
supports HTTP Range requests. Python's `http.server` does **not**, so use the
included Node server:

```
node serve.js
# then open http://localhost:8080/
```

If you serve it from a host without Range support, the game still works: it
just starts the count-in immediately instead of skipping to the drop.

## How to play

1. **Seviye** (level) sets how much help you get:
   - Başlangıç: all rhyme words shown (AABB)
   - Orta: only the first word of each pair shown
   - İleri: only the target word shown
   - Uzman: AAAA (four bars, one rhyme sound), target shown
2. **Ritim** picks the beat (each has its own BPM).
3. **Uzunluk** sets the length in bars.
4. **Dizeler** shows or hides the full verse line under each bar. You can also
   toggle it mid-game. Hidden rhyme words stay hidden in the line too.
5. Hit **Başla**. A 4-beat count-in leads into the drop, then each bar scrolls
   under the marker. Fill the first three beats with anything; land the shown
   rhyme word on the fourth. The game does not listen to or score you.

## Files

- `index.html` — the game (HTML/CSS/JS, no build step)
- `verses.js` — the rhyme content: couplets (AABB) and quatrains (AAAA).
  Each line must end on its rhyme word, which the game shows on beat 4.
- `serve.js` — static server with Range support
- `beats/` — four instrumentals (85–130 BPM) by Frequently Asked Music,
  the same tracks The Rhyme Game uses

## Beats / credit

The four beats are by **Frequently Asked Music**. They are included here for a
personal, non-commercial practice project. Replace them with your own tracks
for any public or commercial use, and update the `BEATS` array in `index.html`
(set each track's `bpm`, `dropMs` where the beat drops, and `endMs`).
