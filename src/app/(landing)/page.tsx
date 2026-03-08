import { Navbar } from '@/components/landing/Navbar'
import { Hero } from '@/components/landing/Hero'
import { StatsSection } from '@/components/landing/StatsSection'
import { FeatureGrid } from '@/components/landing/FeatureGrid'
import { ProductOverview } from '@/components/landing/ProductOverview'
import { Testimonials } from '@/components/landing/Testimonials'
import { CTASection } from '@/components/landing/CTASection'
import { Footer } from '@/components/landing/Footer'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <StatsSection />
      <FeatureGrid />
      <ProductOverview />
      <Testimonials />
      <CTASection />
      <Footer />
    </div>
  )
}
