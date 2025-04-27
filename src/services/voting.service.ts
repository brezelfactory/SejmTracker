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


  getVoting(term: number, proceeding: number, sitting: number): Observable<Voting> {
    //https://api.sejm.gov.pl/sejm/term10/votings/2/1
    return this.httpClient.get<VotingHttpResponse>(`${this.baseUrl}/sejm/term${term}/votings/${proceeding}/${sitting}`)
      .pipe(map(response => ({
        title: response.title,
        topic: response.topic,
        date: response.date,
        totalVoted: response.totalVoted,
        yes: response.yes,
        no: response.no,
        abstain: response.abstain,
        notParticipating: response.notParticipating,
        votes: (response.votes ?? []).map((vote: VoteHttpResponse) => ({
          first_name: vote.firstName,
          last_name: vote.lastName,
          club: vote.club,
          voted: vote.vote,        } as ParlamentMember))
      })));
  }
}

interface VotingHttpResponse {
  abstain: number;
  date: string;
  kind: 'ELECTRONIC' | 'TRADITIONAL' | 'ON_LIST';
  links: LinkHttpResponse[];
  majorityType: 'SIMPLE_MAJORITY' | 'ABSOLUTE_MAJORITY' | 'QUALIFIED_MAJORITY';
  majorityVotes: number;
  no: number;
  notParticipating: number;
  present: number;
  sitting: number;
  sittingDay: number;
  term: number;
  title: string;
  topic: string;
  totalVoted: number;
  votes: VoteHttpResponse[];
  votingNumber: number;
  yes: number;
}

interface LinkHttpResponse {
  href: string;
  rel: string;
}

interface VoteHttpResponse {
  MP: number;
  club: string;
  firstName: string;
  lastName: string;
  secondName?: string;
  vote: 'YES' | 'NO' | 'ABSTAIN' | 'VOTE_VALID';
}


