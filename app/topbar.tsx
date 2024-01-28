import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Topbar() {
    const product = {
        name: '1 Bed In West Avenue, Dubai Marina (206)',
        breadcrumbs: [
            { id: 1, name: 'Properties', href: '/' },
        ]
    }

    return (
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-bxxx border-gray-200 bg-white px-4 shadow-smxxx sm:gap-x-6 sm:px-6 lg:px-8">
            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                <div className="flex items-center flex-1 gap-x-4 lg:gap-x-6">
                    <nav aria-label="Breadcrumb">
                        <ol role="list" className="mx-autoxxx flex max-w-2xl items-center space-x-2 px-4xxx sm:px-6xxx lg:max-w-7xl lg:px-8xxx">
                            {product.breadcrumbs.map((breadcrumb) => (
                                <li key={breadcrumb.id}>
                                    <div className="flex items-center">
                                        <a href={breadcrumb.href} className="mr-2 text-sm font-medium text-gray-900">
                                            {breadcrumb.name}
                                        </a>
                                        <svg
                                            width={16}
                                            height={20}
                                            viewBox="0 0 16 20"
                                            fill="currentColor"
                                            aria-hidden="true"
                                            className="h-5 w-4 text-gray-300"
                                        >
                                            <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                        </svg>
                                    </div>
                                </li>
                            ))}
                            <li className="text-sm">
                                <a href="/properties/0" aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                                    {product.name}
                                </a>
                            </li>
                        </ol>
                    </nav>
                </div>
                <div className="flex items-center gap-x-4 lg:gap-x-6">
                    <ConnectButton />
                </div>
            </div>
        </div>
    )
}