'use client';
import { Network, Alchemy, OwnedNft, } from "alchemy-sdk";
import { useEffect, useState } from "react";
import PropertyCard from '../../components/PropertyCard'
import { useAccount, useNetwork } from 'wagmi'
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
    chainId: number;
}

export default function Page() {
    const { chain } = useNetwork();
    const { address } = useAccount()
    const [nftsData, setNftsData] = useState<NftData[]>([]);
    const [nftsOwned, setNftsOwned] = useState<OwnedNft[]>([]);

    const getNftsData = async () => {
        const response = await fetch('/api');
        const body = await response.json();
        setNftsData(body);
    }

    const getNftsOwned = async (walletAddress: string) => {
        const nfts = await alchemy.nft.getNftsForOwner(walletAddress, { contractAddresses: ["0x7f3059CAB95eDf1F526f8dE15BC9767d79Fa467B"] });
        setNftsOwned(nfts.ownedNfts);
    }

    useEffect(() => {
        getNftsData();

        if (address) {
            getNftsOwned(address);
        }

        watchAccount((newAccount) => {
            if (newAccount.address) getNftsOwned(newAccount.address)
            else setNftsOwned([])
        })
    }, [])

    return (
        <div className="bg-white">
            <div className="max-w-2xl px-4 py-4 lg:max-w-screen-2xl">
                <h2 className="sr-only">Products</h2>
                <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-10 lg:grid-cols-4 lg:gap-x-4">
                    {nftsData.map(nftData => {
                        if (chain && nftData.chainId === chain.id && nftsOwned.find(nftOwned => nftOwned.tokenId === nftData.id))
                            return (
                                <PropertyCard
                                    key={nftData.id}
                                    id={nftData.id}
                                    imageSrc={nftData.imageSrc}
                                    imageAlt={nftData.imageAlt}
                                    href={nftData.href}
                                    name={nftData.name}
                                    options={nftData.options}
                                    price={nftData.price}
                                    myStake={nftsOwned.find(nftOwned => nftOwned.tokenId === nftData.id)?.balance}
                                />
                            )
                    })}
                </div>
            </div>
        </div>
    )
}