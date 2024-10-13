import { filterPokemon } from '../../utils/filterPokemon';
import { Pokemon } from '../../interfaces/pokemon';

describe('filterPokemon', () => {
  const testPokemons: Pokemon[] = [
    { id: 1, name: 'Bulbasaur', power: 318, type: ['Grass', 'Poison'], hp: 45, attack: 49, defense: 49, special_attack: 65, special_defense: 65, speed: 45 },
    { id: 2, name: 'Charmander', power: 309, type: ['Fire'], hp: 39, attack: 52, defense: 43, special_attack: 60, special_defense: 50, speed: 65 },
    { id: 3, name: 'Squirtle', power: 314, type: ['Water'], hp: 44, attack: 48, defense: 65, special_attack: 50, special_defense: 64, speed: 43 },
    { id: 4, name: 'Mewtwo', power: 680, type: ['Psychic'], hp: 106, attack: 110, defense: 90, special_attack: 154, special_defense: 90, speed: 130 },
  ];

  it('should filters correctly by name', () => {
    const result = filterPokemon(testPokemons, 'mew', '');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Mewtwo');
  });

  it('should filters correctly by power', () => {
    const result = filterPokemon(testPokemons, '', '310');
    expect(result).toHaveLength(3);
    expect(result.map(p => p.name)).toEqual(['Bulbasaur', 'Squirtle', 'Mewtwo']);
  });

  it('should returns all matching Pokemon by name when both name and power are specified', () => {
    const result = filterPokemon(testPokemons, 'char', '100');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Charmander');
  });

  it('should applies both filters when only name is specified', () => {
    const result = filterPokemon(testPokemons, 'tle', '');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Squirtle');
  });

  it('should returns all Pokemon when no filters are applied', () => {
    const result = filterPokemon(testPokemons, '', '');
    expect(result).toHaveLength(4);
  });
});