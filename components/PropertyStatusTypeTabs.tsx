import { usePathname } from 'next/navigation';

const tabs = [
    { name: 'Live', href: '/', current: false },
    { name: 'Funded', href: '/funded', current: false },
    { name: 'Exited', href: '/exited', current: true },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function TypeTab() {
    const path = usePathname()

    return (
        <div className='mb-6 hidden'>
            <div className='flex'>
                <nav className="flex shrink space-x-1 p-1 bg-white rounded-full" aria-label="Tabs">
                    {tabs.map((tab) => (
                        <a key={tab.name} href={tab.href} className={classNames(tab.href === path ? 'bg-indigo-600 text-white' : 'text-gray-900 hover:text-gray-700', 'min-w-40 rounded-full p-2 text-sm font-medium text-center hover:bg-black hover:text-white')} aria-current={tab.current ? 'page' : undefined}>{tab.name}</a>
                    ))}
                </nav>
            </div>
        </div>
    )
}