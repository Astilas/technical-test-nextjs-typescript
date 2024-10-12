import React from "react";
import Head from "next/head";

import { Pokemon, PokemonPageProps } from "../../interfaces/pokemon";
import { Layout } from "../../components/Layout";
import { calculatePower } from "../../utils/calculatePower";

const PokemonPage = ({ pokemon }: PokemonPageProps) => {
  const { name, id, hp, attack, defense, special_attack, special_defense, speed, power } = pokemon;

  return (
    <>
      <Head>
        <title>{name}</title>
      </Head>
      <h1>{name}</h1>
      <button>{`< Previous`}</button>
      <button>{`Next >`}</button>
    </>
  );
};

PokemonPage.getLayout = Layout;

export const getServerSideProps = async ({ params }: { params: { id: number } }) => {
  const { id } = params; // Get the ID from the parameter

  try {
    // Call the API to get the list of Pokémon
    const response = await fetch(`http://localhost:3000/api/pokemon/${id}`); // Ensure the URL is correct
    const pokemon: Pokemon = await response.json();

    // Check if the pokemon has been found
    if (!pokemon) {
      return {
        notFound: true, // If not found, return 404
      };
    }

    const pokemonWithPower = {
      ...pokemon,
      power: calculatePower(pokemon)
    };

    return {
      props: {
        pokemon: pokemonWithPower,
      }
    }
  } catch (error) {
    console.error("Error while fetching the Pokémon:", error);
    return {
      notFound: true, // Return 404 in case of error
    };
  }
}

export default PokemonPage;
