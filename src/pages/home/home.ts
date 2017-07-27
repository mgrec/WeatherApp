import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Geolocation} from '@ionic-native/geolocation';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    location: string;
    tempNow: string;
    tempMax: string;
    tempMin: string;
    humidity: string;
    icon: string;
    weather: string;
    animation: string;

    constructor(public navCtrl: NavController, private geolocation: Geolocation, public http: Http) {

    }

    getMyPostion() {
        this.geolocation.getCurrentPosition().then((resp) => {
            let lat = resp.coords.latitude;
            let long = resp.coords.longitude;

            this.http.get("http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&APPID=fa0226a5cf9241a017b02bc886fe9765&units=metric").map(res => res.json()).subscribe(data => {
                console.log(data);

                // put result(s) in var
                this.location = data.name;
                this.tempNow = data.main.temp + '°';
                this.tempMax = data.main.temp_max + '°';
                this.tempMin = data.main.temp_min + '°';
                this.humidity = data.main.humidity + '%';
                this.weather = data.weather[0].description;
                this.icon = 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png';
            });

        }).catch((error) => {
            console.log('Error getting location', error);
        });
    }

}
