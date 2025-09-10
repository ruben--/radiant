'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { PencilIcon } from '@heroicons/react/24/outline'
import EdiText from 'react-editext'
import { PlusGrid, PlusGridItem, PlusGridRow } from '@/components/plus-grid'
import { Button } from './button'
import { Container } from './container'
import { Gradient } from './gradient'
import { Link } from './link'
import { Logo } from './logo'
import { Subheading } from './text'

function CallToAction({ 
  subheading, 
  heading, 
  description, 
  buttonText, 
  isAuthenticated, 
  onSubheadingSave, 
  onHeadingSave, 
  onDescriptionSave, 
  onButtonSave 
}: {
  subheading: string
  heading: string
  description: string
  buttonText: string
  isAuthenticated: boolean
  onSubheadingSave: (value: string) => void
  onHeadingSave: (value: string) => void
  onDescriptionSave: (value: string) => void
  onButtonSave: (value: string) => void
}) {
  return (
    <div className="relative pt-20 pb-16 text-center sm:py-24">
      <hgroup>
        {isAuthenticated ? (
          <div className="relative group inline-block">
            <EdiText
              type="text"
              value={subheading}
              onSave={onSubheadingSave}
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
          <div className="relative group mt-6">
            <EdiText
              type="textarea"
              value={heading}
              onSave={onHeadingSave}
              submitOnEnter={true}
              cancelOnEscape={true}
              renderValue={() => (
                <div className="relative">
                  <p className="text-3xl font-medium tracking-tight text-gray-950 sm:text-5xl font-[--font-graphik-medium]">
                    {heading.split('\n').map((line, index) => (
                      <span key={index}>
                        {line}
                        {index < heading.split('\n').length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                  <PencilIcon className="absolute -top-2 -right-8 h-5 w-5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              )}
              inputProps={{
                className: "text-3xl font-medium tracking-tight text-gray-950 sm:text-5xl font-[--font-graphik-medium] bg-transparent border-none outline-none w-full text-center resize-none"
              }}
            />
          </div>
        ) : (
          <p className="mt-6 text-3xl font-medium tracking-tight text-gray-950 sm:text-5xl font-[--font-graphik-medium]">
            {heading.split('\n').map((line, index) => (
              <span key={index}>
                {line}
                {index < heading.split('\n').length - 1 && <br />}
              </span>
            ))}
          </p>
        )}
      </hgroup>
      {isAuthenticated ? (
        <div className="relative group mx-auto mt-6 max-w-xs">
          <EdiText
            type="textarea"
            value={description}
            onSave={onDescriptionSave}
            submitOnEnter={true}
            cancelOnEscape={true}
            renderValue={() => (
              <div className="relative">
                <p className="text-sm/6 text-gray-500">
                  {description}
                </p>
                <PencilIcon className="absolute -top-1 -right-6 h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            )}
            inputProps={{
              className: "text-sm/6 text-gray-500 bg-transparent border-none outline-none w-full text-center resize-none"
            }}
          />
        </div>
      ) : (
        <p className="mx-auto mt-6 max-w-xs text-sm/6 text-gray-500">
          {description}
        </p>
      )}
      <div className="mt-6">
        {isAuthenticated ? (
          <div className="relative group inline-block">
            <EdiText
              type="text"
              value={buttonText}
              onSave={onButtonSave}
              submitOnEnter={true}
              cancelOnEscape={true}
              renderValue={() => (
                <div className="relative inline-flex">
                  <Button className="w-full sm:w-auto" href="#">
                    {buttonText}
                  </Button>
                  <PencilIcon className="absolute -top-1 -right-6 h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              )}
              inputProps={{
                className: "bg-transparent border-none outline-none text-white font-medium"
              }}
            />
          </div>
        ) : (
          <Button className="w-full sm:w-auto" href="#">
            {buttonText}
          </Button>
        )}
      </div>
    </div>
  )
}

function SitemapHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="text-sm/6 font-medium text-gray-950/50">{children}</h3>
}

function SitemapLinks({ children }: { children: React.ReactNode }) {
  return <ul className="mt-6 space-y-4 text-sm/6">{children}</ul>
}

function SitemapLink(props: React.ComponentPropsWithoutRef<typeof Link>) {
  return (
    <li>
      <Link
        {...props}
        className="font-medium text-gray-950 data-hover:text-gray-950/75"
      />
    </li>
  )
}

function Sitemap() {
  return (
    <>
      <div>
        <SitemapHeading>Product</SitemapHeading>
        <SitemapLinks>
          <SitemapLink href="/pricing">Pricing</SitemapLink>
          <SitemapLink href="#">Analysis</SitemapLink>
          <SitemapLink href="#">API</SitemapLink>
        </SitemapLinks>
      </div>
      <div>
        <SitemapHeading>Company</SitemapHeading>
        <SitemapLinks>
          <SitemapLink href="#">Careers</SitemapLink>
          <SitemapLink href="/blog">Blog</SitemapLink>
          <SitemapLink href="/company">Company</SitemapLink>
        </SitemapLinks>
      </div>
      <div>
        <SitemapHeading>Support</SitemapHeading>
        <SitemapLinks>
          <SitemapLink href="#">Help center</SitemapLink>
          <SitemapLink href="#">Community</SitemapLink>
        </SitemapLinks>
      </div>
      <div>
        <SitemapHeading>Company</SitemapHeading>
        <SitemapLinks>
          <SitemapLink href="#">Terms of service</SitemapLink>
          <SitemapLink href="#">Privacy policy</SitemapLink>
        </SitemapLinks>
      </div>
    </>
  )
}

function SocialIconX(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" {...props}>
      <path d="M12.6 0h2.454l-5.36 6.778L16 16h-4.937l-3.867-5.594L2.771 16H.316l5.733-7.25L0 0h5.063l3.495 5.114L12.6 0zm-.86 14.376h1.36L4.323 1.539H2.865l8.875 12.837z" />
    </svg>
  )
}

function SocialIconFacebook(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 8.05C16 3.603 12.418 0 8 0S0 3.604 0 8.05c0 4.016 2.926 7.346 6.75 7.95v-5.624H4.718V8.05H6.75V6.276c0-2.017 1.194-3.131 3.022-3.131.875 0 1.79.157 1.79.157v1.98h-1.008c-.994 0-1.304.62-1.304 1.257v1.51h2.219l-.355 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.95z"
      />
    </svg>
  )
}

function SocialIconLinkedIn(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" {...props}>
      <path d="M14.82 0H1.18A1.169 1.169 0 000 1.154v13.694A1.168 1.168 0 001.18 16h13.64A1.17 1.17 0 0016 14.845V1.15A1.171 1.171 0 0014.82 0zM4.744 13.64H2.369V5.996h2.375v7.644zm-1.18-8.684a1.377 1.377 0 11.52-.106 1.377 1.377 0 01-.527.103l.007.003zm10.075 8.683h-2.375V9.921c0-.885-.015-2.025-1.234-2.025-1.218 0-1.425.966-1.425 1.968v3.775H6.233V5.997H8.51v1.05h.032c.317-.601 1.09-1.235 2.246-1.235 2.405-.005 2.851 1.578 2.851 3.63v4.197z" />
    </svg>
  )
}

function SocialLinks() {
  return (
    <>
      <Link
        href="https://facebook.com"
        target="_blank"
        aria-label="Visit us on Facebook"
        className="text-gray-950 data-hover:text-gray-950/75"
      >
        <SocialIconFacebook className="size-4" />
      </Link>
      <Link
        href="https://x.com"
        target="_blank"
        aria-label="Visit us on X"
        className="text-gray-950 data-hover:text-gray-950/75"
      >
        <SocialIconX className="size-4" />
      </Link>
      <Link
        href="https://linkedin.com"
        target="_blank"
        aria-label="Visit us on LinkedIn"
        className="text-gray-950 data-hover:text-gray-950/75"
      >
        <SocialIconLinkedIn className="size-4" />
      </Link>
    </>
  )
}

function Copyright() {
  return (
    <div className="text-sm/6 text-gray-950">
      &copy; {new Date().getFullYear()} Radiant Inc.
    </div>
  )
}

export function Footer() {
  const { data: session, status } = useSession()
  const [subheading, setSubheading] = useState('Get started')
  const [heading, setHeading] = useState('Ready to dive in?\nStart your free trial today.')
  const [description, setDescription] = useState('Get the cheat codes for selling and unlock your team\'s revenue potential.')
  const [buttonText, setButtonText] = useState('Get started')
  const [loading, setLoading] = useState(false)
  
  const isAuthenticated = status === 'authenticated'

  useEffect(() => {
    const fetchContent = async () => {
      const keys = ['footer-subheading', 'footer-heading', 'footer-description', 'footer-button']
      for (const key of keys) {
        try {
          const response = await fetch(`/api/content?key=${key}`)
          const data = await response.json()
          if (data.value) {
            switch (key) {
              case 'footer-subheading':
                setSubheading(data.value)
                break
              case 'footer-heading':
                setHeading(data.value)
                break
              case 'footer-description':
                setDescription(data.value)
                break
              case 'footer-button':
                setButtonText(data.value)
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

  const handleSubheadingSave = (value: string) => handleSave('footer-subheading', value, setSubheading)
  const handleHeadingSave = (value: string) => handleSave('footer-heading', value, setHeading)
  const handleDescriptionSave = (value: string) => handleSave('footer-description', value, setDescription)
  const handleButtonSave = (value: string) => handleSave('footer-button', value, setButtonText)

  return (
    <footer className="footer">
      <Gradient className="relative">
        <div className="absolute inset-2 rounded-4xl bg-white/80" />
        <Container>
          <CallToAction 
            subheading={subheading}
            heading={heading}
            description={description}
            buttonText={buttonText}
            isAuthenticated={isAuthenticated}
            onSubheadingSave={handleSubheadingSave}
            onHeadingSave={handleHeadingSave}
            onDescriptionSave={handleDescriptionSave}
            onButtonSave={handleButtonSave}
          />
          <PlusGrid className="pb-16">
            <PlusGridRow>
              <div className="grid grid-cols-2 gap-y-10 pb-6 lg:grid-cols-6 lg:gap-8">
                <div className="col-span-2 flex">
                  <PlusGridItem className="pt-6 lg:pb-6">
                    <Logo className="h-9" />
                  </PlusGridItem>
                </div>
                <div className="col-span-2 grid grid-cols-2 gap-x-8 gap-y-12 lg:col-span-4 lg:grid-cols-subgrid lg:pt-6">
                  <Sitemap />
                </div>
              </div>
            </PlusGridRow>
            <PlusGridRow className="flex justify-between">
              <div>
                <PlusGridItem className="py-3">
                  <Copyright />
                </PlusGridItem>
              </div>
              <div className="flex">
                <PlusGridItem className="flex items-center gap-8 py-3">
                  <SocialLinks />
                </PlusGridItem>
              </div>
            </PlusGridRow>
          </PlusGrid>
        </Container>
      </Gradient>
    </footer>
  )
}
