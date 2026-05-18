A DOM-based strategic chain reaction game 

This project implements explosive chain mechanics, recursive reactions, multiplayer gameplay systems, timers, scoring, responsive UI, replay systems, and advanced game logic

# Game Preveiw

Chain Reaction is a turn-based strategy game where players place units on a grid.  
When a cell reaches its maximum capacity, it explodes and distributes units to neighboring cells, potentially triggering massive chain reactions.

The objective is simple:

> Eliminate all opponent units from the board.

# Features

# Normal Mode

- 6x12 dynamic grid
- Explode-on-cap mechanics
- Recursive chain reactions
- Capture system
- Turn-based gameplay
- Responsive UI
- Sound effects
- Turn timer
- Total game timer
- Pause/Resume support
- Score tracking
- Win-state detection



# Hacker Mode

- Teleportation portals
- Move history panel
- Leaderboard system
- Bomb power-ups
- Tactical boosts
- Multiplayer support

# Hacker++ Mode

- Dynamic board geometries
- AI/Bot opponent
- Replay system
- Undo/Redo
- Advanced animations
- Playback controls

---

# Core Mechanics

## Cell Capacity

Each cell has a maximum capacity depending on its neighbors.

| Cell Type | Capacity |
| Corner | 2 |
| Edge | 3 |
| Inner | 4 |

---

## Explosion Logic

When:
```js
cell.count >= cell.capacity
