import { ParlamentMember } from "./parlament-member";

export interface Voting {
    title: string;
    description: string;
    date: string;
    yes: number;
    no: number;
    abstain: number
    notParticipating: number;
    totalVoted: number;
    votes: ParlamentMember[];

}
