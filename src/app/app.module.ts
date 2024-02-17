import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PrevisionComponent } from './prevision/prevision.component';
import { ActualiteComponent } from './actualite/actualite.component';
import { ComparaisonComponent } from './comparaison/comparaison.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PrevisionComponent,
    ActualiteComponent,
    ComparaisonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
