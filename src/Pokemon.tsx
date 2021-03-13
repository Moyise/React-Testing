import React, { useState } from "react";
import axios from "axios";
import CustomInput from "./CustomInput";

const pokemonApiUrl = "https://pokeapi.co/api/v2";

type Ability = {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
};

const Pokemon = () => {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonAbilities, setPokemonAbilities] = useState<Ability[]>([]);
  const [error, setError] = useState(null);

  const handleFetch = async () => {
    let result;
    try {
      result = await axios.get(`${pokemonApiUrl}/pokemon/${pokemonName}`);
      setPokemonAbilities(result.data.abilities);
    } catch (error) {
      setPokemonAbilities([]);
      setError(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPokemonName(e.target.value);
  };

  return (
    <div>
      <CustomInput value={pokemonName} onChange={handleChange}>
        Pokemon name:
      </CustomInput>
      <button type="button" onClick={handleFetch}>
        Fetch Pokemon abilities
      </button>
      {error && <p>Something went wrong...</p>}
      <ul>
        {pokemonAbilities.map((ability) => (
          <li key={ability.ability.name}>
            <a href={ability.ability.url}>{ability.ability.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pokemon;
