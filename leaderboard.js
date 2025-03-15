const leaderboardData = [
    { name: "Alice", score: 3 },
    { name: "Bob", score: 2 },
    { name: "Charlie", score: 1 }
  ];
  
  const leaderboard = document.getElementById("leaderboard");
  
  leaderboardData.forEach((entry, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${entry.name}</td>
      <td>${entry.score}</td>
    `;
    leaderboard.appendChild(row);
  });