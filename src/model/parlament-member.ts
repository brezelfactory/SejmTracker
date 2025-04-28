export interface ParlamentMember {
    firstName: string;
    lastName: string;
    club: string
    voted: 'YES' | 'NO' | 'ABSTAIN';
}
