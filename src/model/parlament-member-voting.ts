export interface ParlamentMemberVoting {
    firstName: string;
    lastName: string;
    club: string
    voted: 'YES' | 'NO' | 'ABSTAIN';
}
