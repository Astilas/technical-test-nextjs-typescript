// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import Pokemons from "./data/pokemon.json";
import { Pokemon } from "../../interfaces/pokemon";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Pokemon[] | { message: string }>
) {

  if (_req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    if (!Array.isArray(Pokemons) || Pokemons.length === 0) {
      return res.status(404).json({ message: 'No pokemon found' });
    }

    res.status(200).json(Pokemons);
  } catch (error) {
    console.error('Error when fetching pokemon:', error);
    res.status(500).json({ message: 'Internal error' });
  }
}