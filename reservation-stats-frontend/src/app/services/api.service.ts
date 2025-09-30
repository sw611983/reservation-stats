import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Restaurant, StatsResponse } from '../models/reservation.models';

@Injectable({ providedIn: 'root' })
export class ApiService {
  base = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(`${this.base}/restaurants`);
  }

  getStats(restaurantId: number, from: string, to: string): Observable<StatsResponse> {
    const params = new HttpParams()
      .set('restaurantId', String(restaurantId))
      .set('from', from)
      .set('to', to);

    return this.http.get<StatsResponse>(`${this.base}/stats`, { params });
  }
}
