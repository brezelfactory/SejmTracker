import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Voting } from '../model/voting';
import { ParlamentMember } from '../model/parlament-member';

@Injectable({
  providedIn: 'root'
})
export class VotingService {

  constructor(private httpClient: HttpClient) { }
  private baseUrl = 'https://api.sejm.gov.pl'; // Base URL for SejmApi

  getVotings(term: number, proceeding: number): Observable<Array<Voting>> {
    //https://api.sejm.gov.pl/sejm/term10/votings/2
    var response = this.httpClient.get(`${this.baseUrl}/sejm/term${term}/votings/${proceeding}`)
      .pipe(response => response as Observable<Array<Voting>>);

    console.log(response);
    return response;
  }


  //todo: get rid of `any` and create a proper interface for the response
  getVoting(term: number, proceeding: number, sitting: number): Observable<Voting> {
    //https://api.sejm.gov.pl/sejm/term10/votings/2/1
    return this.httpClient.get<any>(`${this.baseUrl}/sejm/term${term}/votings/${proceeding}/${sitting}`)
      .pipe(map(response => ({
        title: response.title,
        description: response.description,
        date: response.date,
        yes: response.yes,
        no: response.no,
        abstain: response.abstain,
        notParticipating: response.notParticipating,  
        totalVoted: response.totalVoted,
        votes: response.votes.map((vote: any) => ({
          first_name: vote.first_name,
          last_name: vote.last_name,
          club: vote.club,
          voted: vote.voted
        } as ParlamentMember))
      })));
  }
}
