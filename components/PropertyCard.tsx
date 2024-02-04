interface PropertyCardProps {
    id: string;
    imageSrc: string;
    imageAlt: string;
    href: string;
    name: string;
    options: string;
    price: number;
    funded: number;
    sqft: number;
    myStake: string | undefined;
}

const numberFormatter = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0, });
const currencyformatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0, });
const percentageZeroDecimalsFormatter = new Intl.NumberFormat("en-US", { style: 'percent', minimumFractionDigits: 0, maximumFractionDigits: 0 });
const percentageSixDecimalsFormatter = new Intl.NumberFormat("en-US", { style: 'percent', minimumFractionDigits: 0, maximumFractionDigits: 6 });

const PropertyCard = ({ id, imageSrc, imageAlt, name, price, funded, myStake, sqft }: PropertyCardProps) => {
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
                    (<p className="hidden text-base font-medium text-gray-900">my stake: {myStake}</p>)
                }
                <div className="flex flex-col space-y-2">
                    <div className="flex flex-row justify-between items-end">
                        <p className="text-xl font-medium text-indigo-600">{currencyformatter.format(price)}</p>
                        <p className="text-sm font-medium text-gray-600">{percentageZeroDecimalsFormatter.format(funded / price) + " funded"}</p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: percentageSixDecimalsFormatter.format(funded / price) }}></div>
                    </div>
                </div>
                <section aria-labelledby="summary-heading" className="rounded-lg bg-gray-50 p-3">
                    <dl className="space-y-2">
                        <div className="flex items-center justify-between">
                            <dt className="flex text-sm text-gray-600">Property Type</dt>
                            <dd className="text-sm font-medium text-gray-900">Apartment</dd>
                        </div>
                        <div className="flex items-center justify-between">
                            <dt className="text-sm text-gray-600">Property size</dt>
                            <dd className="text-sm font-medium text-gray-900">{numberFormatter.format(sqft * 0.09290304) + " square meters"}</dd>
                        </div>
                        <div className="flex items-center justify-between">
                            <dt className="flex items-center text-sm text-gray-600">Price per square meter</dt>
                            <dd className="text-sm font-medium text-gray-900">{currencyformatter.format(price / sqft / 0.09290304)}</dd>
                        </div>
                    </dl>
                </section>
                <a className='hidden flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>Mint</a>
            </div>
        </div>
    );
}

export default PropertyCard;