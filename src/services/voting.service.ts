import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VotingService {

  constructor(private httpClient: HttpClient) { }
  private baseUrl = 'https://api.sejm.gov.pl'; // Base URL for SejmApi


  getVotings(term: number, proceeding: number): Observable<any> {
    //https://api.sejm.gov.pl/sejm/term10/votings/2
    return this.httpClient.get(`${this.baseUrl}/sejm/term${term}/votings/${proceeding}`);
  }
}
