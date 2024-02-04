interface PropertyCardProps {
    id: string;
    imageSrc: string;
    imageAlt: string;
    href: string;
    name: string;
    options: string;
    price: string;
    myStake: string | undefined;
}

const PropertyCard = ({ id, imageSrc, imageAlt, name, price, myStake }: PropertyCardProps) => {
    return (
        <div key={id} className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"        >
            <div className="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-60">
                <img src={imageSrc} alt={imageAlt} className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                />
            </div>
            <div className="flex flex-1 flex-col space-y-2 p-4">
                <p className="text-base font-medium text-gray-900">{price}</p>
                <h3 className="text-sm text-gray-900">
                    <a href={"/properties/" + id}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {name}
                    </a>
                </h3>
                <div className="flex flex-1 flex-row justify-end">
                    <div className="flex flex-1 flex-col justify-end">
                        {myStake &&
                            (<p className="text-base font-medium text-gray-900">my stake: {myStake}</p>)
                        }
                        <a className='mt-4 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>Mint</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PropertyCard;