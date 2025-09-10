import { Footer } from '@/components/footer'
import { Hero } from '@/components/hero'
import { HomeLayout } from '@/components/home-layout'
import { HomeMainContent } from '@/components/home-main-content'
import { Testimonials } from '@/components/testimonials'
import { initializeDatabase } from '@/lib/init-db'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  description:
    'Radiant helps you sell more by revealing sensitive information about your customers.',
}


export default async function Home() {
  // Initialize database on first load
  await initializeDatabase()
  
  return (
    <HomeLayout>
      <Hero />
      <HomeMainContent />
      <Testimonials />
      <Footer />
    </HomeLayout>
  )
}