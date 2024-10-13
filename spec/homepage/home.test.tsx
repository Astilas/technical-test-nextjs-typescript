import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "../setupTests";
import { useRouter } from "next/router";
import { mockPokemons } from "../mockPokemons";

import HomePage from "../../pages";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("HomePage", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should render without crashing", () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: {
        search: "char",
        power: "0",
      },
      push: jest.fn(),
    });

    render(<HomePage pokemons={mockPokemons} />);

    expect(screen.getByText(/Pokemon List/i)).toBeInTheDocument();
  });

  it("should filter pokemons based on name", () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: {
        search: "char",
        power: "0",
      },
      push: jest.fn(),
    });

    render(<HomePage pokemons={mockPokemons} />);

    expect(screen.getByText("Charmander")).toBeInTheDocument();

    expect(screen.queryByText("Pikachu")).not.toBeInTheDocument();
  });

  it("should correctly filter pokemons by name", async () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: {
        search: "",
        power: "0",
      },
      push: jest.fn(),
    });
    render(<HomePage pokemons={mockPokemons} />);

    const nameInput = screen.getByPlaceholderText("Search Pokemon by name");
    fireEvent.change(nameInput, { target: { value: "Char" } });

    await screen.findByText((content: string) => {
      return content.startsWith("Char");
    });

    expect(
      screen.getByText((content: string) => {
        return content.startsWith("Charmander");
      })
    ).toBeInTheDocument();
    expect(screen.queryByText("Pikachu")).not.toBeInTheDocument();
  });

  it("should correctly filter pokemons by power greater than 310", async () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: {
        search: "",
        power: "0",
      },
      push: jest.fn(),
    });
    render(<HomePage pokemons={mockPokemons} />);

    const powerInput = screen.getByPlaceholderText("search by power greater than");
    fireEvent.change(powerInput, { target: { value: "310" } });

    await screen.findByText((content: string) => {
      return content.startsWith("Bulb");
    });

    const filteredPokemons = mockPokemons.filter(pokemon => pokemon.power! > 310);

    filteredPokemons.forEach(pokemon => {
      expect(screen.getByText(pokemon.name)).toBeInTheDocument();
    });

    expect(screen.getByText("Bulbasaur")).toBeInTheDocument();
    expect(screen.getByText("Squirtle")).toBeInTheDocument();
    expect(screen.queryByText("Charmander")).not.toBeInTheDocument();

    const displayedPokemons = screen.getAllByText(new RegExp(filteredPokemons.map(p => p.name).join('|')));
    expect(displayedPokemons).toHaveLength(filteredPokemons.length);
  
    const countElement = screen.getByText(new RegExp(`Count over threshold: ${filteredPokemons.length}`));
    expect(countElement).toBeInTheDocument();
  
    const minPower = Math.min(...filteredPokemons.map(p => p.power!));
    const minPowerElement = screen.getByText(new RegExp(`Min: ${minPower}`));
    expect(minPowerElement).toBeInTheDocument();
  
    const maxPower = Math.max(...filteredPokemons.map(p => p.power!));
    const maxPowerElement = screen.getByText(new RegExp(`Max: ${maxPower}`));
    expect(maxPowerElement).toBeInTheDocument();
  
  });

  it("should redirect to the Pokemon page when clicking on its name", async () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      query: {
        search: "",
        power: "0",
      },
      push: mockPush,
    });
    
    render(<HomePage pokemons={mockPokemons} />);
  
    const squirtleLink = screen.getByText("Squirtle");
    expect(squirtleLink).toBeInTheDocument();

    const squirtle = mockPokemons.find(pokemon => pokemon.name.toLowerCase() === "squirtle");
    const squirtleId = squirtle ? squirtle.id : undefined;
  
    fireEvent.click(squirtleLink);
  
    expect(mockPush).toHaveBeenCalledWith(`/pokemon/${squirtleId}`);
  

    const charmanderLink = screen.getByText("Charmander");
    expect(charmanderLink).toBeInTheDocument();

    const charmander = mockPokemons.find(pokemon => pokemon.name.toLowerCase() === "charmander");
    const charmanderId = charmander ? charmander.id : undefined;

    expect(charmanderId).toBeDefined();
    
    fireEvent.click(charmanderLink);
  
    expect(mockPush).toHaveBeenCalledWith(`/pokemon/${charmanderId}`);
  });
});
