interface NftData {
    id: string;
    disposition: string;
    building: string;
    community: string;
    name: string;
    price: number;
    funded: number;
    sqft: number;
    options: string;
    chainId: number;
    original: string;
    images: string[];
}

export default NftData;