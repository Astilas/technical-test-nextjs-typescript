import React from "react";
import Head from "next/head";

import { Pokemon } from "../../interfaces/pokemon";
import { Layout } from "../../components/Layout";
import { calculatePower } from "../../utils/calculatePower";
import Image from "next/image";
import Link from "next/link";
import { Table, Container, StatBarContainer, StatBar } from "../../styles/pokemonDetails";


const maxStatValue = 200;
const maxPowerValue = 900;

const PokemonPage = ({ pokemon }: { pokemon: Pokemon }) => {
  const {
    name,
    id,
    hp,
    attack,
    defense,
    special_attack,
    special_defense,
    speed,
    power,
  } = pokemon;

  const stats = [
    { name: "HP", value: hp },
    { name: "Attack", value: attack },
    { name: "Defense", value: defense },
    { name: "Special Attack", value: special_attack },
    { name: "Special Defense", value: special_defense },
    { name: "Speed", value: speed },
    { name: "Power", value: power },
  ];

  return (
    <>
      <Head>
        <title>{name}</title>
      </Head>
      <h1>{name}</h1>
      <Container>
      <Image
        src={`/images/${name}.jpg`}
        alt={name}
        width={300}
        height={300}
        loading="lazy"
      />
      <Table>
          <tbody>
            {stats.map((stat, index) => (
              <tr key={index}>
                <td data-label={stat.name}>{stat.name}</td>
                <td>
                  <StatBarContainer>
                    <StatBar
                      width={
                        stat.name === "Power"
                          ? (stat.value! / maxPowerValue) * 100
                          : (stat.value! / maxStatValue) * 100
                      }
                    />
                  </StatBarContainer>
                </td>
                <td>{stat.value}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
      {id > 1 && (
        <button>
          <Link href={`/pokemon/${id - 1}`}>Previous</Link>
        </button>
      )}
      {id < 809 && (
        <button>
          <Link href={`/pokemon/${id + 1}`}>Next</Link>
        </button>
      )}
      <button>
        <Link href={`/`}>Home</Link>
      </button>
    </>
  );
};

PokemonPage.getLayout = Layout;

export const getServerSideProps = async ({
  params,
}: {
  params: { id: number };
}) => {
  const { id } = params;

  try {
    // Call the API to get the list of Pokémon
    const response = await fetch(`http://localhost:3000/api/pokemon/${id}`);
    const pokemon: Pokemon = await response.json();

    if (!pokemon) {
      return {
        notFound: true, // If not found, return 404
      };
    }

    const pokemonWithPower = {
      ...pokemon,
      power: calculatePower(pokemon),
    };

    return {
      props: {
        pokemon: pokemonWithPower,
      },
    };
  } catch (error) {
    console.error("Error while fetching the Pokémon:", error);
    return {
      notFound: true, // Return 404 in case of error
    };
  }
};

export default PokemonPage;
