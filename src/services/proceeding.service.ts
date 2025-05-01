import { Injectable } from '@angular/core';
import { Proceeding } from '../model/proceeding';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProceedingService {

  constructor(private httpClient: HttpClient) { }
  private baseUrl = 'https://api.sejm.gov.pl/sejm/term';

  getAllProceedings(term: number): Observable<Proceeding[]> {

    return this.httpClient.get<ProceedingHttpResponse[]>(`${this.baseUrl}${term}/proceedings`).
      pipe(map(terms => terms
        .map(term => ({ number: term.number, title: term.title } as Proceeding))
        .sort((a, b) => a.number - b.number)));
  }
}

interface ProceedingHttpResponse {
  agenda: string;
  current: boolean,
  dates: string[];
  number: number,
  title: string
}

