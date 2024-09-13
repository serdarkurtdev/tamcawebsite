const apiKey = 'AIzaSyDh1Q1ctMNTN4Z_QzL3JzEP5_W1AT947fg';
const spreadsheetId = '16hyDKSk3SGzvc9xWIvlKum1yjnIx64rm6fcDmBjJxOM';

function formatDate(date) {
const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, '0');
const day = String(date.getDate()).padStart(2, '0');
return `${year}-${month}-${day}`;
}

// Load the Sheets API client library
gapi.load('client', initClient);

function initClient() {
    gapi.client.init({
    apiKey: apiKey,
    discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
    }).then(() => {
    // Call the function to retrieve data
    getDataFromSheet();
    });
}

function getDataFromSheet() {
    // Replace with your sheet range
    const range = 'Sheet1!I:O';
    const todayDate = formatDate(new Date());

    // Make the API request
    gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: spreadsheetId,
    range: range,
    }).then((response) => {
    const values = response.result.values;

    if (values.length > 0) {

    const headers = values[0];
    // Find the column index for today's date
    const dateColumnIndex = values[0].indexOf('Date');

        if (dateColumnIndex !== -1) {
        const filteredData = values.filter(row => row[dateColumnIndex] === todayDate);

        console.log(filteredData);
        
        // Display the data in the HTML
        displayData(filteredData, headers);
        } else {
        console.error('Date column not found in the spreadsheet.');
        }
    } else {
        console.error('No data found in the spreadsheet.');
    }
    });
}

function createSpan(header, value, container, iconName, isNext = false) {
  const spanContainer = document.createElement('div');
  spanContainer.className = 'data-span';

  if (isNext) {
    spanContainer.classList.add('next-time'); // Add a class for styling the next time span
  }

  const spanHeader = document.createElement('span');
  spanHeader.textContent = header;
  spanContainer.appendChild(spanHeader);

  const iconContainer = document.createElement('span');
  iconContainer.className = 'icon-container';

  const ionIcon = document.createElement('ion-icon');
  ionIcon.name = iconName;
  iconContainer.appendChild(ionIcon);

  const spanValue = document.createElement('span');
  spanValue.textContent = value;

  // Append icon and value to the container
  spanContainer.appendChild(iconContainer);
  spanContainer.appendChild(spanValue);

  container.appendChild(spanContainer);
}

function displayData(data, headers) {
const dataContainer = document.getElementById('data-container');

if (data.length > 0) {


// Create the first row container
const firstRowContainer = document.createElement('div');
firstRowContainer.className = 'data-row';

createSpan('Sunrise', data[0][2], firstRowContainer, 'sunny-outline');
createDateTimeSpan(firstRowContainer);
createSpan('Sunset', data[0][5], firstRowContainer, 'moon-outline');

// Append the first row container to the main data container
dataContainer.appendChild(firstRowContainer);

// Create the second row container
const secondRowContainer = document.createElement('div');
secondRowContainer.className = 'data-row';

// Add spans for the 2nd to 7th columns to the second row
for (let i = 1; i <= 6; i++) {
    // Skip the second column in the second row
    if (i !== 2) {
    createSpan(headers[i], data[0][i], secondRowContainer);
    }
}

// Append the second row container to the main data container
dataContainer.appendChild(secondRowContainer);
} else {
console.error('No data found for today.');
}
}

function createDateTimeSpan(container) {
    const spanContainer = document.createElement('div');
    spanContainer.className = 'data-span datetime-container'; // Added 'datetime-container' class
  
    // Function to update the time span content
    function updateDateTime() {
      const currentDate = new Date();
  
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const formattedDate = currentDate.toLocaleDateString('en-US', options);
  
      const spanDate = document.createElement('span');
      spanDate.textContent = formattedDate;
  
      const spanTime = document.createElement('span');
      const currentTime = currentDate.toLocaleTimeString('en-US', { hour12: true });
      spanTime.textContent = `${currentTime}`;
  
      // Clear previous content and append the updated content
      spanContainer.innerHTML = '';
      spanContainer.appendChild(spanDate);
      spanContainer.appendChild(document.createElement('br')); // Add a line break
      spanContainer.appendChild(spanTime);
    }
  
    // Update the time content every second (1000 milliseconds)
    setInterval(updateDateTime, 1000);
  
    // Initial call to display the content immediately
    updateDateTime();
  
    container.appendChild(spanContainer);
}

function refreshAndFullScreenAt(hours, minutes, seconds) {
  var now = new Date();
  var then = new Date();

  if(now.getHours() > hours ||
     (now.getHours() == hours && now.getMinutes() > minutes) ||
      now.getHours() == hours && now.getMinutes() == minutes && now.getSeconds() >= seconds) {
      then.setDate(now.getDate() + 1);
  }
  then.setHours(hours);
  then.setMinutes(minutes);
  then.setSeconds(seconds);

  var timeout = (then.getTime() - now.getTime());
  setTimeout(function() { 
      window.location.reload(true); 
      // Add the following line to go back into full screen
      if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
          document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
          document.documentElement.msRequestFullscreen();
      }
  }, timeout);
}

refreshAndFullScreenAt(0, 5, 0); // Will refresh the page at 12:05am and go back into full screen
