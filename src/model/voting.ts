import { ParlamentMember } from "./parlament-member";

export interface Voting {
    title: string;
    topic: string
    date: string;
    votingNumber: number;
    totalVoted: number;
    yes: number;
    no: number;
    abstain: number
    notParticipating: number;
    votes: ParlamentMember[];
}
