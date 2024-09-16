document.addEventListener("DOMContentLoaded", function () {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  document.getElementById('current-date').innerText = new Date().toLocaleDateString('en-US', options);

  // Function to fetch prayer times from the Aladhan API using latitude and longitude
  async function fetchPrayerTimes() {
      const latitude = 40.163872518272896; // Latitude for Levittown, PA
      const longitude = -74.83324880960556; // Longitude for Levittown, PA
      const response = await fetch(`https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=13`);
      const data = await response.json();
      const timings = data.data.timings;

      document.getElementById('fajr-time').innerText = timings.Fajr;
      document.getElementById('sunrise-time').innerText = timings.Sunrise;
      document.getElementById('dhuhr-time').innerText = timings.Dhuhr;
      document.getElementById('asr-time').innerText = timings.Asr;
      document.getElementById('maghrib-time').innerText = timings.Maghrib;
      document.getElementById('isha-time').innerText = timings.Isha;

      highlightCurrentPrayer(timings);
  }

  // Function to highlight the most recent prayer time
  function highlightCurrentPrayer(timings) {
      // Set current time to 1:08 PM for testing
      const currentTime = new Date();

      const prayerTimes = [
          { name: 'Fajr', time: timings.Fajr },
          { name: 'Sunrise', time: timings.Sunrise },
          { name: 'Dhuhr', time: timings.Dhuhr },
          { name: 'Asr', time: timings.Asr },
          { name: 'Maghrib', time: timings.Maghrib },
          { name: 'Isha', time: timings.Isha }
      ];

      let mostRecentPrayer = null;

      for (let i = 0; i < prayerTimes.length; i++) {
          const prayerTime = new Date();
          const [hours, minutes] = prayerTimes[i].time.split(':');
          prayerTime.setHours(hours, minutes, 0, 0);

          if (currentTime >= prayerTime) {
              mostRecentPrayer = prayerTimes[i].name;
          } else {
              break;
          }
      }

      if (mostRecentPrayer) {
          document.getElementById(`${mostRecentPrayer.toLowerCase()}-time`).parentElement.classList.add('active');
      }
  }

  // Call the function to fetch prayer times
  fetchPrayerTimes();
});