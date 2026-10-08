const currentYear = new Date().getFullYear();
document.getElementById('currentyear').textContent = currentYear;
document.getElementById('lastModified').textContent = "Last Modification: " + document.lastModified;

const tempSpan = document.getElementById('temperature');
const windSpan = document.getElementById('windspeed');
const windChillSpan = document.getElementById('windchill');

const temp = parseFloat(tempSpan.textContent);
const windSpeed = parseFloat(windSpan.textContent);

function calculateWindChill(t, v) {
    return (13.12 + 0.6215 * t - 11.37 * Math.pow(v, 0.16) + 0.3965 * t * Math.pow(v, 0.16)).toFixed(1) + " °C";
}

if (temp <= 10 && windSpeed > 4.8) {
    windChillSpan.textContent = calculateWindChill(temp, windSpeed);
} else {
    windChillSpan.textContent = "N/A";
}
