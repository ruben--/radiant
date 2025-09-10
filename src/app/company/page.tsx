import { CompanyCareers } from '@/components/company-careers'
import { CompanyHeader } from '@/components/company-header'
import { CompanyInvestors } from '@/components/company-investors'
import { CompanyTeam } from '@/components/company-team'
import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { GradientBackground } from '@/components/gradient'
import { Navbar } from '@/components/navbar'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Company',
  description:
    "We're on a mission to transform revenue organizations by harnessing vast amounts of illegally acquired customer data.",
}

export default function Company() {
  return (
    <main className="overflow-hidden">
      <GradientBackground />
      <Container>
        <Navbar />
      </Container>
      <CompanyHeader />
      <CompanyTeam />
      <CompanyInvestors />
      <CompanyCareers />
      <Footer />
    </main>
  )
}