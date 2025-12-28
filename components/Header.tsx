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
    <Link href="/" aria-label={siteMetadata.headerTitle}>
      <div className="flex h-20 items-center">
        <DynamicLogo />
      </div>
    </Link>
  )
}

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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
        className={`${navbarClass} transition-opacity duration-300 ${
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
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </div>
          </MobileNavHeader>

          <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
            <div className="flex w-full flex-col">
              {navItems.map((item, idx) => (
                <Link
                  key={`mobile-link-${idx}`}
                  href={item.link}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full font-sans text-base font-medium leading-[64px] text-gray-900 transition-colors duration-200 hover:text-gray-600 dark:text-gray-100 dark:hover:text-gray-300"
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
