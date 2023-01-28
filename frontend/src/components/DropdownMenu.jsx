/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";

export default function DropdownMenu({ onChange, title, type, data, icon }) {
  const [itemWithCheck, setItemWithCheck] = useState(data);

  // SEND ITEM WITH CHECK TO PARENT
  useEffect(() => {
    if (itemWithCheck === data || itemWithCheck.length === 0) return;
    onChange(itemWithCheck);
  }, [itemWithCheck]);

  // TRANSFORM ITEM TO ITEM WITH CHECK
  useEffect(() => {
    if (itemWithCheck.length > 0) return;
    setItemWithCheck(data);
  }, [data]);

  // HANDLE CHECKBOX CHANGE
  const handleCheckbox = (index) => {
    const newItems = [...itemWithCheck];
    newItems[index].isChecked = !newItems[index].isChecked;
    setItemWithCheck(newItems);
  };

  const handleCheckAll = () => {
    const newItems = [...itemWithCheck];
    newItems.forEach((item) => {
      item.isChecked = true;
    });
    setItemWithCheck(newItems);
  };

  const handleReset = () => {
    const newItems = [...itemWithCheck];
    newItems.forEach((item) => {
      item.isChecked = false;
    });
    setItemWithCheck(newItems);
  };

  // HANDLE RADIO CHANGE
  const handleRadio = (index) => {
    const newItems = [...itemWithCheck];
    newItems.forEach((item) => {
      item.isChecked = false;
    });
    newItems[index].isChecked = true;
    setItemWithCheck(newItems);
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className=" hover:border-blue-500 border-transparent hover:text-blue-500 text-blue-700 group inline-flex gap-2 items-center py-4 px-1 border-b-2 font-medium text-sm">
          {icon}
          {title}
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
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
        <Menu.Items
          className={`z-10 origin-top-right absolute ${
            type === "checkbox" ? "right-0" : "left-0"
          } sm:left-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-2 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none text-gray-800`}
        >
          {type === "checkbox" && (
            <div>
              <div className="flex divide-x ">
                <button
                  type="button"
                  onClick={handleCheckAll}
                  className="group flex justify-center w-full px-2 py-2 text-base hover:bg-gray-100"
                >
                  Tous
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="group flex justify-center w-full px-2 py-2 text-base hover:bg-gray-100"
                >
                  Aucun
                </button>
              </div>
            </div>
          )}
          {itemWithCheck.map(
            (item, index) =>
              item.available && (
                <div
                  key={item.id}
                  className="relative flex items-start px-4 py-2 hover:bg-gray-100"
                >
                  <div className="min-w-0 flex-1 text-base ">
                    <label
                      htmlFor={item.id}
                      className="font-medium text-gray-700 select-none"
                    >
                      {item.name}
                    </label>
                  </div>
                  <div className="ml-3 flex items-center h-5">
                    {type === "checkbox" ? (
                      <input
                        id={item.id}
                        value=""
                        type="checkbox"
                        checked={item.isChecked}
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        onChange={() => handleCheckbox(index)}
                      />
                    ) : (
                      <input
                        id={item.id}
                        value=""
                        checked={item.isChecked}
                        type="radio"
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        onChange={() => handleRadio(index)}
                      />
                    )}
                  </div>
                </div>
              )
          )}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
