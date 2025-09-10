import { BentoSection } from './bento-section'
import { Container } from './container'
import { DarkBentoSection } from './dark-bento-section'
import { FeatureSection } from './feature-section'
import { LogoCloud } from './logo-cloud'

export function HomeMainContent() {
  return (
    <main className="home-main-content">
      <Container className="mt-10">
        <LogoCloud />
      </Container>
      <div className="bg-linear-to-b from-white from-50% to-gray-100 py-32">
        <FeatureSection />
        <BentoSection />
      </div>
      <DarkBentoSection />
    </main>
  )
}