import { prepareWriteContract, writeContract } from '@wagmi/core'
import abi from '../abi/MinocNft.json'

interface MintNftButtonProps {
    id: string;
    amount: string;
}

const MintNftButton = ({ id, amount }: MintNftButtonProps) => {
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
        <button
            type="button"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => mintNft(Number(id), Number(amount))}
        >Mint</button>
    )
}

export default MintNftButton;