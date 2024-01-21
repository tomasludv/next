import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Topbar() {
    return (
        <>
            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                <div className="relative flex flex-1">

                </div>
                <div className="flex items-center gap-x-4 lg:gap-x-6">
                    <ConnectButton />
                </div>
            </div>
        </>
    )
}