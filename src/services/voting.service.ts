import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Voting, VotingResults } from '../model/voting';
import { ParlamentMember } from '../model/parlament-member';

@Injectable({
  providedIn: 'root'
})
export class VotingService {

  constructor(private httpClient: HttpClient) { }
  private baseUrl = 'https://api.sejm.gov.pl';

  getVotings(term: number, proceeding: number): Observable<Voting[]> {
    //https://api.sejm.gov.pl/sejm/term10/votings/2
    return this.httpClient.get<VotingsHttpResponse[]>(`${this.baseUrl}/sejm/term${term}/votings/${proceeding}`)
      .pipe(map(votings => votings.map(response => ({
        title: response.title,
        topic: response.topic,
        date: response.date,
        votingNumber: response.votingNumber,
        term: term,
        proceeding: proceeding,
      })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())));
  }

  getVotingResults(term: number, proceeding: number, votingNumber: number): Observable<VotingResults> {

    //https://api.sejm.gov.pl/sejm/term10/votings/2/1
    console.log(`${this.baseUrl}/sejm/term${term}/votings/${proceeding}/${votingNumber}`);
    return this.httpClient.get<VotingsHttpResponse>(`${this.baseUrl}/sejm/term${term}/votings/${proceeding}/${votingNumber}`)
      .pipe(map(response => ({
        title: response.title,
        topic: response.topic,
        date: response.date,
        votingNumber: response.votingNumber,
        totalVoted: response.totalVoted,
        yes: response.yes,
        no: response.no,
        abstain: response.abstain,
        notParticipating: response.notParticipating,
        votes: (response.votes ?? []).map((vote: VoteHttpResponse) => ({
          firstName: vote.firstName,
          lastName: vote.lastName,
          club: vote.club,
          voted: vote.vote,
        } as ParlamentMember))
      })));
  }
}

interface VotingsHttpResponse {
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


