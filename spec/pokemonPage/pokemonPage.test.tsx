import { mockPokemons } from "../mockPokemons";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PokemonPage from "../../pages/pokemon/[id]";
import { useRouter } from "next/router";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("next/link", () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href} data-testid="mock-link">
      {children}
    </a>
  );
});

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} data-testid="pokemon-image" />;
  },
}));

describe("PokemonDetail Component", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
      prefetch: jest.fn(),
      pathname: "/pokemon/[id]",
      query: { id: mockPokemons[1].id.toString() },
      asPath: `/pokemon/${mockPokemons[1].id}`,
    });
  });

  it("should render the Pokemon details correctly", () => {
    render(<PokemonPage pokemon={mockPokemons[1]} />);
  
    const pokemonImage = screen.getByTestId('pokemon-image');
    expect(pokemonImage).toHaveAttribute('alt', `${mockPokemons[1].name}`)
    expect(pokemonImage).toHaveAttribute('src', `/images/${mockPokemons[1].name}.jpg`);

    expect(screen.getByText("Charmander")).toBeInTheDocument();
    expect(screen.getByText("Fire")).toBeInTheDocument();
  });

  it('should have "Previous" and "Next" buttons', () => {
    render(<PokemonPage pokemon={mockPokemons[1]} />);

    expect(screen.getByRole('button', { name: 'Previous' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument();
  });

  it('should navigate to the previous Pokemon when clicking "Previous"', () => {
    render(<PokemonPage pokemon={mockPokemons[1]} />);

    const previousLink = screen.getByText("Previous");
    expect(previousLink).toBeInTheDocument();

    const expectedPreviousId = mockPokemons[1].id - 1;
    expect(previousLink.closest("a")).toHaveAttribute(
      "href",
      `/pokemon/${expectedPreviousId}`
    );
  });

  it('should navigate to the next Pokemon when clicking "Next"', () => {
    render(<PokemonPage pokemon={mockPokemons[1]} />);

    const nextLink = screen.getByText("Next");
    expect(nextLink).toBeInTheDocument();

    const expectedNextId = mockPokemons[1].id + 1;
    expect(nextLink.closest("a")).toHaveAttribute(
      "href",
      `/pokemon/${expectedNextId}`
    );
  });

});
