import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParlamentMembersService {

  constructor(private httpClient: HttpClient) { }

  private baseUrl = 'https://api.sejm.gov.pl/sejm/term';

  getMembers(term: number): Observable<MemberHttpResponse[]> {
    return this.httpClient.get<MemberHttpResponse[]>(`${this.baseUrl}${term}/MP`).pipe(map(members => members.map(member => ({
      id: member.id,
      active: member.active,
      firstName: member.firstName,
      secondName: member.secondName,
      lastName: member.lastName,
      birthDate: member.birthDate,
      birthLocation: member.birthLocation,
      club: member.club,
      districtName: member.districtName,
      educationLevel: member.educationLevel,
      email: member.email,
      numberOfVotes: member.numberOfVotes,
      profession: member.profession,
      voivodeship: member.voivodeship,
    })).sort((a, b) => a.lastName.localeCompare(b.lastName))));
  }

}

export interface MemberHttpResponse {
  id: number;
  active: boolean;
  firstName: string;
  secondName: string;
  lastName: string;
  birthDate: string;
  birthLocation: string;
  club: string;
  districtName: string;
  educationLevel: string;
  email: string;
  numberOfVotes: number;
  profession: string;
  voivodeship: string;
}
