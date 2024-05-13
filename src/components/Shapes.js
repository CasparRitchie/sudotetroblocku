export const SHAPES = {
    S: { // Single cell (simple square)
      1: [[0, 0]]
    },
    I: { // Line shape (4 orientations)
      1: [[0, 0], [0, 1], [0, 2], [0, 3]],
      2: [[0, 0], [1, 0], [2, 0], [3, 0]],
      3: [[0, 0], [0, 1], [0, 2], [0, 3]],
      4: [[0, 0], [1, 0], [2, 0], [3, 0]]
    },
    L: { // L-shaped (4 orientations)
      1: [[0, 0], [1, 0], [1, 1], [1, 2]],
      2: [[0, 2], [1, 2], [1, 1], [1, 0]],
      3: [[0, 0], [0, 1], [0, 2], [1, 2]],
      4: [[0, 0], [0, 1], [0, 2], [1, 0]]
    },
    T: { // T-shaped (4 orientations)
      1: [[0, 1], [1, 0], [1, 1], [1, 2]],
      2: [[0, 1], [1, 1], [1, 0], [2, 1]],
      3: [[0, 0], [0, 1], [0, 2], [1, 1]],
      4: [[0, 1], [1, 1], [2, 1], [1, 0]]
    }
  };