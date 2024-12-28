// app.js
// Personal API Key for OpenWeatherMap API
const key = process.env.WEATHER_API_KEY;
const apiKey = `${key}&units=imperial`;
const baseURL = "https://api.openweathermap.org/data/2.5/weather";

// Event listener for the generate button
document.getElementById("generate").addEventListener("click", async () => {
  const zipCode = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;
  const date = new Date().toLocaleDateString();

  try {
    // Get weather data
    const weatherData = await getWeatherData(zipCode);

    // Post data to our server
    await postData("/add", {
      temperature: weatherData.main.temp,
      date: date,
      userResponse: feelings,
    });

    // Update UI
    await updateUI();
  } catch (error) {
    console.error("Error:", error);
  }
});

// Get weather data from OpenWeatherMap API
const getWeatherData = async (zip) => {
  try {
    const response = await fetch(`${baseURL}?zip=${zip},us&appid=${apiKey}`);
    if (!response.ok) {
      throw new Error("Weather data not found");
    }
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

// POST data to our server
const postData = async (url = "", data = {}) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

// Update UI with the latest entry
const updateUI = async () => {
  try {
    const response = await fetch("/all");
    const data = await response.json();

    document.getElementById("date").innerHTML = `Date: ${data.date}`;
    document.getElementById("temp").innerHTML = `Temperature: ${Math.round(
      data.temperature
    )}°F`;
    document.getElementById(
      "content"
    ).innerHTML = `Feeling: ${data.userResponse}`;
  } catch (error) {
    console.error("Error:", error);
  }
};
