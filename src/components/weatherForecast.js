import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class WeatherWidget extends LitElement {
  static properties = {
    latitude: { type: Number },
    longitude: { type: Number },
    weatherData: { type: Object },
  };

  static styles = css`
    :host {
      display: block;
      width: 250px;
      height: 250px;
      background-color: azure;
      padding: 16px;
      box-sizing: border-box;
    }

    h3 {
      margin: 0;
      font-size: 18px;
      font-weight: bold;
    }

    p {
      margin: 8px 0;
    }
  `;

  constructor() {
    super();
    this.latitude = null;
    this.longitude = null;
    this.weatherData = null;
  }

  connectedCallback() {//ensures when widget is connected, it starts getting the locationdata
    super.connectedCallback();
    this.getCurrentLocation();
  }

  getCurrentLocation() {//uses the geolocation API to get location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.fetchWeatherData();
        },
        (error) => {
          // console.error(error);
          // Handle error
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      // Handle error
    }
  }

  fetchWeatherData() {//uses the 
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${this.latitude}&longitude=${this.longitude}&daily=precipitation_sum&hourly=temperature_2m&current_weather=true&forecast_days=1&timezone=Australia%2FSydney`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.weatherData = data;
      })
      .catch((error) => {
        console.error(error);
        // Handle error
      });
  }

  render() {

    const weatherCodeStrings = {//stores the discription, used with weathercode
      '0': 'Clear sky',
      '1': 'Mainly clear',
      '2': 'Partly cloudy',
      '3': 'Overcast',
      '45': 'Fog',
      '48': 'Depositing Rime Fog',
      '51': 'Light Drizzle',
      '53': 'Moderate Drizzle: ',
      '55': 'Dense Drizzle',
      '56': 'Light Freezing Drizzle',
      '57': 'Dense Freezing Drizzle',
      '61': 'Slight Rain',
      '63': 'Moderate Rain',
      '65': 'Heavy Rain',
      '66': 'Light Freezling Rain',
      '67': 'Heavy Freezling Rain',
      '71': 'Slight Snowfall',
      '73': 'Moderate Snowfall',
      '75': 'Heavy Snowfall',
      '77': 'Snow Grains',
      '80': 'Slight Rain Showers',
      '81': 'Moderate Rain Showers',
      '82': 'Violent Rain Showers',
      '85': 'Slight Snow Showers',
      '86': 'Heavy Snow Showers',
      '95': 'Slight or moderate Thunderstorm',
      '96': 'Thunderstorm with Slight Hail',
      '99': 'Thunderstorm with Heavy Hail',
    };
  
    const weatherCode = this.weatherData?.current_weather?.weathercode;
    const weatherString = weatherCodeStrings[weatherCode] || 'Unknown';
  
    return html`
        ${this.weatherData ? html`
          <h3>Current Temperature</h3>
          <p>${this.weatherData.current_weather.temperature}°C</p>
  
          <h3>Preciptiation</h3>
          <p>${this.weatherData.daily.precipitation_sum}mm</p>

          <!--<h3>WeatherCode</h3>
          <p>${this.weatherData.current_weather.weathercode}</p>! -->

          <h3>Weather Description</h3>
          <p>${weatherString}</p>
          ` : html`
          <p>Loading weather data...</p>
        `}
    `;//WeatherCode is unused atm, testing the weather disc
  }
}

customElements.define('weather-widget', WeatherWidget);