import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hourly, WeatherData } from 'src/app/shared/models/weather-data.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  currentWeather: Observable<Hourly> | undefined;

  constructor(private http: HttpClient) {
    this.getWeather();

    // Update every hour
    setInterval(this.getWeather, 3600000);
  }

  private getWeather() {
    const excludeParts = 'current,minutely,daily,alerts';
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=48.805563&lon=9.213399&exclude=${excludeParts}&appid=${environment.openWeatherApiKey}&units=metric`;

    this.http.get<WeatherData>(url).subscribe((data) => {
      console.log(data);

      const unixTime = Math.round(new Date().getTime() / 1000);

      console.log(unixTime);

      this.currentWeather = of(
        data.hourly.reduce(function (prev, curr) {
          return Math.abs(curr.dt - unixTime) < Math.abs(prev.dt - unixTime)
            ? curr
            : prev;
        })
      );
    });
  }
}
