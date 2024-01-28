'use client';
import { Network, Alchemy, OwnedNft } from "alchemy-sdk";
import { useEffect, useState } from "react";
import PropertyCard from '../components/PropertyCard'
import { useAccount } from 'wagmi'
import { watchAccount } from '@wagmi/core'

const alchemy = new Alchemy({ apiKey: process.env.ALCHEMY_API_KEY_SEPOLIA, network: Network.ETH_SEPOLIA });

interface NftData {
  id: string;
  name: string;
  href: string;
  price: string;
  description: string;
  options: string;
  imageSrc: string;
  imageAlt: string;
}

export default function Page() {
  const { address } = useAccount()
  const [nftData, setNftData] = useState<NftData[]>([]);
  const [nftCollection, setNftCollection] = useState<OwnedNft[]>([]);

  const getNFTs = async (walletAddress: string) => {
    const nfts = await alchemy.nft.getNftsForOwner(walletAddress, { contractAddresses: ["0x7f3059CAB95eDf1F526f8dE15BC9767d79Fa467B"] });
    setNftCollection(nfts.ownedNfts);
  }

  const getNftData = async () => {
    const response = await fetch('/api');
    const body = await response.json();
    setNftData(body);
  }

  useEffect(() => {
    getNftData();

    if (address) {
      getNFTs(address);
    }

    watchAccount((newAccount) => {
      if (newAccount.address) getNFTs(newAccount.address)
      else setNftCollection([])
    })
  }, [])

  return (
    <div className="bg-white">
      <div className="max-w-2xl px-4 py-4 lg:max-w-screen-2xl">
        <h2 className="sr-only">Products</h2>
        <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-10 lg:grid-cols-4 lg:gap-x-4">
          {nftData.map((product) => (
            <PropertyCard
              key={product.id}
              id={product.id}
              imageSrc={product.imageSrc}
              imageAlt={product.imageAlt}
              href={product.href}
              name={product.name}
              options={product.options}
              price={product.price}
              myStake={nftCollection.find(nft => nft.tokenId === product.id)?.balance}
            />
          ))}
        </div>
      </div>
    </div>
  )
}