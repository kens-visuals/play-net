import Head from 'next/head';
import Link from 'next/link';

// Hooks
import useUser from '../hooks/useUser';

// Components
import Sidebar from '../components/Sidebar';
import Bookmarks from '../components/Bookmarks';
import SearchResults from '../components/SearchResults';

export default function Home() {
  const user = useUser();

  if (user.isLoading) {
    return <div>Loading...</div>;
  }

  if (user.error) {
    <div>Not signed in.</div>;
  }

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div>Welcome {user?.data?.email}!</div>

        <Link href="/games">View Games</Link>

        <Sidebar />

        <Bookmarks />

        <br />

        <SearchResults />
      </main>
    </div>
  );
}
