export async function getDailyStats(userId, date) {
  const response = await fetch(
    `/api/stats/daily?date=${date.toISOString().split('T')[0]}`,
    { method: 'GET' }
  );
  return response.json();
}

export async function getWeeklyStats(userId) {
  const today = new Date();
  const weekStart = new Date(today.setDate(today.getDate() - today.getDay()));
  
  const response = await fetch(
    `/api/stats/weekly?from=${weekStart.toISOString()}`,
    { method: 'GET' }
  );
  return response.json();
}

export function calculateAccuracy(salahProgress) {
  if (!salahProgress || salahProgress.length === 0) return 0;
  
  const totalScore = salahProgress.reduce((sum, s) => sum + (s.score || 0), 0);
  return Math.round(totalScore / salahProgress.length);
}
