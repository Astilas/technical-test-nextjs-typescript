import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import PokemonSkeleton from "../components/PokemonSkeleton";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  nonce: string;
};

function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ??
    ((page) => {
      return page;
    });
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const start = (url: string) => {

      // Check if the route matches pokemon/[id]
      const isPokemonRoute = /^\/pokemon\/[^/]+$/.test(url);
      if (isPokemonRoute) {
        setLoading(true);
      }
    };
    const end = () => {
      console.log("Chargement terminé");
      setLoading(false);
    };
    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", end);
    router.events.on("routeChangeError", end);
    return () => {
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", end);
      router.events.off("routeChangeError", end);
    };
  }, []);
  
  if (loading) {
    return getLayout(<PokemonSkeleton />);
  }

  return getLayout(<Component {...pageProps} />)

}

export default App;
