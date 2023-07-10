/**
 * Este é o serviço responsável por obter dados relacionados à página inicial.
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class HomeService {

  /**
   * Construtor
   *
   * @param {HttpClient} _httpClient - Cliente HTTP para fazer requisições
   */
  constructor(
    private _httpClient: HttpClient
  ) {}

  /**
   * Obtém a lista de Pokémons para exibição na página inicial
   *
   * @param {number} page - Número da página
   * @returns {Observable<any>} - Observável da lista de Pokémons
   */
  getPokemonList(page: number): Observable<any> {
    return this._httpClient.get(`https://pokeapi.co/api/v2/pokemon/?offset=${page}&limit=10`).pipe(
      tap((res) => {
        return res;
      })
    );
  }

  /**
   * Obtém os detalhes de um Pokémon pelo ID
   *
   * @param {string} id - ID do Pokémon
   * @returns {Observable<any>} - Observável dos detalhes do Pokémon
   */
  getPokemon(id: string): Observable<any> {
    return this._httpClient.get(`https://pokeapi.co/api/v2/pokemon/${id}/`).pipe(
      tap((res) => {
        return res;
      }),
      catchError(() => {
        return throwError([{ error: 'Nenhum Pokémon encontrado. Tente novamente.' }]);
      })
    );
  }
}