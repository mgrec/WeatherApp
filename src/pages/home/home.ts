import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private geolocation: Geolocation, public http: Http) {

  }

  getMyPostion(){
    this.geolocation.getCurrentPosition().then((resp) => {
      let lat = resp.coords.latitude;
      let long = resp.coords.longitude;

      this.http.get("http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+ long + "&APPID=fa0226a5cf9241a017b02bc886fe9765&units=metric").map(res => res.json()).subscribe(data => {
        console.log(data);
      });

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

}
