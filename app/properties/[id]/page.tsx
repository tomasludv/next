'use client';

import { useEffect, useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import MintNftButton from '../../../components/MintNftButton'

const product = {
    name: '1 Bed In West Avenue, Dubai Marina (206)',
    price: '$192',
    colors: [
        { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
        { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
        { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
    ],
    sizes: [
        { name: 'XXS', inStock: false },
        { name: 'XS', inStock: true },
        { name: 'S', inStock: true },
        { name: 'M', inStock: true },
        { name: 'L', inStock: true },
        { name: 'XL', inStock: true },
        { name: '2XL', inStock: true },
        { name: '3XL', inStock: true },
    ],
    description:
        'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
    highlights: [
        'Hand cut and sewn locally',
        'Dyed with our proprietary colors',
        'Pre-washed & pre-shrunk',
        'Ultra-soft 100% cotton',
    ],
    details:
        'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
}
const reviews = { href: '#', average: 4, totalCount: 117 }

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

interface NftData {
    id: string;
    name: string;
    price: string;
    options: string;
    chainId: number;
    original: string;
    images: string[];
}

export default function Example({ params }: { params: { id: string } }) {
    const [nftJson, setNftJson] = useState<NftData>();

    const [selectedColor, setSelectedColor] = useState(product.colors[0])
    const [selectedSize, setSelectedSize] = useState(product.sizes[2])

    const getNftJson = async () => {
        const response = await fetch('/api');
        const body = await response.json();
        setNftJson(body[params.id]);
    }

    useEffect(() => {
        getNftJson();
    }, [])

    return (
        <div className="">
            {/* Image gallery */}
            <div className="mx-autoxxx mt-6 max-w-2xl sm:px-6 grid gap-x-4 grid-cols-5 grid lg:grid lg:max-w-7xl lg:grid-cols-5 lg:gap-x-6 lg:px-8">
                <div className="col-span-2 aspect-h-4 aspect-w-4 hiddenxxx overflow-hidden rounded-lg lg:block">
                    <img
                        src={nftJson?.images[0]}
                        alt={nftJson?.images[0]}
                        className="h-full w-full object-cover object-center"
                    />
                </div>
                <div className="hiddenxxx grid lg:grid lg:grid-cols-1 gap-y-4 lg:gap-y-6">
                    <div className="aspect-h-2 aspect-w-2 overflow-hidden rounded-lg">
                        <img
                            src={nftJson?.images[1]}
                            alt={nftJson?.images[1]}
                            className="h-full w-full object-cover object-center"
                        />
                    </div>
                    <div className="aspect-h-2 aspect-w-2 overflow-hidden rounded-lg">
                        <img
                            src={nftJson?.images[2]}
                            alt={nftJson?.images[2]}
                            className="h-full w-full object-cover object-center"
                        />
                    </div>
                </div>
                <div className="hiddenxxx grid lg:grid lg:grid-cols-1 gap-y-4 lg:gap-y-6">
                    <div className="aspect-h-2 aspect-w-2 overflow-hidden rounded-lg">
                        <img
                            src={nftJson?.images[3]}
                            alt={nftJson?.images[3]}
                            className="h-full w-full object-cover object-center"
                        />
                    </div>
                    <div className="aspect-h-2 aspect-w-2 overflow-hidden rounded-lg">
                        <img
                            src={nftJson?.images[4]}
                            alt={nftJson?.images[4]}
                            className="h-full w-full object-cover object-center"
                        />
                    </div>
                </div>
                <div className="hiddenxxx grid lg:grid lg:grid-cols-1 gap-y-4 lg:gap-y-6">
                    <div className="aspect-h-2 aspect-w-2 overflow-hidden rounded-lg">
                        <img
                            src={nftJson?.images[5]}
                            alt={nftJson?.images[5]}
                            className="h-full w-full object-cover object-center"
                        />
                    </div>
                    <div className="aspect-h-2 aspect-w-2 overflow-hidden rounded-lg">
                        <img
                            src={nftJson?.images[6]}
                            alt={nftJson?.images[6]}
                            className="h-full w-full object-cover object-center"
                        />
                    </div>
                </div>
            </div>

            {/* Product info */}
            <div className="mx-autoxxx max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.name}</h1>
                </div>

                {/* Options */}
                <div className="mt-4 lg:row-span-3 lg:mt-0">
                    <h2 className="sr-only">Product information</h2>
                    <p className="text-3xl tracking-tight text-gray-900">{nftJson?.price}</p>
                    <MintNftButton id={params.id} />

                    <form className="mt-10">
                        {/* Colors */}
                        <div>
                            <h3 className="text-sm font-medium text-gray-900">Color</h3>

                            <RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-4">
                                <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
                                <div className="flex items-center space-x-3">
                                    {product.colors.map((color) => (
                                        <RadioGroup.Option
                                            key={color.name}
                                            value={color}
                                            className={({ active, checked }) =>
                                                classNames(
                                                    color.selectedClass,
                                                    active && checked ? 'ring ring-offset-1' : '',
                                                    !active && checked ? 'ring-2' : '',
                                                    'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
                                                )
                                            }
                                        >
                                            <RadioGroup.Label as="span" className="sr-only">
                                                {color.name}
                                            </RadioGroup.Label>
                                            <span
                                                aria-hidden="true"
                                                className={classNames(
                                                    color.class,
                                                    'h-8 w-8 rounded-full border border-black border-opacity-10'
                                                )}
                                            />
                                        </RadioGroup.Option>
                                    ))}
                                </div>
                            </RadioGroup>
                        </div>

                        {/* Sizes */}
                        <div className="mt-10">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-medium text-gray-900">Size</h3>
                                <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                    Size guide
                                </a>
                            </div>

                            <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-4">
                                <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                                <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                                    {product.sizes.map((size) => (
                                        <RadioGroup.Option
                                            key={size.name}
                                            value={size}
                                            disabled={!size.inStock}
                                            className={({ active }) =>
                                                classNames(
                                                    size.inStock
                                                        ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                                                        : 'cursor-not-allowed bg-gray-50 text-gray-200',
                                                    active ? 'ring-2 ring-indigo-500' : '',
                                                    'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                                                )
                                            }
                                        >
                                            {({ active, checked }) => (
                                                <>
                                                    <RadioGroup.Label as="span">{size.name}</RadioGroup.Label>
                                                    {size.inStock ? (
                                                        <span
                                                            className={classNames(
                                                                active ? 'border' : 'border-2',
                                                                checked ? 'border-indigo-500' : 'border-transparent',
                                                                'pointer-events-none absolute -inset-px rounded-md'
                                                            )}
                                                            aria-hidden="true"
                                                        />
                                                    ) : (
                                                        <span
                                                            aria-hidden="true"
                                                            className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                                        >
                                                            <svg
                                                                className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                                                viewBox="0 0 100 100"
                                                                preserveAspectRatio="none"
                                                                stroke="currentColor"
                                                            >
                                                                <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                                                            </svg>
                                                        </span>
                                                    )}
                                                </>
                                            )}
                                        </RadioGroup.Option>
                                    ))}
                                </div>
                            </RadioGroup>
                        </div>

                        <button
                            type="submit"
                            className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Add to bag
                        </button>
                    </form>
                </div>

                <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                    {/* Description and details */}
                    <div>
                        <h3 className="sr-only">Description</h3>

                        <div className="space-y-6">
                            <p className="text-base text-gray-900">{product.description}</p>
                        </div>
                    </div>

                    <div className="mt-10">
                        <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

                        <div className="mt-4">
                            <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                                {product.highlights.map((highlight) => (
                                    <li key={highlight} className="text-gray-400">
                                        <span className="text-gray-600">{highlight}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="mt-10">
                        <h2 className="text-sm font-medium text-gray-900">Details</h2>

                        <div className="mt-4 space-y-6">
                            <p className="text-sm text-gray-600">{product.details}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
