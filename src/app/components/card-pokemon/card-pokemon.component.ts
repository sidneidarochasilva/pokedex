/**
 * Este é o componente de Card  Pokémon.
 */

import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-pokemon',
  templateUrl: './card-pokemon.component.html',
  styleUrls: ['./card-pokemon.component.css']
})
export class CardPokemonComponent implements OnInit {
  @Input() listPokemon: any;

  constructor(
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  /**
   * Redireciona para os detalhes do Pokémon
   *
   * @param {string} id - ID do Pokémon
   */
  redirectToPokemonDetails(id: string): void {
    this.router.navigate([`/pokemonDetails/${id}`]);
  }
}