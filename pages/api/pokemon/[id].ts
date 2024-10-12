import type { NextApiRequest, NextApiResponse } from "next";
import Pokemons from "../data/pokemon.json";
import { Pokemon } from "../../../interfaces/pokemon";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Pokemon | { message: string }>
) {
  const { id } = req.query;

  const pokemon = Pokemons.find(p => p.id === Number(id));

  if (pokemon) {
    res.status(200).json(pokemon);
  } else {
    res.status(404).json({ message: "Pokemon not found" });
  }
}