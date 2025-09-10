import { BlogCategories } from '@/components/blog-categories'
import { BlogFeaturedPosts } from '@/components/blog-featured-posts'
import { BlogPagination } from '@/components/blog-pagination'
import { BlogPosts } from '@/components/blog-posts'
import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { GradientBackground } from '@/components/gradient'
import { Navbar } from '@/components/navbar'
import { Heading, Lead, Subheading } from '@/components/text'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Stay informed with product updates, company news, and insights on how to sell smarter at your company.',
}

export default async function Blog({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  let params = await searchParams
  let page =
    'page' in params
      ? typeof params.page === 'string' && parseInt(params.page) > 1
        ? parseInt(params.page)
        : notFound()
      : 1

  let category =
    typeof params.category === 'string' ? params.category : undefined

  return (
    <main className="overflow-hidden">
      <GradientBackground />
      <Container>
        <Navbar />
        <Subheading className="mt-16">Blog</Subheading>
        <Heading as="h1" className="mt-2">
          What’s happening at Radiant.
        </Heading>
        <Lead className="mt-6 max-w-3xl">
          Stay informed with product updates, company news, and insights on how
          to sell smarter at your company.
        </Lead>
      </Container>
      {page === 1 && !category && <BlogFeaturedPosts />}
      <Container className="mt-16 pb-24">
        <BlogCategories selected={category} />
        <BlogPosts page={page} category={category} />
        <BlogPagination page={page} category={category} />
      </Container>
      <Footer />
    </main>
  )
}
