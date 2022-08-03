// https://structy.net/problems/premium/best-bridge

const bestBridge = (grid) => {
  // find island: nested for loops

  const visited = new Set();
  const deltas = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  // bfs traversal: mark "L" as visited for first island
  let meetW = true;

  for (let i = 0; i < grid.length && meetW; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === "L") {
        console.log(i, j, grid[i][j]);

        // console.log("as;dlkfjas;dlfj;slkdf");
        const current = i + "," + j;
        !visited.has(current) && visited.add(current);

        const queue = [[i, j]];

        while (queue.length > 0) {
          const [y, x] = queue.shift();

          for (const delta of deltas) {
            const [m, n] = delta;
            const neiY = y + m;
            const neiX = x + n;
            const nei = neiY + "," + neiX;

            if (
              isInbound(grid, neiY, neiX) &&
              grid[neiY][neiX] !== "W" &&
              !visited.has(nei)
            ) {
              queue.push([neiY, neiX]);
              visited.add(nei);
            }
          }
        }

        meetW = false;
      }
    }
  }

  let min = Infinity;
  // loops thru "L" in visited:
  //// get min from all "L"
  visited.forEach(
    (l) => (min = Math.min(min, explore(grid, l, deltas, visited)))
  );

  return visited;
};

const isInbound = (grid, y, x) => {
  const boundY = 0 <= y && y < grid.length;
  const boundX = 0 <= x && x < grid[0].length;

  return boundX && boundY;
};

const explore = (grid, l, deltas, visited) => {
  const exploreVisited = new Set();

  const [i, j] = l.split(",");
  const queue = [[+i, +j, 0]];

  while (queue.length > 0) {
    // console.log(queue);
    const [y, x, distance] = queue.shift();

    //// bfs traversal from each L until it meets another island's "L"
    for (const delta of deltas) {
      const [m, n] = delta;
      const neiY = y + m;
      const neiX = x + n;
      const nei = neiY + "," + neiX;
      //   console.log(neiY, neiX, distance);

      const boundY = 0 <= neiY && neiY < grid.length;
      const boundX = 0 <= neiX && neiX < grid[0].length;

      if (boundY && boundX && !visited.has(nei) && grid[neiY][neiX] === "L") {
        console.log(distance);
        return distance;
      }

      if (boundY && boundX && !visited.has(nei) && !exploreVisited.has(nei)) {
        queue.push([neiY, neiX, distance + 1]);
        exploreVisited.add(nei);
      }
    }

    // console.log("1 circle");
  }

  return Infinity;
};

// const grid = [
//   ["W", "W", "W", "L", "L"],
//   ["L", "L", "W", "W", "L"],
//   ["L", "L", "L", "W", "L"],
//   ["W", "L", "W", "W", "W"],
//   ["W", "W", "W", "W", "W"],
//   ["W", "W", "W", "W", "W"],
// ];
// -> 1

// const grid = [
//   ["W", "W", "W", "W", "W"],
//   ["W", "W", "W", "L", "W"],
//   ["L", "W", "W", "W", "W"],
// ];
// // -> 3

// const grid = [
//   ["W", "L", "W", "W", "W", "W", "W", "W"],
//   ["W", "L", "W", "W", "W", "W", "W", "W"],
//   ["W", "W", "W", "W", "W", "W", "W", "W"],
//   ["W", "W", "W", "W", "W", "W", "W", "W"],
//   ["W", "W", "W", "W", "W", "W", "W", "W"],
//   ["W", "W", "W", "W", "W", "W", "L", "W"],
//   ["W", "W", "W", "W", "W", "W", "L", "L"],
//   ["W", "W", "W", "W", "W", "W", "W", "L"],
// ];
// // -> 8

const grid = [
  ["W", "W", "W", "W", "W"],
  ["W", "W", "W", "W", "W"],
  ["L", "L", "W", "W", "L"],
  ["W", "L", "W", "W", "L"],
  ["W", "W", "W", "L", "L"],
  ["W", "W", "W", "W", "W"],
];

// -> 2
console.log(bestBridge(grid));

// p: grid
// // r: num+

// const bestBridge = (grid) => {
//   // find island

//   const visited = new Set();

//   for (let i = 0; i < grid.length; i++) {
//     for (let j = 0; j < grid[0].length; j++) {
//       if (grid[i][j] === "L") {
//         checkVisited(grid, i, j, visited);
//       }

//       if (visited.size > 0) {
//         const queue = [[i, j, 0]];

//         while (queue.length > 0) {
//             const [y,x,0] = queue.shift()

//         }
//       }
//     }
//   }

//   // get all island's 'L'

//   // dfs to next island
//   return visited;
// };

// // check if inbound
// const isInbound = (grid, y, x) => {
//   const boundY = 0 <= y && y < grid.length;
//   const boundX = 0 <= x && x < grid[0].length;

//   return boundY && boundX;
// };

// // visited set
// const checkVisited = (grid, y, x, visited) => {
//   if (!isInbound) return visited;

//   const current = y + "," + x;
//   visited.add(current);

//   return visited;
// };
