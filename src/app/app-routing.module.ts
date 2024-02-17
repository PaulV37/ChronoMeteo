import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActualiteComponent } from './actualite/actualite.component';
import { PrevisionComponent } from './prevision/prevision.component';
import { ComparaisonComponent } from './comparaison/comparaison.component';

const routes: Routes = [
  { path: '', component: ActualiteComponent},
  { path: 'prevision', component: PrevisionComponent},
  { path: 'comparaison', component: ComparaisonComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
