import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class LocationService {

  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(res => {
        const coords = [
          Math.floor(res.coords.latitude * 1000 + 0.5) / 1000,
          Math.floor(res.coords.longitude * 1000 + 0.5) / 1000
        ]
        resolve(coords);
      },
        err => reject(err))
    });
  }

}

