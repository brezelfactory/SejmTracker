import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TermService {

  constructor(private httpClient: HttpClient) { }

  private baseUrl = 'https://api.sejm.gov.pl/sejm/term';

  getAllTerms(): Observable<number[]> {

    return this.httpClient.get<TermHttpResponse[]>(`${this.baseUrl}`).
      pipe(map(terms => terms.map(term => term.num)));
  }
}

interface TermHttpResponse {
  current: boolean;
  from: string;
  num: number;
  to: string;
}

