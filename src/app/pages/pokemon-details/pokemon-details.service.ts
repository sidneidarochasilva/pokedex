/**
 * Este service é responsável por obter os detalhes de um Pokémon.
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PokemonDetailsService {

  /**
   * Construtor
   *
   * @param {HttpClient} _httpClient - Client HTTP para fazer requisições
   */
  constructor(
    private _httpClient: HttpClient
  ) {}

  /**
   * Obtém os detalhes de um Pokémon pelo ID
   *
   * @param {string | null} id - ID do Pokémon
   * @returns {Observable<any>} - Observável dos detalhes do Pokémon
   */
  getPokemonById(id: string | null): Observable<any> {
    return this._httpClient.get(`https://pokeapi.co/api/v2/pokemon/${id}/`).pipe(
      tap((res) => {
        return res;
      })
    );
  }

  /**
   * Obtém a descrição de um Pokémon pelo ID
   *
   * @param {string} id - ID do Pokémon
   * @returns {Observable<any>} - Observável da descrição do Pokémon
   */
  getDescription(id: string): Observable<any> {
    return this._httpClient.get(`https://pokeapi.co/api/v2/pokemon-species/${id}/`).pipe(
      tap((res) => {
        return res;
      })
    );
  }
}
