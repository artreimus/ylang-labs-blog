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

const CustomNavbarLogo = () => {
  return (
    <Link href="/" aria-label={siteMetadata.headerTitle}>
      <div className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 font-sans text-base font-normal text-black dark:text-white">
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

  let navbarClass = ''
  if (siteMetadata.stickyNav) {
    navbarClass = 'sticky top-0 z-50'
  }

  return (
    <div className="relative w-full">
      <Navbar className={navbarClass}>
        {/* Desktop Navigation */}
        <NavBody>
          <CustomNavbarLogo />
          <NavItems items={navItems} />
          <div className="relative z-[70] flex items-center gap-4">
            <SearchButton />
            <ThemeSwitch />
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <CustomNavbarLogo />
            <div className="relative z-[70] flex items-center gap-2">
              <SearchButton />
              <ThemeSwitch />
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
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  )
}

export default Header
