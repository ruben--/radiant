import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { GradientBackground } from '@/components/gradient'
import { Navbar } from '@/components/navbar'
import { PricingCards, tiers } from '@/components/pricing-cards'
import { PricingFrequentlyAskedQuestions } from '@/components/pricing-frequently-asked-questions'
import { PricingHeader } from '@/components/pricing-header'
import { PricingTable } from '@/components/pricing-table'
import { PricingTestimonial } from '@/components/pricing-testimonial'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Companies all over the world have closed millions of deals with Radiant. Sign up today and start selling smarter.',
}

export default async function Pricing({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  let params = await searchParams
  let tier =
    typeof params.tier === 'string'
      ? tiers.find(({ slug }) => slug === params.tier)!
      : tiers[0]

  return (
    <main className="overflow-hidden">
      <GradientBackground />
      <Container>
        <Navbar />
      </Container>
      <PricingHeader />
      <PricingCards />
      <PricingTable selectedTier={tier} />
      <PricingTestimonial />
      <PricingFrequentlyAskedQuestions />
      <Footer />
    </main>
  )
}