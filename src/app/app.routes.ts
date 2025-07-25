import {Routes} from '@angular/router';

export const routes: Routes = [{
  path: '', loadComponent: () => import('./features/front-page/pages/front-page/front-page.component'),
},];
