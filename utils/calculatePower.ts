import { Pokemon } from '../interfaces/pokemon'

export const calculatePower = (pokemon: Pokemon) => {
    return (
      pokemon.hp +
      pokemon.attack +
      pokemon.defense +
      pokemon.special_attack +
      pokemon.special_defense +
      pokemon.speed
    )
  }