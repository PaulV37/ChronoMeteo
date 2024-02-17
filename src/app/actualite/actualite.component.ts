import { Component } from '@angular/core';
import { ApiService } from '../data/weather';

@Component({
  selector: 'app-actualite',
  templateUrl: './actualite.component.html',
  styleUrl: './actualite.component.css'
})
export class ActualiteComponent{
  weatherData: any;    // Var de l'api
  weatherTemp: any;    // Temperature
  weatherPress: any;   // Pression
  weatherHumi: any;    // Humidite
  weatherVent: any;    // Vent
  weatherDirVent: any; // Direction vent
  weatherDirVentStr: any; // Direction vent
  weatherSky: any;     // Type de ciel
  weatherPlace: any;   // lieu
  dateTimeNow: any;    // Date actuelle
  dateTimeMO: any;     // Date moins 1 jour
  
  stationTours = '07240';

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.dateTimeNow = new Date();
    this.dateTimeMO = new Date(this.dateTimeNow);
    this.dateTimeMO.setDate(this.dateTimeMO.getDate() - 1)

    this.api.get('?method=get&format=json&stations[]=' + this.stationTours + '&start=' + this.dateTimeMO.toJSON().substring(0,10) + '&end=' + this.dateTimeNow.toJSON().substring(0,10) + '&token=').subscribe(res => {
      this.weatherData = res;
      this.weatherPlace = this.weatherData.stations[0].name

      // Retourne les éléments de la météo actuelle pour la station choisie (Tempérture, vent, humidite + bg)
      const nouveauTimestamp = this.dateTimeNow.getTime() - (4 * 60 * 60 * 1000)
      const keys = Object.keys(this.weatherData.hourly);
      keys.forEach(key => {
        this.weatherData.hourly[key].forEach((station: { id_station: any; dh_utc: any; temperature: any; pression: any; humidite: any; vent_moyen: any;  vent_direction: any}) => {
          if (station.dh_utc != undefined){
            if (new Date(station.dh_utc) >= new Date(nouveauTimestamp)){
              this.weatherTemp = station.temperature + "°";
              this.weatherPress = station.pression;
              this.weatherHumi = station.humidite + "%";
              this.weatherVent = station.vent_moyen;
              this.weatherDirVent = station.vent_direction;
              if (this.weatherDirVent <= 22.5 || this.weatherDirVent > 337.5){
                this.weatherDirVentStr = 'Nord';
              }
              else if (this.weatherDirVent > 22.5 && this.weatherDirVent <= 67.5){
                this.weatherDirVentStr = 'Nord-Est';
              }
              else if (this.weatherDirVent > 67.5 && this.weatherDirVent <= 112.5){
                this.weatherDirVentStr = 'Est';
              }
              else if (this.weatherDirVent > 122.5 && this.weatherDirVent <= 157.5){
                this.weatherDirVentStr = 'Sud-Est';
              }
              else if (this.weatherDirVent > 157.5 && this.weatherDirVent <= 202.5){
                this.weatherDirVentStr = 'Sud';
              }
              else if (this.weatherDirVent > 202.5 && this.weatherDirVent <= 247.5){
                this.weatherDirVentStr = 'Sud-Ouest';
              }
              else if (this.weatherDirVent > 247.5 && this.weatherDirVent <= 292.5){
                this.weatherDirVentStr = 'Ouest';
              }
              else if (this.weatherDirVent > 292.5 && this.weatherDirVent <= 337.5){
                this.weatherDirVentStr = 'Nord-Ouest';
              }
              else {
                this.weatherDirVentStr = 'None';
              }
              this.weatherSky = station.pression;
            } 
          }
        });
      });
      this.dateTimeNow = this.dateTimeNow.toLocaleDateString('fr-FR') + ' ' + this.dateTimeNow.getHours() + ':' + this.dateTimeNow.getMinutes()
    });
  }
  secondMethod() { this.ngOnInit(); console.log('done')}
}