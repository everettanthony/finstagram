import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

export default function Search() {
    return (
        <div className="relative">
          <div className="absolute top-2.5 left-3">
            <MagnifyingGlassIcon className="h-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search"
            className="bg-gray-50 h-10 lg:w-[300px] pl-11 pb-0.5 border border-gray-300 text-md outline-none rounded-md focus:placeholder-transparent"
          />
        </div>
    )
}