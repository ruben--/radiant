'use client'

import * as Headless from '@headlessui/react'
import { ArrowLongRightIcon, PencilIcon } from '@heroicons/react/20/solid'
import { clsx } from 'clsx'
import { useSession } from 'next-auth/react'
import EdiText from 'react-editext'
import {
  MotionValue,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  type HTMLMotionProps,
} from 'framer-motion'
import { useCallback, useLayoutEffect, useRef, useState, useEffect } from 'react'
import useMeasure, { type RectReadOnly } from 'react-use-measure'
import { Container } from './container'
import { Link } from './link'
import { Heading, Subheading } from './text'

const testimonials = [
  {
    img: '/testimonials/tina-yards.jpg',
    name: 'Tina Yards',
    title: 'VP of Sales, Protocol',
    quote:
      'Thanks to Radiant, we’re finding new leads that we never would have found with legal methods.',
  },
  {
    img: '/testimonials/conor-neville.jpg',
    name: 'Conor Neville',
    title: 'Head of Customer Success, TaxPal',
    quote:
      'Radiant made undercutting all of our competitors an absolute breeze.',
  },
  {
    img: '/testimonials/amy-chase.jpg',
    name: 'Amy Chase',
    title: 'Head of GTM, Pocket',
    quote:
      'We closed a deal in literally a few minutes because we knew their exact budget.',
  },
  {
    img: '/testimonials/veronica-winton.jpg',
    name: 'Veronica Winton',
    title: 'CSO, Planeteria',
    quote:
      'We’ve managed to put two of our main competitors out of business in 6 months.',
  },
  {
    img: '/testimonials/dillon-lenora.jpg',
    name: 'Dillon Lenora',
    title: 'VP of Sales, Detax',
    quote: 'I was able to replace 80% of my team with RadiantAI bots.',
  },
  {
    img: '/testimonials/harriet-arron.jpg',
    name: 'Harriet Arron',
    title: 'Account Manager, Commit',
    quote:
      'I’ve smashed all my targets without having to speak to a lead in months.',
  },
]

function TestimonialCard({
  name,
  title,
  img,
  children,
  bounds,
  scrollX,
  ...props
}: {
  img: string
  name: string
  title: string
  children: React.ReactNode
  bounds: RectReadOnly
  scrollX: MotionValue<number>
} & HTMLMotionProps<'div'>) {
  let ref = useRef<HTMLDivElement | null>(null)

  let computeOpacity = useCallback(() => {
    let element = ref.current
    if (!element || bounds.width === 0) return 1

    let rect = element.getBoundingClientRect()

    if (rect.left < bounds.left) {
      let diff = bounds.left - rect.left
      let percent = diff / rect.width
      return Math.max(0.5, 1 - percent)
    } else if (rect.right > bounds.right) {
      let diff = rect.right - bounds.right
      let percent = diff / rect.width
      return Math.max(0.5, 1 - percent)
    } else {
      return 1
    }
  }, [ref, bounds.width, bounds.left, bounds.right])

  let opacity = useSpring(computeOpacity(), {
    stiffness: 154,
    damping: 23,
  })

  useLayoutEffect(() => {
    opacity.set(computeOpacity())
  }, [computeOpacity, opacity])

  useMotionValueEvent(scrollX, 'change', () => {
    opacity.set(computeOpacity())
  })

  return (
    <motion.div
      ref={ref}
      style={{ opacity }}
      {...props}
      className="relative flex aspect-9/16 w-72 shrink-0 snap-start scroll-ml-(--scroll-padding) flex-col justify-end overflow-hidden rounded-3xl sm:aspect-3/4 sm:w-96"
    >
      <img
        alt=""
        src={img}
        className="absolute inset-x-0 top-0 aspect-square w-full object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-3xl bg-linear-to-t from-black from-[calc(7/16*100%)] ring-1 ring-gray-950/10 ring-inset sm:from-25%"
      />
      <figure className="relative p-10">
        <blockquote>
          <p className="relative text-xl/7 text-white">
            <span aria-hidden="true" className="absolute -translate-x-full">
              “
            </span>
            {children}
            <span aria-hidden="true" className="absolute">
              ”
            </span>
          </p>
        </blockquote>
        <figcaption className="mt-6 border-t border-white/20 pt-6">
          <p className="text-sm/6 font-medium text-white">{name}</p>
          <p className="text-sm/6 font-medium">
            <span className="bg-linear-to-r from-[#fff1be] from-28% via-[#ee87cb] via-70% to-[#b060ff] bg-clip-text text-transparent">
              {title}
            </span>
          </p>
        </figcaption>
      </figure>
    </motion.div>
  )
}

function CallToAction({ ctaText, isAuthenticated, onSave }: { 
  ctaText: string
  isAuthenticated: boolean
  onSave: (value: string) => void
}) {
  return (
    <div>
      {isAuthenticated ? (
        <div className="relative group max-w-sm">
          <EdiText
            type="textarea"
            value={ctaText}
            onSave={onSave}
            submitOnEnter={true}
            cancelOnEscape={true}
            renderValue={() => (
              <div className="relative">
                <p className="text-sm/6 text-gray-600">
                  {ctaText}
                </p>
                <PencilIcon className="absolute -top-1 -right-6 h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            )}
            inputProps={{
              className: "max-w-sm text-sm/6 text-gray-600 bg-transparent border-none outline-none w-full resize-none"
            }}
          />
        </div>
      ) : (
        <p className="max-w-sm text-sm/6 text-gray-600">
          {ctaText}
        </p>
      )}
      <div className="mt-2">
        <Link
          href="#"
          className="inline-flex items-center gap-2 text-sm/6 font-medium text-pink-600"
        >
          Get started
          <ArrowLongRightIcon className="size-5" />
        </Link>
      </div>
    </div>
  )
}

export function Testimonials() {
  const { data: session, status } = useSession()
  let scrollRef = useRef<HTMLDivElement | null>(null)
  let { scrollX } = useScroll({ container: scrollRef })
  let [setReferenceWindowRef, bounds] = useMeasure()
  let [activeIndex, setActiveIndex] = useState(0)
  const [subheading, setSubheading] = useState('What everyone is saying')
  const [heading, setHeading] = useState('Trusted by professionals.')
  const [ctaText, setCtaText] = useState('Join the best sellers in the business and start using Radiant to hit your targets today.')
  const [loading, setLoading] = useState(false)
  
  const isAuthenticated = status === 'authenticated'

  useEffect(() => {
    const fetchContent = async () => {
      const keys = ['testimonials-subheading', 'testimonials-heading', 'testimonials-cta']
      for (const key of keys) {
        try {
          const response = await fetch(`/api/content?key=${key}`)
          const data = await response.json()
          if (data.value) {
            switch (key) {
              case 'testimonials-subheading':
                setSubheading(data.value)
                break
              case 'testimonials-heading':
                setHeading(data.value)
                break
              case 'testimonials-cta':
                setCtaText(data.value)
                break
            }
          }
        } catch (error) {
          console.error(`Failed to fetch ${key}:`, error)
        }
      }
    }
    
    fetchContent()
  }, [])

  const handleSave = async (key: string, value: string, setter: (value: string) => void) => {
    if (!isAuthenticated) return
    
    setLoading(true)
    try {
      const response = await fetch('/api/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ key, value })
      })

      if (response.ok) {
        setter(value)
        console.log(`${key} saved successfully!`)
      } else {
        const errorData = await response.json()
        console.error(`Failed to save ${key}:`, errorData.error)
        alert(`Failed to save: ${errorData.error}`)
      }
    } catch (error) {
      console.error(`Error saving ${key}:`, error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubheadingSave = (value: string) => handleSave('testimonials-subheading', value, setSubheading)
  const handleHeadingSave = (value: string) => handleSave('testimonials-heading', value, setHeading)
  const handleCtaSave = (value: string) => handleSave('testimonials-cta', value, setCtaText)

  useMotionValueEvent(scrollX, 'change', (x) => {
    setActiveIndex(Math.floor(x / scrollRef.current!.children[0].clientWidth))
  })

  function scrollTo(index: number) {
    let gap = 32
    let width = (scrollRef.current!.children[0] as HTMLElement).offsetWidth
    scrollRef.current!.scrollTo({ left: (width + gap) * index })
  }

  return (
    <div className="testimonials overflow-hidden py-32">
      <Container>
        <div ref={setReferenceWindowRef}>
          {isAuthenticated ? (
            <div className="relative group inline-block">
              <EdiText
                type="text"
                value={subheading}
                onSave={handleSubheadingSave}
                submitOnEnter={true}
                cancelOnEscape={true}
                renderValue={() => (
                  <div className="relative inline-flex">
                    <Subheading>{subheading}</Subheading>
                    <PencilIcon className="absolute -top-1 -right-6 h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                )}
                inputProps={{
                  className: "bg-transparent border-none outline-none text-sm font-semibold uppercase tracking-widest text-gray-500"
                }}
              />
            </div>
          ) : (
            <Subheading>{subheading}</Subheading>
          )}
          {isAuthenticated ? (
            <div className="relative group inline-block mt-2">
              <EdiText
                type="text"
                value={heading}
                onSave={handleHeadingSave}
                submitOnEnter={true}
                cancelOnEscape={true}
                renderValue={() => (
                  <div className="relative inline-flex">
                    <Heading as="h3" className="mt-2">{heading}</Heading>
                    <PencilIcon className="absolute -top-1 -right-6 h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                )}
                inputProps={{
                  className: "bg-transparent border-none outline-none text-2xl font-medium text-gray-950 font-[--font-graphik-medium]"
                }}
              />
            </div>
          ) : (
            <Heading as="h3" className="mt-2">{heading}</Heading>
          )}
        </div>
      </Container>
      <div
        ref={scrollRef}
        className={clsx([
          'mt-16 flex gap-8 px-(--scroll-padding)',
          '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
          'snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth',
          '[--scroll-padding:max(--spacing(6),calc((100vw-(var(--container-2xl)))/2))] lg:[--scroll-padding:max(--spacing(8),calc((100vw-(var(--container-7xl)))/2))]',
        ])}
      >
        {testimonials.map(({ img, name, title, quote }, testimonialIndex) => (
          <TestimonialCard
            key={testimonialIndex}
            name={name}
            title={title}
            img={img}
            bounds={bounds}
            scrollX={scrollX}
            onClick={() => scrollTo(testimonialIndex)}
          >
            {quote}
          </TestimonialCard>
        ))}
        <div className="w-2xl shrink-0 sm:w-216" />
      </div>
      <Container className="mt-16">
        <div className="flex justify-between">
          <CallToAction 
            ctaText={ctaText}
            isAuthenticated={isAuthenticated}
            onSave={handleCtaSave}
          />
          <div className="hidden sm:flex sm:gap-2">
            {testimonials.map(({ name }, testimonialIndex) => (
              <Headless.Button
                key={testimonialIndex}
                onClick={() => scrollTo(testimonialIndex)}
                data-active={
                  activeIndex === testimonialIndex ? true : undefined
                }
                aria-label={`Scroll to testimonial from ${name}`}
                className={clsx(
                  'size-2.5 rounded-full border border-transparent bg-gray-300 transition',
                  'data-active:bg-gray-400 data-hover:bg-gray-400',
                  'forced-colors:data-active:bg-[Highlight] forced-colors:data-focus:outline-offset-4',
                )}
              />
            ))}
          </div>
        </div>
      </Container>
    </div>
  )
}
