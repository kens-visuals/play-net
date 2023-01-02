import Link from 'next/link';
import { ChangeEvent, useState } from 'react';
import { useQuery } from 'react-query';
import RAWG from '../lib/rawg';

// Interfaces
import { Game } from '../pages/game/[id]';

interface SearchGame {
  results: Game[];
}

export default function SearchResults() {
  const [searchTerm, setSearchTerm] = useState('');

  const fetchSearchedGame = async (): Promise<SearchGame> => {
    const apiKey = process.env.NEXT_PUBLIC_RAWG_API_KEY;
    const { data } = await RAWG.get<SearchGame>(
      `/games?key=${apiKey}&search=${searchTerm}`
    );

    return data;
  };

  const {
    data,
    isError: isSearchError,
    isLoading: isSearchLoading,
  } = useQuery(['search', searchTerm], fetchSearchedGame);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(event.target.value);

  return (
    <>
      <form>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="search">Search:</label>
        <input
          type="text"
          id="search"
          value={searchTerm}
          onChange={handleSearch}
        />
      </form>

      {/* eslint-disable-next-line no-nested-ternary */}
      {isSearchLoading ? (
        <div>Loading...</div>
      ) : isSearchError ? (
        <div>Error</div>
      ) : (
        <ul>
          {data &&
            data?.results.map((game) => (
              <li key={game.id}>
                <Link key={game.id} href={`/game/${game.id}`}>
                  {game.name}
                </Link>
              </li>
            ))}
        </ul>
      )}
    </>
  );
}
