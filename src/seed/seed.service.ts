import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios, { AxiosInstance } from 'axios';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { PokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;

  constructor(
    @InjectModel(Pokemon.name) private readonly pokemonMode: Model<Pokemon>,
    private readonly pokemonService: PokemonService,
  ) {}

  async executeSeed() {
    const { data } = await this.axios.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=151',
    );

    const promises = data.results.map(async ({ name, url }) => {
      const segments = url.split('/');
      const no: number = +segments[segments.length - 2];

      await this.pokemonService.create({ name, no });
    });

    await Promise.all(promises);

    return data.results;
  }
}
