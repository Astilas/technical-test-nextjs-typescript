import Head from "next/head";
import { Layout } from "../components/Layout";

import { Pokemon } from "../interfaces/pokemon";
import { useMemo, useState } from "react";
import { calculatePower } from "../utils/calculatePower";

const HomePage = ({ pokemons }: { pokemons: Pokemon[] }) => {
  const [filters, setFilters] = useState({
    name: "",
    power: "0",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const filteredPokemon = useMemo(() => {
    return pokemons
      .filter((pokemon) => 
        pokemon.name.toLowerCase().includes(filters.name.toLocaleLowerCase())
      )
  }, [pokemons, filters.name])

  return (
    <>
      <Head>
        <title>Technical test next.js and typescript</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Pokemon list</h1>

      <div>
        <div>Search</div>
        <input
          type="text"
          placeholder="search by name"
          name="name"
          value={filters.name}
          onChange={(e) => handleInputChange(e)}
        />
        <div>Power threshold</div>
        <input type="text"></input>
        <div>Count over threshold: </div>
        <div>Min: </div>
        <div>Max: </div>
      </div>
      {filteredPokemon.map((pokemon) => (
        <div key={pokemon.id}>{pokemon.name} - Power: {pokemon.power}</div>
      ))}
    </>
  );
};

HomePage.getLayout = Layout;

export async function getStaticProps() {
  try {
    const pokemons = await fetch("http://localhost:3000/api/pokemons").then(
      (resp) => resp.json()
    );

    if (pokemons.length === 0) {
      throw new Error("No pokemon found");
    }

    // Add power to each pokemon
    const pokemonsWithPower = pokemons.map((pokemon: any) => ({
      ...pokemon,
      power: calculatePower(pokemon),
    }));

    return {
      props: {
        pokemons: pokemonsWithPower,
      },
      revalidate: 3600,
    };
  } catch (error) {
    console.error("Erreur lors de la récupération des données Pokémon:", error);
    return {
      notFound: true,
    };
  }
}

export default HomePage;
