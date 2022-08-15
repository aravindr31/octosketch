import React, { Fragment, useEffect, useState } from "react";
import { BsCheckAll } from "react-icons/bs";
import { TbSelector } from "react-icons/tb";
import { Listbox, Transition } from "@headlessui/react";

const property = [
  { stars: "stargazers_count" },
  { forks: "Fork" },
  { size: "size" },
];
function Dropdown({ dropdownToRepo }) {
  const [selected, setSelected] = useState(property[0]);

  useEffect(() => {
    dropdownToRepo(Object.entries(selected));
  }, [selected, dropdownToRepo]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative mt-1 w-[100px]">
        <Listbox.Button className="relative w-full cursor-default rounded-md  py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm bg-green-50">
          <span className="block truncate text-green-500">
            {Object.keys(selected)[0]}
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <TbSelector className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {property.map((person, personIdx) => (
              <Listbox.Option
                key={personIdx}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? "bg-green-100 text-black" : "text-gray-900"
                  }`
                }
                value={person}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium text-green-500" : "font-normal"
                      }`}
                    >
                      {Object.keys(person)[0]}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-green-600">
                        <BsCheckAll
                          className="h-5 w-5 text-green-400"
                          aria-hidden="true"
                        />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}

export default Dropdown;
