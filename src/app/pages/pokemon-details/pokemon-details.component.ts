/**
 * Este componente exibe os detalhes de um Pokémon.
 */

import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonDetailsService } from './pokemon-details.service';

// Interface para representar o tipo de um Pokémon
interface PokemonType {
  type: string;
  color: string;
}

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css']
})
export class PokemonDetailsComponent implements OnInit {

  pokemonId: any;
  pokemonDetails: any;
  description: any;
  bars = [
    { name: 'Vida', value: 80, color: '#C4F789' },
    { name: 'Defesa', value: 60, color: '#F7802A' },
    { name: 'Velocidade', value: 40, color: '#49D0B0' },
    { name: 'Ataque', value: 20, color: '#EA686D' }
  ];

  typePokemon: PokemonType[] = [];

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private pokemonService: PokemonDetailsService
  ) { }

  ngOnInit(): void {
    // Obtém o ID do Pokémon da rota atual
    this.route.params.subscribe((data: any) => {
      this.pokemonId = data.id;
    });

    // Obtém os detalhes do Pokémon a partir do service
    this.pokemonService.getPokemonById(this.pokemonId).subscribe((data: any) => {

      // Obtém a descrição do Pokémon a partir do service
      this.pokemonService.getDescription(this.pokemonId).subscribe((data: any) => {

        // Armazena a descrição
        this.description = data?.flavor_text_entries[1].flavor_text;
      });

    
      this.getValueChart(data);
      this.getType(data);

      // Armazena os detalhes do Pokémon
      this.pokemonDetails = data;
    });
  }

  // Redireciona para a página inicial
  redirectHome() {
    this.router.navigate(['/']);
  }

  // Atualiza os valores das barras de estatísticas do Pokémon
  getValueChart(data: any) {
    data.stats.forEach((bar: any) => {
      switch (bar.stat.name) {
        case 'hp':
          this.bars[0].value = bar.base_stat;
          break;
        case 'defense':
          this.bars[1].value = bar.base_stat;
          break;
        case 'speed':
          this.bars[2].value = bar.base_stat;
          break;
        case 'attack':
          this.bars[3].value = bar.base_stat;
          break;
      }
    });
  }

  // Obtém e armazena os tipos do Pokémon
  getType(data: any) {
    const typeMapping: { [key: string]: PokemonType } = {
      bug: { type: 'Inseto', color: '#29f430' },
      fire: { type: 'Fogo', color: '#F7802A' },
      water: { type: 'Água', color: '#49e1ff' },
      grass: { type: 'Grama', color: '#259c29' },
      flying: { type: 'Voador', color: '#604d24' },
      fighting: { type: 'Lutador', color: '#747860' },
      poison: { type: 'Venenoso', color: '#9b0ca8' },
      electric: { type: 'Elétrico', color: '#f7e244' },
    };

    data.types.forEach((type: any) => {
      const typeName = type.type.name;
      const pokemonType = typeMapping[typeName] || { type: 'Normal', color: '#8f8749' };
      this.typePokemon.push(pokemonType);
    });
  }
}