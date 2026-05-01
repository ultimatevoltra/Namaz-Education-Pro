export async function getPrayerTimes(lat, lng) {
  try {
    const res = await fetch(
      `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lng}`
    );
    const data = await res.json();
    return data.data.timings;
  } catch (error) {
    console.error('Error fetching prayer times:', error);
    return null;
  }
}
