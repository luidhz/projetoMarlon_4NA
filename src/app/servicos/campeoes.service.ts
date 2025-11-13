import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CampeoesService {
  private apiUrl = 'https://ddragon.leagueoflegends.com/cdn/13.24.1/data/pt_BR/champion.json';
  private championDetailUrl = 'https://ddragon.leagueoflegends.com/cdn/13.24.1/data/pt_BR/champion/';

  constructor(private http: HttpClient) { }

  obterTodosCampeoes(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  obterDetalheCampeao(nomeCampeao: string): Observable<any> {
    return this.http.get(`${this.championDetailUrl}${nomeCampeao}.json`);
  }
}