'use client'
import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'
import DynamicLogo from './DynamicLogo'
import Link from './Link'
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from '@/components/ui/resizable-navbar'
import { useState } from 'react'
import { useKBar, VisualState } from 'kbar'

const CustomNavbarLogo = () => {
  return (
    <div className="relative z-50">
      <Link
        href="/"
        aria-label={siteMetadata.headerTitle}
        className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-primary-400 dark:focus-visible:ring-offset-gray-950"
      >
        <div className="flex h-20 items-center">
          <DynamicLogo />
        </div>
      </Link>
    </div>
  )
}

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const mobileMenuId = 'mobile-navigation-menu'

  const navItems = headerNavLinks
    .filter((link) => link.href !== '/')
    .map((link) => ({
      name: link.title,
      link: link.href,
    }))

  const navbarClass = 'fixed inset-x-0 top-0 z-50'

  const { visualState } = useKBar((state) => ({
    visualState: state.visualState,
  }))

  return (
    <div
      className={`relative w-full ${
        visualState === VisualState.showing || visualState === VisualState.animatingIn ? 'z-40' : ''
      }`}
    >
      <Navbar
        className={`${navbarClass} transition-opacity duration-300 motion-reduce:transition-none ${
          visualState === VisualState.showing || visualState === VisualState.animatingIn
            ? 'pointer-events-none opacity-0'
            : 'opacity-100'
        }`}
      >
        {/* Desktop Navigation */}
        <NavBody>
          <CustomNavbarLogo />
          <NavItems items={navItems} />
          <div className="relative z-[70] flex items-center gap-4">
            <SearchButton />
            <div className="ml-4">
              <ThemeSwitch />
            </div>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <CustomNavbarLogo />
            <div className="relative z-[70] flex items-center gap-2">
              <MobileNavToggle
                controlsId={mobileMenuId}
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </div>
          </MobileNavHeader>

          <MobileNavMenu
            id={mobileMenuId}
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            <div className="flex w-full flex-col">
              {navItems.map((item, idx) => (
                <Link
                  key={`mobile-link-${idx}`}
                  href={item.link}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full rounded-lg px-2 font-sans text-base font-medium leading-[64px] text-gray-900 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 motion-reduce:transition-none dark:text-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 dark:focus-visible:ring-primary-400"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            {/* Control Center Footer */}
            <div className="mt-4 grid w-full grid-cols-2 gap-4 border-t border-gray-100 pt-4 dark:border-white/10">
              {/* Theme Switcher Block */}
              <ThemeSwitch mobile />

              {/* Search Block */}
              <div
                className="flex w-full cursor-pointer items-center justify-center"
                onClickCapture={() => setIsMobileMenuOpen(false)}
              >
                <SearchButton mobile />
              </div>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  )
}

export default Header
