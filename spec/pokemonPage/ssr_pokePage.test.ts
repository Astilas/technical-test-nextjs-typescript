
import { getServerSideProps } from '../../pages/pokemon/[id]';
import { Pokemon } from '../../interfaces/pokemon';
import fetchMock from 'jest-fetch-mock';

describe('PokemonPage getServerSideProps', () => {
  const mockPokemon: Pokemon = {
    id: 25,
    name: 'Pikachu',
    type: ['Electric'],
    hp: 35,
    attack: 55,
    defense: 40,
    special_attack: 50,
    special_defense: 50,
    speed: 90,
    power: 320
  };

  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('should return the Pokemon data for a valid ID', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockPokemon));

    const context = { params: { id: mockPokemon.id.toString() } };
    const result = await getServerSideProps(context as any);

    expect(result).toEqual({
      props: {
        pokemon: mockPokemon,
      },
    });
  });

  it('should handle case where Pokemon is not found', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ message: "Pokemon not found" }));

    const context = { params: { id: '9999' } };
    const result = await getServerSideProps(context as any);

    expect(result).toEqual({ notFound: true });
  });

  it('should handle non-numeric id', async () => {
    const context = { params: { id: 'test' } };
    const result = await getServerSideProps(context as any);

    expect(result).toEqual({ notFound: true });
  });
});
