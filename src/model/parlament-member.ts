export interface ParlamentMember {
    first_name: string;
    last_name: string;
    club: string
    voted: 'YES' | 'NO' | 'ABSTAIN';
}
