import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Geolocation} from '@ionic-native/geolocation';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import {
    GoogleMaps,
    GoogleMap,
    GoogleMapsEvent,
    LatLng,
    CameraPosition,
    MarkerOptions,
    Marker
} from '@ionic-native/google-maps';
import {HomePage} from "../home/home";


@Component({
    selector: 'page-map',
    templateUrl: 'map.html'
})
export class MapPage {
    location: string;
    tempNow: string;
    tempMax: string;
    tempMin: string;
    humidity: string;
    icon: string;
    weather: string;
    animation: string;
    lat: number;
    long: number;
    style: string;

    constructor(public navCtrl: NavController, private geolocation: Geolocation, public http: Http, private nativePageTransitions: NativePageTransitions, private googleMaps: GoogleMaps) {
        this.geolocation.getCurrentPosition().then((resp) => {
            let lat = resp.coords.latitude;
            let long = resp.coords.longitude;

            this.location = null;
            this.lat = lat;
            this.long = long;

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

    // Load map only after view is initialized
    ngAfterViewInit() {
        this.loadMap();
    }

    loadMap() {
        // create a new map by passing HTMLElement
        let element: HTMLElement = document.getElementById('map');
        let optionsMap = {
            styles: [
                {
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#1d2c4d"
                        }
                    ]
                },
                {
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#8ec3b9"
                        }
                    ]
                },
                {
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "color": "#1a3646"
                        }
                    ]
                },
                {
                    "featureType": "administrative.country",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#4b6878"
                        }
                    ]
                },
                {
                    "featureType": "administrative.land_parcel",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#64779e"
                        }
                    ]
                },
                {
                    "featureType": "administrative.province",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#4b6878"
                        }
                    ]
                },
                {
                    "featureType": "landscape.man_made",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#334e87"
                        }
                    ]
                },
                {
                    "featureType": "landscape.natural",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#023e58"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#283d6a"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#6f9ba5"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "color": "#1d2c4d"
                        }
                    ]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#023e58"
                        }
                    ]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#3C7680"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#304a7d"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#98a5be"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "color": "#1d2c4d"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#2c6675"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#255763"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#b0d5ce"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "color": "#023e58"
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#98a5be"
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "color": "#1d2c4d"
                        }
                    ]
                },
                {
                    "featureType": "transit.line",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#283d6a"
                        }
                    ]
                },
                {
                    "featureType": "transit.station",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#3a4762"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#0e1626"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#4e6d70"
                        }
                    ]
                }
            ]
        }

        let map: GoogleMap = this.googleMaps.create(element, optionsMap);

        // listen to MAP_READY event
        // You must wait for this event to fire before adding something to the map or modifying it in anyway
        map.one(GoogleMapsEvent.MAP_READY).then(
            () => {
                console.log('Map is ready!');
                // create CameraPosition
                let position: CameraPosition = {
                    target: {
                        lat: this.lat,
                        lng: this.long
                    },
                    zoom: 15,
                    tilt: 30
                };

                // move the map's camera to position
                map.moveCamera(position);
            }
        );
    }

    getNewWeather(){
    }

    returnHome(){
        let options: NativeTransitionOptions = {
            direction: 'up',
            duration: 500,
            slowdownfactor: 3,
            slidePixels: 500,
            iosdelay: 100,
            androiddelay: 150,
            fixedPixelsTop: 0,
            fixedPixelsBottom: 0
        };

        this.nativePageTransitions.slide(options);
        this.navCtrl.push(HomePage);
    }

}
