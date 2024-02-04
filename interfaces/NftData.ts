interface NftData {
    id: string;
    name: string;
    price: number;
    funded: number;
    options: string;
    chainId: number;
    original: string;
    images: string[];
}

export default NftData;