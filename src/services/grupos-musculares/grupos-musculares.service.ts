import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GruposMuscularesService {

  
  constructor(private http: HttpClient) { }

  obtenerGruposMusculares(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/grupos-musculares/`);
  }
  obtenerDetalleGruposMuscular(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/grupos-musculares/${id}`);
  }
  obtenerVideosGM(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/grupos-musculares/${id}/video`);
  }
  VideosGMDetalle(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/grupos-musculares/video/${id}`);
  }
}
