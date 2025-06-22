import { Routes } from '@angular/router';
import { VotingsComponent } from '../pages/votings/votings.component';
import { VotingDetailsComponent } from '../pages/voting-details/voting-details.component';


export const homeRoute = `home`
export const votingDetailsRoute = `details/:id`

export const routes: Routes = [
    {
        path: '',
        component: VotingsComponent,
        title: 'Stronga główna',
    },
    {
        path: homeRoute,
        component: VotingsComponent,
        title: 'Stronga główna',
    },
    {
        path: votingDetailsRoute,
        component: VotingDetailsComponent,
        title: 'Szczegóły głosowania',
    }
];