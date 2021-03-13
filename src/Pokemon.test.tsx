import React from "react";
import axios from "axios";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Pokemon from "./Pokemon";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("When user enter a valid pokemon name", () => {
  test("should show the pokemon abilities", async () => {
    const abilities = [
      {
        ability: {
          name: "lightning-rod",
          url: "https://pokeapi.co/api/v2/ability/31/",
        },
      },
      {
        ability: {
          name: "static",
          url: "https://pokeapi.co/api/v2/ability/9/",
        },
      },
    ];

    mockedAxios.get.mockResolvedValueOnce({ data: { abilities } });
    render(<Pokemon />);
    await userEvent.type(screen.getByRole("textbox"), "pikachu");
    await userEvent.click(screen.getByRole("button"));
    const foundAbilities = await screen.findAllByRole("listitem");
    expect(foundAbilities).toHaveLength(2);
  });
});

describe("When user enter an invalid pokemon name", () => {
  test("should show an error message", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error());
    render(<Pokemon />);
    await userEvent.type(screen.getByRole("textbox"), "invalid-pokemon-name");
    await userEvent.click(screen.getByRole("button"));
    const message = await screen.findByText(/Something went wrong/);
    expect(message).toBeInTheDocument();
  });
});
