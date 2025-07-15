import { ParlamentMember } from "./parlament-member";

export interface Voting {
  title: string;
  topic: string
  date: string;
  votingNumber: number;
  term: number;
  proceeding: number;
}

export interface VotingResults {
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

export function isVoting(input: any): input is Voting {
  return (
    typeof input === "object" &&
    input !== null &&
    typeof input.title === "string" &&
    typeof input.topic === "string" &&
    typeof input.date === "string" &&
    typeof input.votingNumber === "number" &&
    typeof input.totalVoted === "number" &&
    typeof input.yes === "number" &&
    typeof input.no === "number" &&
    typeof input.abstain === "number" &&
    typeof input.notParticipating === "number" &&
    Array.isArray(input.votes) // Ensures 'votes' is an array
  );
}


