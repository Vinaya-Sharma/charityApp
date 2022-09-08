import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MoralisProvider } from "react-moralis";
import Head from "next/head";
import { CharityProvider } from "../context/CharityContext";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Header from "../components/small/Header";
import Image from "next/image";
import React from "react";
import Background from "../assets/background.png";

function MyApp({ Component, pageProps }: AppProps) {
  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_GRAPHURL,
    cache: new InMemoryCache(),
  });

  return (
    <MoralisProvider initializeOnMount={false}>
      <ApolloProvider client={client}>
        <CharityProvider>
          <Head>
            <title>Charity App</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <div className="relative p-4 bg-[#0A0028] w-screen h-screen overflow-hidden ">
            <Image src={Background} className=" object-cover" />
            <div className="z-[99] absolute top-5 flex w-full text-white px-16 pr-24 py-2">
              <Header />
            </div>
            {/**control box below */}
            <div className="absolute p-16 mt-4 right-0 left-0 ml-atuo mr-auto top-0 bottom-0  mb-auto ">
              <div className="w-full shadow-lg shadow-white h-full bg-white opacity-[0.35] rounded-3xl "></div>
            </div>
            <div className="absolute p-16 right-0 left-0 ml-atuo mr-auto top-0 bottom-0 mt-auto mb-auto ">
              <div className="px-4 py-10 w-full h-full flex rounded-3xl ">
                <Component {...pageProps} />
              </div>
            </div>
          </div>
        </CharityProvider>
      </ApolloProvider>
    </MoralisProvider>
  );
}

export default MyApp;
