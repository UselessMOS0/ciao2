import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Coords } from './Coords.model';
import { Marker } from './Marker.model';
import { MapMarkerClusterer } from '@angular/google-maps';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'server mappe';
  //Aggiungiamo latitudine e longitudine di un luogo
  center : any;
  position : any;
  label :string;
  markers : Marker[] = []
  markerOptions: { icon: google.maps.Icon; };
  bottone :boolean = false
  constructor(public http : HttpClient)
  {
    this.center={lat:35.68051015980639,lng:139.69876694123647}
    this.position = this.center;
    this.label = "ciao";

    this.http.get<Coords[]>('https://5000-uselessmos0-ciao2-xhyw9h7enq0.ws-eu98.gitpod.io/all').subscribe(data => {
      for (let row of data) {
        let lat = row.lat
        let lng = row.lng
        let marker : Marker = new Marker(lat,lng)
        this.markers.push(marker)
      }
    })
    let iconData: google.maps.Icon = {
      url: 'assets/img/hole.png',
      scaledSize: new google.maps.Size(60, 60)
    }

    this.markerOptions = { icon: iconData }
  }
  click(){
    this.bottone = !this.bottone
  }
  pikachu(){
    this.http.get<Coords>('https://5000-uselessmos0-ciao2-xhyw9h7enq0.ws-eu98.gitpod.io/pikachu').subscribe(data => {
      console.log(data)
      let marker: Marker = new Marker(data.lat, data.lng);
      this.markers = [marker]
    })
    let iconData: google.maps.Icon = {
      url: 'assets/img/pikachu.png',
      scaledSize: new google.maps.Size(48, 48)
    }

    this.markerOptions = { icon: iconData }
  }
}
