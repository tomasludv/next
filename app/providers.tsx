'use client';

import * as React from 'react';
import { RainbowKitProvider, getDefaultWallets, connectorsForWallets, } from '@rainbow-me/rainbowkit';
import { argentWallet, trustWallet, ledgerWallet, } from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { arbitrum, base, mainnet, optimism, polygon, sepolia, goerli, } from 'wagmi/chains';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    //mainnet,
    //polygon,
    //optimism,
    //arbitrum,
    //base,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [sepolia] : []),
  ],
  [publicProvider()]
);

const projectId = '03a2576031afe81adc6862c6137ef172';

const { wallets } = getDefaultWallets({
  appName: 'RainbowKit demo',
  projectId,
  chains,
});

const demoAppInfo = {
  appName: 'Rainbowkit Demo',
};

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: 'Other',
    wallets: [
      argentWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
      ledgerWallet({ projectId, chains }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} appInfo={demoAppInfo}>
        {mounted && children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
