import MintNftButton from './MintNftButton'

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

const PropertyCard = ({ id, imageSrc, imageAlt, href, name, options, price, myStake }: PropertyCardProps) => {
    return (
        <div key={id} className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"        >
            <div className="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-60">
                <img src={imageSrc} alt={imageAlt} className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                />
            </div>
            <div className="flex flex-1 flex-col space-y-2 p-4">
                <h3 className="text-sm font-medium text-gray-900">
                    <a href={href}>
                        <span aria-hidden="true" className="absolutexxx inset-0xxx" />
                        {name}
                    </a>
                </h3>
                <div className="flex flex-1 flex-row justify-end">
                    <div className="flex flex-1 flex-col justify-end">
                        <p className="text-sm italic text-gray-500">{options}</p>
                        <p className="text-base font-medium text-gray-900">{price}</p>
                        {myStake &&
                            (<p className="text-base font-medium text-gray-900">my stake: {myStake}</p>)
                        }
                    </div>
                    <div className="flex flex-1 flex-col justify-end">
                        <MintNftButton id={id} amount='1000000' />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PropertyCard;