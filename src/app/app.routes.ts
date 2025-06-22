import { Routes } from '@angular/router';
import { VotingsComponent } from '../pages/votings/votings.component';
import { VotingDetailsComponent } from '../pages/voting-details/voting-details.component';
import { HomeComponent } from '../pages/home/home.component';


export const homeRoute = `home`
export const votingsRoute = `votings`
export const votingDetailsRoute = `details/:id`

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Stronga główna',
    },
    {
        path: homeRoute,
        component: HomeComponent,
        title: 'Stronga główna',
    },
    {
        path: votingsRoute,
        component: VotingsComponent,
        title: 'Głosowania',
    },
    {
        path: votingDetailsRoute,
        component: VotingDetailsComponent,
        title: 'Szczegóły głosowania',
    }
];