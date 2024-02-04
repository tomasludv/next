interface PropertyCardProps {
    id: string;
    imageSrc: string;
    imageAlt: string;
    href: string;
    name: string;
    options: string;
    price: number;
    funded: number;
    myStake: string | undefined;
}

const currencyformatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
});

const percentageFormatter = new Intl.NumberFormat("en-US", {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
});

const PropertyCard = ({ id, imageSrc, imageAlt, name, price, funded, myStake }: PropertyCardProps) => {
    return (
        <div key={id} className="group relative flex flex-col overflow-hidden rounded-lg borderxxx border-gray-200xxx bg-white"        >
            <div className="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-60">
                <img src={imageSrc} alt={imageAlt} className="h-full w-full object-cover object-center sm:h-full sm:w-full" />
            </div>
            <div className="flex flex-1 flex-col space-y-4 p-4 justify-end">
                <a className="flex-1 text-xl font-medium text-gray-900" href={"/properties/" + id}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {name}
                </a>
                {myStake &&
                    (<p className="text-base font-medium text-gray-900">my stake: {myStake}</p>)
                }
                <div className="flex flex-col space-y-2">
                    <div className="flex flex-row space-y-2">
                        <p className="flex-1 text-xl font-medium text-indigo-600">{currencyformatter.format(price)}</p>
                        <p className="flex-1 text-sm font-medium text-gray-900 text-right">{percentageFormatter.format(funded / price)} funded</p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: 100 * funded / price + "%" }}></div>
                    </div>
                </div>
                <a className='flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>Mint</a>
            </div>
        </div>
    );
}

export default PropertyCard;