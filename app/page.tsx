'use client';

import { Network, Alchemy, OwnedNft } from "alchemy-sdk";
import { useEffect, useState } from "react";
import PropertyCard from '../components/PropertyCard'
import { useAccount } from 'wagmi'
import { watchAccount, watchNetwork } from '@wagmi/core'
import { useNetwork } from 'wagmi'

interface NftData {
  id: string;
  name: string;
  price: string;
  options: string;
  chainId: number;
  original: string;
  images: string[];
}

export default function Page() {
  const { chain } = useNetwork();
  const { address } = useAccount();
  const [nftsJson, setNftsJson] = useState<NftData[]>([]);
  const [nftsOwned, setNftsOwned] = useState<OwnedNft[]>([]);

  const getNftsOwned = async (chainId: number, walletAddress: string) => {
    if (chainId) {
      var network: Network;
      switch (chainId) {
        case 11155111: {
          network = Network.ETH_SEPOLIA;
          break;
        }
        default: {
          network = Network.ETH_MAINNET;
          break;
        }
      }
      const alchemy = new Alchemy({ apiKey: process.env.ALCHEMY_API_KEY_SEPOLIA, network: network });
      const nfts = await alchemy.nft.getNftsForOwner(walletAddress, { contractAddresses: ["0x7f3059CAB95eDf1F526f8dE15BC9767d79Fa467B"] });
      setNftsOwned(nfts.ownedNfts);
    } else {
      setNftsOwned([]);
    }
  }

  const getNftsJson = async () => {
    const response = await fetch('/api');
    const body = await response.json();
    setNftsJson(body);
  }

  useEffect(() => {
    getNftsJson();

    if (chain && address) getNftsOwned(chain.id, address)
    else setNftsOwned([])

    watchAccount(account => {
      if (chain && account.address) getNftsOwned(chain.id, account.address)
      else setNftsOwned([])
    })

    watchNetwork(network => {
      if (network.chain && address) getNftsOwned(network.chain.id, address)
      else setNftsOwned([])
    })
  }, [])

  return (
    <div className="">
      <div className="max-w-2xl px-4 py-4 lg:max-w-screen-2xl">
        <h2 className="sr-only">Products</h2>
        <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-10 lg:grid-cols-4 lg:gap-x-4">
          {nftsJson.map(nftJson => {
            if (chain && nftJson.chainId === chain.id)
              return (
                <PropertyCard
                  key={nftJson.id}
                  id={nftJson.id}
                  imageSrc={nftJson.images[0]}
                  imageAlt={nftJson.images[0]}
                  href={"/properties/" + nftJson.id}
                  name={nftJson.name}
                  options={nftJson.options}
                  price={nftJson.price}
                  myStake={nftsOwned.find(nftOwned => nftOwned.tokenId === nftJson.id)?.balance}
                />
              )
          })}
        </div>
      </div>
    </div>
  )
}