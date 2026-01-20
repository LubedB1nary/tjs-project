import { TJSHeader } from '@/components/tjs/TJSHeader'
import { TJSFooter } from '@/components/tjs/TJSFooter'

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <TJSHeader />
      <main className="flex-1 pt-[120px]">
        {children}
      </main>
      <TJSFooter />
    </div>
  )
}
