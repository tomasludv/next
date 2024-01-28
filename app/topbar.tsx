'use client';

import { prepareWriteContract, writeContract } from '@wagmi/core'
import abi from '../abi/ERC20.json'
import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Topbar() {
    const { address } = useAccount()

    const approve = async () => {
        const { request } = await prepareWriteContract({
            address: '0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8',
            abi: abi,
            functionName: 'approve',
            args: ["0x7f3059CAB95eDf1F526f8dE15BC9767d79Fa467B", 1000000000000000],
            chainId: 11155111
        })
        const { hash } = await writeContract(request);
        console.log(hash);
    }

    return (
        <>
            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                <div className="flex items-center flex-1 gap-x-4 lg:gap-x-6">
                    {address &&
                        <a href="https://gho.aave.com/faucet/" className="font-semibold text-indigo-500">Mint USDC</a>
                    }
                    {address &&
                        <button
                            type="button"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={approve}
                        >Approve USDC</button>
                    }
                </div>
                <div className="flex items-center gap-x-4 lg:gap-x-6">
                    <ConnectButton />
                </div>
            </div>
        </>
    )

}