'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import EdiText from 'react-editext'
import { Button } from './button'
import { Container } from './container'
import { Gradient } from './gradient'
import { Link } from './link'
import { Navbar } from './navbar'
import { ChevronRightIcon } from '@heroicons/react/16/solid'
import { PencilIcon } from '@heroicons/react/24/outline'

interface HeroWithEditProps {
  initialTitle?: string
  initialSubtitle?: string
  initialButton1?: string
  initialButton2?: string
}

export function HeroWithEdit({ 
  initialTitle = 'Close every deal.',
  initialSubtitle = 'Radiant helps you sell more by revealing sensitive information about your customers.',
  initialButton1 = 'Get started',
  initialButton2 = 'See pricing'
}: HeroWithEditProps) {
  const { data: session, status } = useSession()
  const [heroTitle, setHeroTitle] = useState(initialTitle)
  const [heroSubtitle, setHeroSubtitle] = useState(initialSubtitle)
  const [button1Text, setButton1Text] = useState(initialButton1)
  const [button2Text, setButton2Text] = useState(initialButton2)
  const [loading, setLoading] = useState(false)
  
  const isAuthenticated = status === 'authenticated'

  useEffect(() => {
    // Fetch all hero content from the database
    const fetchContent = async () => {
      const keys = ['hero-title', 'hero-subtitle', 'button-1', 'button-2']
      for (const key of keys) {
        try {
          const response = await fetch(`/api/content?key=${key}`)
          const data = await response.json()
          if (data.value) {
            switch (key) {
              case 'hero-title':
                setHeroTitle(data.value)
                break
              case 'hero-subtitle':
                setHeroSubtitle(data.value)
                break
              case 'button-1':
                setButton1Text(data.value)
                break
              case 'button-2':
                setButton2Text(data.value)
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

  const handleTitleSave = (value: string) => handleSave('hero-title', value, setHeroTitle)
  const handleSubtitleSave = (value: string) => handleSave('hero-subtitle', value, setHeroSubtitle)  
  const handleButton1Save = (value: string) => handleSave('button-1', value, setButton1Text)
  const handleButton2Save = (value: string) => handleSave('button-2', value, setButton2Text)

  return (
    <div className="relative">
      <Gradient className="absolute inset-2 bottom-0 rounded-4xl ring-1 ring-black/5 ring-inset" />
      <Container className="relative">
        <Navbar
          banner={
            <Link
              href="/blog/radiant-raises-100m-series-a-from-tailwind-ventures"
              className="flex items-center gap-1 rounded-full bg-fuchsia-950/35 px-3 py-0.5 text-sm/6 font-medium text-white data-hover:bg-fuchsia-950/30"
            >
              Radiant raises $100M Series A from Tailwind Ventures
              <ChevronRightIcon className="size-4" />
            </Link>
          }
        />
        <div className="pt-16 pb-24 sm:pt-24 sm:pb-32 md:pt-32 md:pb-48">
          {isAuthenticated ? (
            <div className="relative group">
              <EdiText
                type="text"
                value={heroTitle}
                onSave={handleTitleSave}
                submitOnEnter={true}
                cancelOnEscape={true}
                renderValue={() => (
                  <div className="relative">
                    <h1 className="font-display text-6xl/[0.9] font-medium tracking-tight text-balance text-gray-950 sm:text-8xl/[0.8] md:text-9xl/[0.8]">
                      {heroTitle}
                    </h1>
                    <PencilIcon className="absolute -top-2 -right-10 h-6 w-6 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                )}
                inputProps={{
                  className: "font-display text-6xl/[0.9] font-medium tracking-tight text-balance text-gray-950 sm:text-8xl/[0.8] md:text-9xl/[0.8] bg-transparent border-none outline-none"
                }}
              />
            </div>
          ) : (
            <h1 className="font-display text-6xl/[0.9] font-medium tracking-tight text-balance text-gray-950 sm:text-8xl/[0.8] md:text-9xl/[0.8]">
              {heroTitle}
            </h1>
          )}
          {isAuthenticated ? (
            <div className="relative group mt-8">
              <EdiText
                type="text"
                value={heroSubtitle}
                onSave={handleSubtitleSave}
                submitOnEnter={true}
                cancelOnEscape={true}
                renderValue={() => (
                  <div className="relative">
                    <p className="max-w-lg text-xl/7 font-medium text-gray-950/75 sm:text-2xl/8">
                      {heroSubtitle}
                    </p>
                    <PencilIcon className="absolute -top-1 -right-8 h-5 w-5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                )}
                inputProps={{
                  className: "max-w-lg text-xl/7 font-medium text-gray-950/75 sm:text-2xl/8 bg-transparent border-none outline-none w-full"
                }}
              />
            </div>
          ) : (
            <p className="mt-8 max-w-lg text-xl/7 font-medium text-gray-950/75 sm:text-2xl/8">
              {heroSubtitle}
            </p>
          )}
          <div className="mt-12 flex flex-col gap-x-6 gap-y-4 sm:flex-row">
            {isAuthenticated ? (
              <div className="relative group inline-block">
                <EdiText
                  type="text"
                  value={button1Text}
                  onSave={handleButton1Save}
                  submitOnEnter={true}
                  cancelOnEscape={true}
                  renderValue={() => (
                    <div className="relative inline-flex">
                      <Button href="#">{button1Text}</Button>
                      <PencilIcon className="absolute -top-1 -right-6 h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  )}
                  inputProps={{
                    className: "bg-transparent border-none outline-none text-white font-medium"
                  }}
                />
              </div>
            ) : (
              <Button href="#">{button1Text}</Button>
            )}
            
            {isAuthenticated ? (
              <div className="relative group inline-block">
                <EdiText
                  type="text"
                  value={button2Text}
                  onSave={handleButton2Save}
                  submitOnEnter={true}
                  cancelOnEscape={true}
                  renderValue={() => (
                    <div className="relative inline-flex">
                      <Button variant="secondary" href="/pricing">{button2Text}</Button>
                      <PencilIcon className="absolute -top-1 -right-6 h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  )}
                  inputProps={{
                    className: "bg-transparent border-none outline-none text-gray-950 font-medium"
                  }}
                />
              </div>
            ) : (
              <Button variant="secondary" href="/pricing">{button2Text}</Button>
            )}
          </div>
        </div>
      </Container>
    </div>
  )
}