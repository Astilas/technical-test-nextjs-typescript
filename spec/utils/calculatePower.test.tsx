import { calculatePower } from "../../utils/calculatePower";
import "../setupTests";

describe("calculatePower helper", () => {
  it("should calculate the correct power", () => {
    const pokemon = {
      id: 25,
      name: "Pikachu",
      type: ["Electric"],
      hp: 35,
      attack: 55,
      defense: 40,
      special_attack: 50,
      special_defense: 50,
      speed: 90,
    };

    const power = calculatePower(pokemon);

    expect(power).toBe(320);
  });
});
