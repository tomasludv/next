import { useState } from "react";
import { prepareWriteContract, writeContract } from '@wagmi/core'
import abi from '../abi/MinocNft.json'

interface MintNftButtonProps {
    id: string;
}

const MintNftButton = ({ id }: MintNftButtonProps) => {
    const [amount, setAmount] = useState("0")

    const mintNft = async (id: number, amount: number) => {
        const { request } = await prepareWriteContract({
            address: '0x7f3059CAB95eDf1F526f8dE15BC9767d79Fa467B',
            abi: abi,
            functionName: 'mint',
            args: [id, amount],
            chainId: 11155111
        })
        const { hash } = await writeContract(request);
        console.log(hash);
    }

    return (
        <>
            <div className="mt-2 flex rounded-md shadow-sm">
                <div className="relative flex flex-grow items-stretch focus-within:z-10">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <img src='https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/32/color/usdc.png' className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                        type="number"
                        className="block w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="0"
                        onChange={e => setAmount(e.target.value)} />
                </div>
                <button type="button" className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Max</button>
            </div>
            <button
                type="button"
                className="mt-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => mintNft(Number(id), Number(amount))}
            >Mint</button>
        </>

    )
}

export default MintNftButton;