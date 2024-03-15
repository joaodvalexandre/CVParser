import { Routes } from '@angular/router';
import { CVJoaoComponent } from './cvjoao/cvjoao.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PortfolioComponent } from './cvjoao/portfolio/portfolio.component';
import { AboutComponent } from './cvjoao/about/about.component';
import { ContactsComponent } from './cvjoao/contacts/contacts.component';

export const routes: Routes = [
    { 
        path: 'home', 
        component: CVJoaoComponent,
        title: 'João Alexandre - Home',
        data: {animation: 'home'}
    },
    {
        path: 'portfolio',
        component: PortfolioComponent,
        title: 'João Alexandre - Portfolio',
        data: {animation: 'portfolio'}
    },
    {
        path: 'contacts',
        component: ContactsComponent,
        title: 'João Alexandre - Contacts',
        data: {animation: 'contacts'}
    },
    {
        path: 'about',
        component: AboutComponent,
        title: 'João Alexandre - About',
        data: {animation: 'about'}
    },
    { path: '404', component: PageNotFoundComponent, title: "Error 404" },
    { path: '',   redirectTo: '/home', pathMatch: 'full' },
    { path: '**',   redirectTo: '/404', pathMatch: 'full' }
];