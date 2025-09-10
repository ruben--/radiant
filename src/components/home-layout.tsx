interface HomeLayoutProps {
  children: React.ReactNode
}

export function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <div className="overflow-hidden">
      {children}
    </div>
  )
}