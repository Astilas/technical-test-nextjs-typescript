import { Pokemon } from "../interfaces/pokemon";

export const filterPokemon = (pokemons: Pokemon[], name: string, power: string) => {
  return pokemons.filter((pokemon) => {
    const nameMatch = pokemon.name.toLowerCase().includes(name.toLowerCase());
    const powerMatch = power.trim() === "" || pokemon.power! > parseInt(power);

    if (name && power.trim() !== "") {
      return nameMatch; // If searching by name and power, return all pokemon that match the name
    }
    // Otherwise, we apply both filters
    return nameMatch && powerMatch;
  });
};
