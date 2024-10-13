import { Pokemon } from "../interfaces/pokemon";

export const mockPokemons: Pokemon[] = [
  {
    id: 1,
    name: "Bulbasaur",
    type: ["Grass, Poison"],
    hp: 45,
    attack: 49,
    defense: 49,
    special_attack: 65,
    special_defense: 65,
    speed: 45,
    power: 318,
  },
  {
    id: 4,
    name: "Charmander",
    type: ["Fire"],
    hp: 39,
    attack: 52,
    defense: 43,
    special_attack: 60,
    special_defense: 50,
    speed: 65,
    power: 309,
  },
  {
    id: 7,
    name: "Squirtle",
    type: ["Water"],
    hp: 44,
    attack: 48,
    defense: 65,
    special_attack: 50,
    special_defense: 64,
    speed: 43,
    power: 314,
  },
  {
    id: 150,
    name: "Mewtwo",
    type: ["Psychic"],
    hp: 106,
    attack: 110,
    defense: 90,
    special_attack: 154,
    special_defense: 90,
    speed: 130,
    power: 680,
  },
];
