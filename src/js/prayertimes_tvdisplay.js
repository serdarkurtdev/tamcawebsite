document.addEventListener("DOMContentLoaded", function () {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('current-date').innerText = new Date().toLocaleDateString('en-US', options);

    let prayerTimings = {};

    // Function to fetch prayer times from the Aladhan API using latitude and longitude
    async function fetchPrayerTimes() {
        const latitude = 40.163872518272896; // Latitude for Levittown, PA
        const longitude = -74.83324880960556; // Longitude for Levittown, PA
        const response = await fetch(`https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=13`);
        const data = await response.json();
        prayerTimings = data.data.timings;

        document.getElementById('fajr-time').innerText = convertTo12HourFormat(prayerTimings.Fajr);
        document.getElementById('sunrise-time').innerText = convertTo12HourFormat(prayerTimings.Sunrise);
        document.getElementById('dhuhr-time').innerText = convertTo12HourFormat(prayerTimings.Dhuhr);
        document.getElementById('asr-time').innerText = convertTo12HourFormat(prayerTimings.Asr);
        document.getElementById('maghrib-time').innerText = convertTo12HourFormat(prayerTimings.Maghrib);
        document.getElementById('isha-time').innerText = convertTo12HourFormat(prayerTimings.Isha);

        highlightCurrentPrayer(prayerTimings);
        updateCountdown(prayerTimings);
    }

    // Function to convert 24-hour time to 12-hour time with AM/PM
    function convertTo12HourFormat(time) {
        const [hours, minutes] = time.split(':').map(Number);
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const adjustedHours = hours % 12 || 12; // Convert 0 to 12 for 12 AM
        return `${adjustedHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    }

    // Function to highlight the most recent prayer time
    function highlightCurrentPrayer(timings) {
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

    // Function to update the current time and countdown to the next prayer time
    function updateCurrentTime() {
        const now = new Date();
        document.getElementById('current-time').innerText = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });
        updateCountdown(prayerTimings);
    }

    // Function to update the countdown to the next prayer time
    function updateCountdown(timings) {
        const now = new Date();
        const prayerTimes = [
            { name: 'Sabah (Fajr)', time: timings.Fajr },
            { name: 'Güneş (Sunrise)', time: timings.Sunrise },
            { name: 'Öğle (Dhuhr)', time: timings.Dhuhr },
            { name: 'İkindi (Asr)', time: timings.Asr },
            { name: 'Akşam (Maghrib)', time: timings.Maghrib },
            { name: 'Yatsı (Isha)', time: timings.Isha }
        ];

        let nextPrayer = null;
        let minDiff = Infinity;

        prayerTimes.forEach(prayer => {
            const [hours, minutes] = prayer.time.split(':').map(Number);
            const prayerTime = new Date();
            prayerTime.setHours(hours, minutes, 0, 0);
            const diff = prayerTime - now;

            if (diff > 0 && diff < minDiff) {
                minDiff = diff;
                nextPrayer = prayer;
            }
        });

        if (nextPrayer) {
            const hours = Math.floor(minDiff / (1000 * 60 * 60));
            const minutes = Math.floor((minDiff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((minDiff % (1000 * 60)) / 1000);
            document.getElementById('countdown').innerText = `Next prayer: ${nextPrayer.name} in ${hours}h ${minutes}m ${seconds}s`;
        } else {
            document.getElementById('countdown').innerText = 'No more prayers for today';
        }
    }

    // Call the function to fetch prayer times
    fetchPrayerTimes();
    setInterval(updateCurrentTime, 1000); // Update current time every second
});