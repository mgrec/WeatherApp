import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Geolocation} from '@ionic-native/geolocation';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {MapPage} from "../map/map";
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    constructor(public navCtrl: NavController, private geolocation: Geolocation, public http: Http, private nativePageTransitions: NativePageTransitions) {

    }

    getMyPostion() {
        let options: NativeTransitionOptions = {
            direction: 'down',
            duration: 500,
            slowdownfactor: 3,
            slidePixels: 500,
            iosdelay: 100,
            androiddelay: 150,
            fixedPixelsTop: 0,
            fixedPixelsBottom: 0
        };

        this.nativePageTransitions.slide(options);
        this.navCtrl.push(MapPage);
    }

}
