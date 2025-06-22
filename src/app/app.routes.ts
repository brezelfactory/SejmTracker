import { Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { VotingDetailsComponent } from '../pages/voting-details/voting-details.component';


export const homeRoute = `home`
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
        path: votingDetailsRoute,
        component: VotingDetailsComponent,
        title: 'Szczegóły głosowania',
    }
];