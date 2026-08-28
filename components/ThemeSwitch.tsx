'use client'

import { Fragment, useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Menu, Transition } from '@headlessui/react'

const Sun = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="group:hover:text-gray-100 h-6 w-6"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
      clipRule="evenodd"
    />
  </svg>
)
const Moon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="group:hover:text-gray-100 h-6 w-6"
    aria-hidden="true"
  >
    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
  </svg>
)
const Monitor = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="group:hover:text-gray-100 h-6 w-6"
    aria-hidden="true"
  >
    <rect x="3" y="3" width="14" height="10" rx="2" ry="2"></rect>
    <line x1="7" y1="17" x2="13" y2="17"></line>
    <line x1="10" y1="13" x2="10" y2="17"></line>
  </svg>
)
const Blank = () => <svg className="h-6 w-6" />

const themeOptions = [
  { value: 'light', label: 'Light', Icon: Sun },
  { value: 'dark', label: 'Dark', Icon: Moon },
  { value: 'system', label: 'System', Icon: Monitor },
]

const ThemeSwitch = ({ mobile = false }: { mobile?: boolean }) => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), [])

  const dropdownClasses = mobile
    ? 'absolute left-0 bottom-full z-50 mb-2 w-full origin-bottom rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800'
    : 'absolute right-0 z-50 mt-2 w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800'

  return (
    <div className={mobile ? 'w-full' : 'flex items-center'}>
      <Menu as="div" className={`relative ${mobile ? 'block w-full' : 'inline-block text-left'}`}>
        <div
          className={
            mobile
              ? ''
              : 'flex items-center justify-center hover:text-primary-500 dark:hover:text-primary-400'
          }
        >
          <Menu.Button
            aria-label="Theme switcher"
            className={
              mobile
                ? 'flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-2 dark:bg-white/5 dark:focus-visible:ring-primary-300 dark:focus-visible:ring-offset-gray-950'
                : 'flex h-10 w-10 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 focus-visible:ring-offset-2 dark:focus-visible:ring-primary-300 dark:focus-visible:ring-offset-gray-950'
            }
          >
            {mounted ? resolvedTheme === 'dark' ? <Moon /> : <Sun /> : <Blank />}
            {mobile && (
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Theme</span>
            )}
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100 motion-reduce:transition-none"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75 motion-reduce:transition-none"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className={dropdownClasses}>
            <div className="p-1">
              {themeOptions.map(({ value, label, Icon }) => (
                <Menu.Item key={value}>
                  {({ active }) => (
                    <button
                      type="button"
                      onClick={() => setTheme(value)}
                      aria-current={theme === value ? 'true' : undefined}
                      className={`${
                        active || theme === value
                          ? 'bg-primary-500 text-gray-950'
                          : 'text-gray-900 dark:text-gray-100'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-700 dark:focus-visible:ring-primary-300`}
                    >
                      <span className="mr-2">
                        <Icon />
                      </span>
                      {label}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

export default ThemeSwitch
