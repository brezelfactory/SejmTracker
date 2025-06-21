import { Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { VotingDetailsComponent } from '../pages/voting-details/voting-details.component';


export const homeRoute = `home`
export const detailsRoute = `details`

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
        path: detailsRoute,
        component: VotingDetailsComponent,
        title: 'Szczegóły głosowania',
    }
];