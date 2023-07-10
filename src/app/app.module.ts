import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardPokemonComponent } from './components/card-pokemon/card-pokemon.component';
import { HomeComponent } from './pages/home/home.component';
import { HomeService } from './pages/home/home.service';
import { HttpClientModule } from '@angular/common/http';
import { PokemonDetailsComponent } from './pages/pokemon-details/pokemon-details.component';
import { PokemonDetailsService } from './pages/pokemon-details/pokemon-details.service';
import { CapitalizeFirstLetterPipe } from './pipes/capitalize-first-letter.pipe';
;

@NgModule({
  declarations: [
    AppComponent,
    CardPokemonComponent,
    HomeComponent,
    PokemonDetailsComponent,
    CapitalizeFirstLetterPipe 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
    
  ],
  providers: [
    HomeService,
    PokemonDetailsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
