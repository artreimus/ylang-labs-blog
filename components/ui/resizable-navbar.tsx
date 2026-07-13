'use client'
import { IconMenu2, IconX } from '@tabler/icons-react'
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
} from 'motion/react'

import React, { useRef, useState, useEffect } from 'react'
import { cn } from '../lib/utils'

interface NavbarProps {
  children: React.ReactNode
  className?: string
}

interface NavBodyProps {
  children: React.ReactNode
  className?: string
  visible?: boolean
}

interface NavItemsProps {
  items: {
    name: string
    link: string
  }[]
  className?: string
  onItemClick?: () => void
}

interface MobileNavProps {
  children: React.ReactNode
  className?: string
  visible?: boolean
}

interface MobileNavHeaderProps {
  children: React.ReactNode
  className?: string
}

interface MobileNavMenuProps {
  children: React.ReactNode
  className?: string
  id: string
  isOpen: boolean
  onClose: () => void
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const shouldReduceMotion = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollY } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const [visible, setVisible] = useState<boolean>(false)
  const [hidden, setHidden] = useState<boolean>(false)
  const lastScrollY = useRef(0)

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (latest > 100) {
      setVisible(true)
    } else {
      setVisible(false)
    }

    if (shouldReduceMotion) {
      setHidden(false)
    } else {
      const delta = latest - lastScrollY.current
      if (latest > 120 && delta > 5) {
        setHidden(true)
      } else if (delta < -5) {
        setHidden(false)
      }
    }
    lastScrollY.current = latest
  })

  return (
    <motion.header
      ref={ref}
      // IMPORTANT: Change this to class of `fixed` if you want the navbar to be fixed
      className={cn('sticky inset-x-0 top-20 z-20 w-full', className)}
      animate={{ y: shouldReduceMotion ? '0%' : hidden ? '-120%' : '0%' }}
      transition={
        shouldReduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 300, damping: 30 }
      }
      onFocusCapture={() => setHidden(false)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement<{ visible?: boolean }>, { visible })
          : child
      )}
    </motion.header>
  )
}

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.nav
      aria-label="Primary navigation"
      animate={{
        backdropFilter: visible ? 'blur(10px)' : 'none',
        boxShadow: visible
          ? '0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset'
          : 'none',
        width: visible ? '40%' : '100%',
        y: shouldReduceMotion ? 0 : visible ? 20 : 0,
      }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : {
              type: 'spring',
              stiffness: 200,
              damping: 50,
            }
      }
      style={{
        minWidth: '800px',
      }}
      className={cn(
        'relative z-70 mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-full bg-transparent px-8 py-1.5 dark:bg-transparent lg:flex',
        visible && 'bg-white/80 dark:bg-neutral-950/80',
        className
      )}
    >
      {children}
    </motion.nav>
  )
}

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const shouldReduceMotion = useReducedMotion()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null)
  const activeIndex = focusedIndex ?? hoveredIndex

  return (
    <motion.div
      onMouseLeave={() => setHoveredIndex(null)}
      className={cn(
        'absolute inset-y-0 left-0 right-0 z-10 hidden flex-1 flex-row items-center justify-center space-x-2 font-sans text-base font-medium text-black transition-colors duration-200 hover:text-gray-600 motion-reduce:transition-none dark:text-white dark:hover:text-gray-300 lg:flex lg:space-x-2',
        className
      )}
    >
      {items.map((item, idx) => (
        <a
          onMouseEnter={() => setHoveredIndex(idx)}
          onFocus={() => setFocusedIndex(idx)}
          onBlur={() => setFocusedIndex(null)}
          onClick={onItemClick}
          className="relative rounded-full px-4 py-2 font-sans text-sm text-black transition-colors duration-200 hover:text-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 motion-reduce:transition-none dark:text-white dark:hover:text-gray-300 dark:focus-visible:ring-primary-400 dark:focus-visible:ring-offset-gray-950"
          key={`link-${idx}`}
          href={item.link}
        >
          {activeIndex === idx &&
            (shouldReduceMotion ? (
              <div
                data-nav-highlight="true"
                className="absolute inset-0 h-full w-full rounded-full bg-gray-100 dark:bg-neutral-800"
              />
            ) : (
              <motion.div
                data-nav-highlight="true"
                layoutId="hovered"
                className="absolute inset-0 h-full w-full rounded-full bg-gray-100 dark:bg-neutral-800"
              />
            ))}
          <span className="relative z-20">{item.name}</span>
        </a>
      ))}
    </motion.div>
  )
}

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.nav
      aria-label="Primary navigation"
      animate={{
        backdropFilter: visible ? 'blur(10px)' : 'none',
        boxShadow: visible
          ? '0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset'
          : 'none',
        width: visible ? '90%' : '100%',
        paddingRight: visible ? '32px' : '16px',
        paddingLeft: visible ? '32px' : '16px',
        borderRadius: '9999px',
        y: shouldReduceMotion ? 0 : visible ? 20 : 0,
      }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : {
              type: 'spring',
              stiffness: 200,
              damping: 50,
            }
      }
      className={cn(
        'relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between bg-transparent px-0 py-1.5 lg:hidden',
        visible && 'bg-white/80 dark:bg-neutral-950/80',
        className
      )}
    >
      {children}
    </motion.nav>
  )
}

export const MobileNavHeader = ({ children, className }: MobileNavHeaderProps) => {
  return (
    <div className={cn('flex w-full flex-row items-center justify-between', className)}>
      {children}
    </div>
  )
}

export const MobileNavMenu = ({ children, className, id, isOpen, onClose }: MobileNavMenuProps) => {
  const shouldReduceMotion = useReducedMotion()
  const menuRef = useRef<HTMLDivElement>(null)
  const previouslyFocusedRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      previouslyFocusedRef.current = document.activeElement as HTMLElement | null
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleKeyDown)

      const frame = window.requestAnimationFrame(() => {
        menuRef.current
          ?.querySelector<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
          ?.focus()
      })

      return () => {
        window.cancelAnimationFrame(frame)
        document.removeEventListener('mousedown', handleClickOutside)
        document.removeEventListener('keydown', handleKeyDown)
        previouslyFocusedRef.current?.focus()
      }
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id={id}
          ref={menuRef}
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: shouldReduceMotion ? 1 : 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
          className={cn(
            'absolute left-0 top-full z-[1000] mt-2 flex w-full flex-col items-start justify-start rounded-3xl border border-white/20 bg-white/80 px-4 pb-4 pt-4 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] backdrop-blur-md dark:border-white/10 dark:bg-black/80 dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]',
            className
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export const MobileNavToggle = ({
  controlsId,
  isOpen,
  onClick,
}: {
  controlsId: string
  isOpen: boolean
  onClick: () => void
}) => {
  const Icon = isOpen ? IconX : IconMenu2

  return (
    <button
      type="button"
      aria-controls={controlsId}
      aria-expanded={isOpen}
      aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
      onClick={onClick}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full text-black transition-colors duration-200 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 motion-reduce:transition-none dark:text-white dark:hover:bg-gray-800 dark:focus-visible:ring-primary-400 dark:focus-visible:ring-offset-gray-950"
    >
      <Icon aria-hidden="true" className="h-6 w-6" />
    </button>
  )
}
