import { Routes } from '@angular/router';
import { VotingsComponent } from '../pages/votings/votings.component';
import { VotingDetailsComponent } from '../pages/voting-details/voting-details.component';
import { HomeComponent } from '../pages/home/home.component';
import { ParlamentMembersComponent } from '../pages/parlament-members/parlament-members.component';


export const homeRoute = `home`
export const votingsRoute = `votings`
export const parlamentMembersRoute = `parlament-members`
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
        path: parlamentMembersRoute,
        component: ParlamentMembersComponent,
        title: 'Posłowie',
    },
    {
        path: votingDetailsRoute,
        component: VotingDetailsComponent,
        title: 'Szczegóły głosowania',
    }
];