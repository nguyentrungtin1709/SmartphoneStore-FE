import {Link, Outlet, useLoaderData, useSearchParams} from "react-router-dom";
import {Fragment, useEffect, useState} from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import {useAxios} from "../hooks/useAxios.jsx";
import {getPrice} from "../utils/getPrice.jsx";
import CircularProgress from "@mui/material/CircularProgress";

function Smartphones(){
    const data = useLoaderData()
    const products = data.content
    const [loading, setLoading] = useState(true)
    const [searchParams, setSearchParams] = useSearchParams()
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const [brands, setBrands] = useState([])
    const [sortOptions, setSortOptions] = useState([
        { id: '0', name: 'Mới nhất' },
        { id: '1', name: 'Giá: Thấp đến cao' },
        { id: '2', name: 'Giá: Cao đến thấp' },
    ])
    const sortCurrent = searchParams.get("sort") != null ? searchParams.get("sort") : '0'
    const brandCurrent = searchParams.get("brand") != null ? Number(searchParams.get("brand")) : 0
    const [filters, setFilters] = useState([
        {
            id: 'price',
            name: 'Giá bán',
            options: [
                { value: '{"min":"0","max":"100"}', label: 'Tất cả' },
                { value: '{"min":"0","max":"2"}', label: 'Dưới 2 triệu' },
                { value: '{"min":"2","max":"4"}', label: 'Từ 2 - 4 triệu' },
                { value: '{"min":"4","max":"7"}', label: 'Từ 4 - 7 triệu' },
                { value: '{"min":"7","max":"13"}', label: 'Từ 7 - 13 triệu' },
                { value: '{"min":"13","max":"100"}', label: 'Từ 13 triệu' },
            ],
        }
    ])
    const [price, setPrice] = useState(() => {
        const min = searchParams.get("min") != null ? searchParams.get("min") : '0'
        const max = searchParams.get("max") != null ? searchParams.get("max") : '100'
        return {
            min,
            max
        }

    })

    const parse = (data) => {
        return JSON.parse(data)
    }

    const isChecked = (input, price) => {
        return input.min === price.min && input.max === price.max
    }

    useEffect(() => {
        useAxios()
            .get("/api/v1/brands")
            .then(response => {
                const items = [{
                    id: 0,
                    name: "Tất cả"
                }]
                items.push(...response.data)
                setBrands(items)
            })
        window.scrollTo(0, 0)
        setTimeout(() => {
            setLoading(false)
        }, 500)
    }, [])

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    const handleSort = (id) => {
        setSearchParams( (params) => {
            params.set("sort", id)
            return params
        })
    }

    const handleBrandFilter = (id) => {
        setSearchParams((params) => {
            if (id === 0){
                params.delete("brand")
            } else {
                params.set("brand", id)
            }
            return params
        })
    }

    const handlePriceFilter = ({ min, max }) => {
        setSearchParams((params) => {
            params.set("min", min)
            params.set("max", max)
            return params
        })
    }

    const handlePagination = () => {
        setSearchParams((params) => {
            const size = data.numberOfElements + 8
            params.set("size", size.toString())
            return params
        })
    }

    return (
        <>
            {loading ?
                <div className="flex flex-row justify-center items-center w-full min-h-screen">
                    <CircularProgress />
                </div> :
                <div className="bg-gray-50 text-gray-600">
                    <div>
                        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                            <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
                                <Transition.Child
                                    as={Fragment}
                                    enter="transition-opacity ease-linear duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="transition-opacity ease-linear duration-300"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                                </Transition.Child>

                                <div className="fixed inset-0 z-40 flex">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="transition ease-in-out duration-300 transform"
                                        enterFrom="translate-x-full"
                                        enterTo="translate-x-0"
                                        leave="transition ease-in-out duration-300 transform"
                                        leaveFrom="translate-x-0"
                                        leaveTo="translate-x-full"
                                    >
                                        <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                                            <div className="flex items-center justify-between px-4">
                                                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                                                <button
                                                    type="button"
                                                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                                    onClick={() => setMobileFiltersOpen(false)}
                                                >
                                                    <span className="sr-only">Close menu</span>
                                                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                </button>
                                            </div>

                                            {/* Filters */}
                                            <form className="mt-4 border-t border-gray-200">
                                                <h3 className="sr-only">Categories</h3>
                                                <ul role="list" className="px-2 py-3 font-medium text-gray-900">
                                                    {brands.map((brand) => (
                                                        <li key={brand.id}>
                                                            <p
                                                                className={`block px-2 py-3 hover:text-purple-600 
                                                        cursor-pointer ${brandCurrent === brand.id ? "text-purple-600" : ""}`}
                                                                onClick={() => {
                                                                    handleBrandFilter(brand.id)
                                                                }}
                                                            >
                                                                {brand.name}
                                                            </p>
                                                        </li>
                                                    ))}
                                                </ul>

                                                {filters.map((section) => (
                                                    <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                                                        {({ open }) => (
                                                            <>
                                                                <h3 className="-mx-2 -my-3 flow-root">
                                                                    <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                                                        <span className="font-medium text-gray-900">{section.name}</span>
                                                                        <span className="ml-6 flex items-center">
                              {open ? (
                                  <MinusIcon className="h-5 w-5" aria-hidden="true" />
                              ) : (
                                  <PlusIcon className="h-5 w-5" aria-hidden="true" />
                              )}
                            </span>
                                                                    </Disclosure.Button>
                                                                </h3>
                                                                <Disclosure.Panel className="pt-6">
                                                                    <div className="space-y-6">
                                                                        {section.options.map((option, optionIdx) => (
                                                                            <div key={option.value} className="flex items-center">
                                                                                <input
                                                                                    id={`filter-mobile-${section.id}-${optionIdx}`}
                                                                                    name={`${section.id}[]`}
                                                                                    value={option.value}
                                                                                    type="radio"
                                                                                    defaultChecked={isChecked(
                                                                                        parse(option.value),
                                                                                        price
                                                                                    )}
                                                                                    onClick={(e) => {
                                                                                        const price = parse(e.target.value )
                                                                                        handlePriceFilter(price)
                                                                                    }}
                                                                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                                />
                                                                                <label
                                                                                    htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                                                                    className="ml-3 min-w-0 flex-1 text-gray-500"
                                                                                >
                                                                                    {option.label}
                                                                                </label>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </Disclosure.Panel>
                                                            </>
                                                        )}
                                                    </Disclosure>
                                                ))}
                                            </form>
                                        </Dialog.Panel>
                                    </Transition.Child>
                                </div>
                            </Dialog>
                        </Transition.Root>

                        <main className="mx-auto max-w-full px-4 sm:px-6 lg:px-2">
                            <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-10">
                                <Link to="/smartphones">
                                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 hover:text-purple-600">
                                        Sản phẩm
                                    </h1>
                                </Link>

                                <div className="flex items-center">
                                    <Menu as="div" className="relative inline-block text-left">
                                        <div>
                                            <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                                Sort
                                                <ChevronDownIcon
                                                    className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                                    aria-hidden="true"
                                                />
                                            </Menu.Button>
                                        </div>

                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                <div className="py-1">
                                                    {sortOptions.map((option) => (
                                                        <Menu.Item key={option.id}>
                                                            {({ active }) => (
                                                                <p
                                                                    className={classNames(
                                                                        option.id === sortCurrent ? 'font-medium text-purple-600' : 'text-gray-500',
                                                                        active ? 'bg-gray-100' : '',
                                                                        'block px-4 py-2 text-sm hover:text-purple-600'
                                                                    )}
                                                                    onClick={() => {
                                                                        handleSort(option.id)
                                                                    }}
                                                                >
                                                                    {option.name}
                                                                </p>
                                                            )}
                                                        </Menu.Item>
                                                    ))}
                                                </div>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                    <button
                                        type="button"
                                        className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                                        onClick={() => setMobileFiltersOpen(true)}
                                    >
                                        <span className="sr-only">Filters</span>
                                        <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                                    </button>
                                </div>
                            </div>

                            <section aria-labelledby="products-heading" className="pb-8 pt-6">
                                <h2 id="products-heading" className="sr-only">
                                    Products
                                </h2>

                                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
                                    {/* Filters */}
                                    <form className="hidden lg:block">
                                        <h3 className="sr-only">Categories</h3>
                                        <ul role="list" className="space-y-4 border-b border-r border-gray-200 pb-6 text-lg font-medium text-gray-900">
                                            {brands.map((brand) => (
                                                <li
                                                    key={brand.id}
                                                    className={`flex items-center bg-white w-1/2 px-2 py-2 
                                            rounded-md drop-shadow-xl hover:text-purple-600 cursor-pointer ${brandCurrent === brand.id ? "text-purple-600" : ""}`}
                                                    onClick={() => {
                                                        handleBrandFilter(brand.id)
                                                    }}
                                                >
                                                    <p >{brand.name}</p>
                                                </li>
                                            ))}
                                        </ul>

                                        {filters.map((section) => (
                                            <Disclosure as="div" key={section.id} className="border-gray-200 py-6">
                                                {({ open }) => (
                                                    <>
                                                        <h3 className="-my-3 flow-root">
                                                            <Disclosure.Button className="flex w-full items-center justify-between rounded-md px-1 bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                                                <span className="font-medium text-gray-900">{section.name}</span>
                                                                <span className="ml-6 flex items-center">
                          {open ? (
                              <MinusIcon className="h-5 w-5" aria-hidden="true" />
                          ) : (
                              <PlusIcon className="h-5 w-5" aria-hidden="true" />
                          )}
                        </span>
                                                            </Disclosure.Button>
                                                        </h3>
                                                        <Disclosure.Panel className="pt-6">
                                                            <div className="space-y-4">
                                                                {section.options.map((option, optionIdx) => (
                                                                    <div key={option.value} className="flex items-center">
                                                                        <input
                                                                            id={`filter-${section.id}-${optionIdx}`}
                                                                            name={`${section.id}[]`}
                                                                            value={option.value}
                                                                            defaultChecked={isChecked(
                                                                                parse(option.value),
                                                                                price
                                                                            )}
                                                                            type="radio"
                                                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                            onClick={(e) => {
                                                                                const price = parse(e.target.value )
                                                                                handlePriceFilter(price)
                                                                            }}
                                                                        />
                                                                        <label
                                                                            htmlFor={`filter-${section.id}-${optionIdx}`}
                                                                            className="ml-3 text-sm text-gray-600"
                                                                        >
                                                                            {option.label}
                                                                        </label>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </Disclosure.Panel>
                                                    </>
                                                )}
                                            </Disclosure>
                                        ))}
                                    </form>
                                    {
                                        products.length === 0 ?
                                            <div className="bg-white lg:col-span-4 flex items-center justify-center min-h-screen">
                                                <h1 className="text-xl">
                                                    Không tìm thấy sản phẩm
                                                </h1>
                                            </div> :
                                            <div className="lg:col-span-4">
                                                <div className="bg-white rounded-lg">
                                                    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">

                                                        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 lg:grid-cols-3 2xl:grid-cols-4 xl:gap-x-8">
                                                            {products.map((product) => (
                                                                <div key={product.id} className="group relative">
                                                                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                                                        <img
                                                                            src={product.imageUrl}
                                                                            alt={product.name}
                                                                            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                                                        />
                                                                    </div>
                                                                    <div className="mt-4 flex justify-between">
                                                                        <div>
                                                                            <h3 className="text-sm">
                                                                                <Link to={`/smartphones/${product.id}`}>
                                                                                    <span aria-hidden="true" className="absolute inset-0" />
                                                                                    {product.name}
                                                                                </Link>
                                                                            </h3>
                                                                        </div>
                                                                        <p className="text-sm font-medium text-gray-900 ml-2">{getPrice(product.price)}</p>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                    }
                                </div>
                            </section>
                        </main>
                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
                            <div className="invisible">
                            </div>
                            <div className="lg:col-span-4 flex flex-row justify-center items-center mb-8">
                                <button className="flex items-center px-4 py-2 rounded-lg hover:bg-purple-700 hover:text-white bg-purple-500 text-white
                        disabled:bg-gray-400 disabled:text-stone-900" disabled={data.last}
                                        onClick={handlePagination}
                                >
                                    Xem thêm
                                    {!data.last &&
                                        <span className="ml-1">
                                    ({data.totalElements - data.numberOfElements})
                                </span>
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Smartphones