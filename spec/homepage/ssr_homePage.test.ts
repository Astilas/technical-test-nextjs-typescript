import { getServerSideProps } from '../../pages/index';
import { Pokemon } from '../../interfaces/pokemon';
import fetchMock from 'jest-fetch-mock';
import { calculatePower } from '../../utils/calculatePower';
import { filterPokemon } from '../../utils/filterPokemon';
import { mockPokemons } from '../mockPokemons';
import { GetServerSidePropsContext } from 'next';

jest.mock('../../utils/calculatePower');
jest.mock('../../utils/filterPokemon');

describe('Homepage getServerSideProps', () => {
  beforeAll(() => {
    fetchMock.enableMocks();
  });
  beforeEach(() => {
    fetchMock.resetMocks();
    jest.clearAllMocks();
    (filterPokemon as jest.Mock).mockImplementation((pokemons: Pokemon[]) => pokemons);
  });

  it('should return Pokemon data with calculated power', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockPokemons));

    const context = { params: {} };
    const result = await getServerSideProps(context as GetServerSidePropsContext);

    expect(result).toEqual({
      props: {
        pokemons: mockPokemons.map(pokemon => ({
          ...pokemon,
          power: calculatePower(pokemon)
        }))
      }
    });
  });

  it('should handle case where no Pokémon is found', async () => {
    console.error = jest.fn();
    fetchMock.mockResponseOnce(JSON.stringify([]));

    const context = { params: {} };
    const result = await getServerSideProps(context as any);

    expect(result).toEqual({ notFound: true });
  });

  it('should handle fetch errors', async () => {
    console.error = jest.fn();
    fetchMock.mockRejectOnce(new Error('Fetch error'));

    const context = { params: {} };
    const result = await getServerSideProps(context as any);

    expect(result).toEqual({ notFound: true });
  });
});