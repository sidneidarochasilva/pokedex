/**
 * Este é o componente da página inicial (Home).
 */

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HomeService } from "./home.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('boxCenter', { static: true }) boxCenter!: ElementRef;
  listPokemons: any = [];
  page: number = 0;
  pokemonSearch: string = '';

  /**
   * Construtor
   *
   * @param {HomeService} _service - Serviço responsável pelas operações da página inicial
   * @param {Router} router - Objeto para navegação entre rotas
   */
  constructor(
    private _service: HomeService,
    public router: Router
  ) { }

  ngOnInit(): void {
    // Obtém a lista de Pokémons para a página inicial
    this.getListPokemons(0);
  }

  /**
   * Avança para a próxima lista de Pokémons
   *
   * @param {number} pageNumber 
   */
  nextPokemonList(pageNumber: number) {
    // Faz rolagem para o topo 
    this.boxCenter.nativeElement.scrollIntoView({ behavior: 'auto', block: 'start' });
    this.listPokemons = [];
    this.page = this.page + pageNumber;
    // Obtém a próxima lista de Pokémons
    this.getListPokemons(this.page);
  }

  /**
   * Retorna para a lista anterior de Pokémons
   *
   * @param {number} pageNumber 
   */
  previousListOfPokemons(pageNumber: number) {
    // Faz rolagem para o topo
    this.boxCenter.nativeElement.scrollIntoView({ behavior: 'auto', block: 'start' });
    this.listPokemons = [];
    if (this.page !== 0) {
      this.page = this.page - pageNumber;
    }
    // Obtém a lista anterior de Pokémons
    this.getListPokemons(this.page);
  }

  /**
   * Realiza uma busca por um Pokémon
   *
   * @param {string} text - Texto da busca
   */
  search(text: string) {
    this.listPokemons = [];
    // Obtém o Pokémon a partir do serviço
    this._service
      .getPokemon(text.toLowerCase())
      .subscribe((res: any): any => {
        this.listPokemons.push(res);
      });
  }

  /**
   * Obtém a lista de Pokémons com base na página
   *
   * @param {number} page - Número da página
   */
  getListPokemons(page: number) {
    // Obtém a lista de Pokémons a partir do serviço
    this._service
      .getPokemonList(page)
      .subscribe((res: any): any => {
        let response = res.results;
        response.forEach((pokemonDetails: any) => {
          // Obtém os detalhes de cada Pokémon na lista
          this._service
            .getPokemon(pokemonDetails.name)
            .subscribe((res: any): any => {
              // Adiciona o Pokémon na lista de Pokémons
              this.listPokemons.push(res);
              // Ordena a lista de Pokémons por ID
              this.listPokemons.sort((a: any, b: any) => a.id - b.id);
            });
        });
      });
  }
}