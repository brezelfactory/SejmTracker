import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TermService {

  constructor(private httpClient: HttpClient) { }

  private baseUrl = 'https://api.sejm.gov.pl/sejm/term';

  getTerms(): Observable<number[]> {

    return this.httpClient.get<TermHttpResponse[]>(`${this.baseUrl}`).
      pipe(map(response => response.map(term => term.num)
        .sort((a, b) => b - a)));
  }
}

interface TermHttpResponse {
  current: boolean;
  from: string;
  num: number;
  to: string;
}

