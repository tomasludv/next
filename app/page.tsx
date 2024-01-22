'use client';
import { Network, Alchemy, OwnedNft } from "alchemy-sdk";
import { useEffect, useState } from "react";

const settings = { apiKey: "7co8yUG-z7vG2h1jZaThl4p1S1OPeNH9", network: Network.ETH_SEPOLIA };
const alchemy = new Alchemy(settings);

const products = [
  {
    id: "0",
    name: '1 Bed in Sobha Creek Vistas, MBR City (2811)',
    href: '#',
    price: 'AED 1,050,000',
    description: 'Get the full lineup of our Basic Tees. Have a fresh shirt all week, and an extra for laundry day.',
    options: 'Dubai',
    imageSrc: 'https://stake-dev-env.s3.eu-west-1.amazonaws.com/properties/176/images/2512/1400px_main_96Pqw19gPC39yOptbd67GrNYI9X7yHOSD6al9ljP.jpeg',
    imageAlt: 'Eight shirts arranged on table in black, olive, grey, blue, white, red, mustard, and green.',
  },
  {
    id: "1",
    name: '1 Bed in Sky Gardens, DIFC (1310)',
    href: '#',
    price: 'AED 1,649,000',
    description: 'Look like a visionary CEO and wear the same black t-shirt every day.',
    options: 'Dubai',
    imageSrc: 'https://stake-dev-env.s3.eu-west-1.amazonaws.com/properties/175/images/2488/1000px_main_9g2DpYWR0D114M0jf0EGNZ7guhki4OOlPjombmOu.jpeg',
    imageAlt: 'Front of plain black t-shirt.',
  },
  {
    id: "2",
    name: '1 Bed in Executive Residences, Dubai Hills (111)',
    href: '#',
    price: 'AED 1,441,000',
    description: 'Look like a visionary CEO and wear the same black t-shirt every day.',
    options: 'Dubai',
    imageSrc: 'https://stake-dev-env.s3.eu-west-1.amazonaws.com/properties/177/images/2514/1510px_main_HyWV0iATCO9i0QODfYPj8VZJngDih1Y4MZOljENK.jpeg',
    imageAlt: 'Front of plain black t-shirt.',
  },
  {
    id: "3",
    name: '2 Bed Townhouse in Springs 7, The Springs & Meadows',
    href: '#',
    price: 'AED 2,924,000',
    description: 'Look like a visionary CEO and wear the same black t-shirt every day.',
    options: 'Dubai',
    imageSrc: 'https://stake-dev-env.s3.eu-west-1.amazonaws.com/properties/174/images/2481/1920px_main_Xfqiy0vkRgpBuKXsD9KdvlKAf2p5fHq2VAgq44Z0.jpeg',
    imageAlt: 'Front of plain black t-shirt.',
  },
  {
    id: "4",
    name: 'Studio in Botanica Tower, Dubai Marina (3406)',
    href: '#',
    price: 'AED 1,035,000',
    description: 'Look like a visionary CEO and wear the same black t-shirt every day.',
    options: 'Dubai',
    imageSrc: 'https://stake-dev-env.s3.eu-west-1.amazonaws.com/properties/179/images/2546/2400px_main_btHM6GX5okVRqZZVtGsdLVfnYbk0Gl8zEUba5M6n.jpeg',
    imageAlt: 'Front of plain black t-shirt.',
  },
  {
    id: "5",
    name: '1 Bed in West Avenue, Dubai Marina (206)',
    href: '#',
    price: 'AED 1,035,000',
    description: 'Look like a visionary CEO and wear the same black t-shirt every day.',
    options: 'Dubai',
    imageSrc: 'https://stake-dev-env.s3.eu-west-1.amazonaws.com/properties/180/images/2565/1000px_main_wTQk1XZ0Jqc4vhW5ZkjPAFFGJP0OVz8QwC1kQypF.jpeg',
    imageAlt: 'Front of plain black t-shirt.',
  },
]

export default function Page() {

  const [nftCollection, setNftCollection] = useState<OwnedNft[]>([]);

  const getNFTs = async () => {
    const nfts = await alchemy.nft.getNftsForOwner("0x100e9EC1D6Ab05b41546213095859001C3c6A874", { contractAddresses: ["0x7f3059CAB95eDf1F526f8dE15BC9767d79Fa467B"] });
    setNftCollection(nfts.ownedNfts);
  }

  useEffect(() => {
    getNFTs();
  }, [])

  return (
    <div className="bg-white">
      <div className="max-w-2xl px-4 py-4 lg:max-w-screen-2xl">
        <h2 className="sr-only">Products</h2>
        <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-10 lg:grid-cols-4 lg:gap-x-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
            >
              <div className="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-60">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                />
              </div>
              <div className="flex flex-1 flex-col space-y-2 p-4">
                <h3 className="text-sm font-medium text-gray-900">
                  <a href={product.href}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.name}
                  </a>
                </h3>
                <div className="flex flex-1 flex-col justify-end">
                  <p className="text-sm italic text-gray-500">{product.options}</p>
                  <p className="text-base font-medium text-gray-900">{product.price}</p>
                  <p className="text-base font-medium text-gray-900">{nftCollection.map(nft => nft.tokenId === product.id ? "my stake: " + nft.balance : "")}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}