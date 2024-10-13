import React from "react";
import styled, { keyframes } from "styled-components";
import {
  Table,
  ButtonContainer,
  TitlePokemon,
  ImageContainer,
} from "../styles/pokemonDetails";
import { TypeContainer } from "../styles/pokemons";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
`;

const Spinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${spin} 1s linear infinite;
`;

const SkeletonBox = styled.div`
  background-color: #000000;
  border-radius: 4px;
  height: 20px;
  margin-bottom: 10px;
  animation: ${pulse} 1.5s infinite;
`;

const PokemonSkeleton: React.FC = () => {
  return (
    <>
      <TitlePokemon>
        <SkeletonBox />
        <TypeContainer>
          <SkeletonBox />
          <SkeletonBox />
        </TypeContainer>
      </TitlePokemon>
      <ImageContainer>
        <Spinner />
      </ImageContainer>
      <Table>
        <tbody>
          {[...Array(7)].map((_, index) => (
            <tr key={index}>
              <td><SkeletonBox /></td>
              <td>
                
              </td>
              <td><SkeletonBox /></td>
            </tr>
          ))}
        </tbody>
      </Table>

      <ButtonContainer />
    </>
  );
};

export default PokemonSkeleton;