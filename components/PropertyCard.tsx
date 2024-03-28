import { FireIcon } from '@heroicons/react/24/solid'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useRef } from 'react'
import MintNftButton from './MintNftButton'

interface PropertyCardProps {
    id: string;
    disposition: string;
    building: string;
    community: string;
    imageSrc: string;
    imageAlt: string;
    href: string;
    name: string;
    options: string;
    price: number;
    funded: number;
    sqft: number;
    myStake: string | undefined;
    totalBalance: number | undefined;
}

const numberFormatter = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });
const currencyformatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0, });
const percentageZeroDecimalsFormatter = new Intl.NumberFormat("en-US", { style: 'percent', minimumFractionDigits: 0, maximumFractionDigits: 0 });
const percentageSixDecimalsFormatter = new Intl.NumberFormat("en-US", { style: 'percent', minimumFractionDigits: 0, maximumFractionDigits: 6 });

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

const PropertyCard = ({ id, disposition, building, community, imageSrc, imageAlt, price, funded, myStake, totalBalance, sqft }: PropertyCardProps) => {
    const [open, setOpen] = useState(false)
    const cancelButtonRef = useRef(null)

    return (
        <>
            <div key={id} className="group relative flex flex-col overflow-hidden rounded-lg bg-white">
                <a href={"/properties/" + id} className="h-[250px] bg-gray-200 group-hover:opacity-75 sm:h-60 relative">
                    <img src={imageSrc} alt={imageAlt} className="h-full w-full object-cover object-center sm:h-full " />
                    {price !== funded &&
                        <div className="absolute top-0 p-1 bg-gray-900/80 w-full">
                            <h1 className="flex justify-center items-center">
                                <div className='text-white font-semibold text-md mr-2'>Minting Live</div>
                                <FireIcon className="text-indigo-600 block h-4 w-4" />
                            </h1>
                        </div>
                    }
                </a>
                <a href={"/properties/" + id} className="flex flex-1 flex-col space-y-4 px-4 pt-4 justify-end">
                    <p className="flex-1 text-xl font-medium text-gray-900">{disposition + " in " + building + ", " + community + ", Dubai"}</p>
                    <div className="flex flex-col space-y-2">
                        <div className="flex flex-row justify-between items-end">
                            <p className="text-xl font-medium text-indigo-600">{currencyformatter.format(price)}</p>
                            <p className="text-sm font-medium text-gray-600">{percentageZeroDecimalsFormatter.format(funded / price) + " funded"}</p>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                            <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: percentageSixDecimalsFormatter.format(funded / price) }}></div>
                        </div>
                    </div>
                    <section className="rounded-lg bg-gray-50 p-3">
                        <dl className="space-y-2">
                            <div className="flex items-center justify-between">
                                <dt className="flex text-sm text-gray-600">Property Type</dt>
                                <dd className="text-sm font-medium text-gray-900">Apartment</dd>
                            </div>
                            <div className="flex items-center justify-between">
                                <dt className="text-sm text-gray-600">Property Size</dt>
                                <dd className="text-sm font-medium text-gray-900">{numberFormatter.format(sqft * 0.09290304) + " square meters"}</dd>
                            </div>
                            <div className="flex items-center justify-between">
                                <dt className="flex items-center text-sm text-gray-600">Price per square meter</dt>
                                <dd className="text-sm font-medium text-gray-900">{currencyformatter.format(price / sqft / 0.09290304)}</dd>
                            </div>
                            <div className="flex items-center justify-between">
                                <dt className="flex text-sm text-gray-600">Expected Rental Yield</dt>
                                <dd className="text-sm font-medium text-gray-900">9.84%</dd>
                            </div>
                            <div className="flex items-center justify-between">
                                <dt className="flex text-sm text-gray-600">Owned Shares</dt>
                                <dd className="text-sm font-medium text-gray-900">{(myStake) ? numberFormatter.format(Number(myStake)) : 0}</dd>
                            </div>
                            <div className="flex items-center justify-between">
                                <dt className="flex text-sm text-gray-600">Total Shares</dt>
                                <dd className="text-sm font-medium text-gray-900">{(totalBalance) ? numberFormatter.format(Number(totalBalance)) : 0}</dd>
                            </div>
                        </dl>
                    </section>
                    <a className='hidden flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>Mint</a>
                </a>
                <div className="grid grid-cols-3 gap-4 p-4 justify-end">
                    <button type="button" onClick={() => setOpen(true)} className="w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base text-center font-medium text-white hover:bg-indigo-700">Mint</button>
                    <button type="button" disabled className="w-full items-center justify-center rounded-md border border-transparent bg-gray-600 px-4 py-3 text-base text-center font-medium text-white">Stake</button>
                    <button type="button" disabled className="w-full items-center justify-center rounded-md border border-transparent bg-gray-600 px-4 py-3 text-base text-center font-medium text-white">Unstake</button>
                </div>
            </div>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                    <div>
                                        <div className="mt-3 text-center sm:mt-5">
                                            <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">Mint</Dialog.Title>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius aliquam laudantium explicabo
                                                    pariatur iste dolorem animi vitae error totam. At sapiente aliquam accusamus facere veritatis.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-5 sm:mt-6">
                                        <MintNftButton id={id} />
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    );
}

export default PropertyCard;