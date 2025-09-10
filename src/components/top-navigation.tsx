import { Container } from './container'
import { Link } from './link'
import { Navbar } from './navbar'
import { ChevronRightIcon } from '@heroicons/react/16/solid'

export function TopNavigation() {
  return (
    <div className="top-navigation">
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
      </Container>
    </div>
  )
}