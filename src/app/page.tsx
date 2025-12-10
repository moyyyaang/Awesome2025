import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import PageBuilder from '@/components/PageBuilder'
import Link from 'next/link'

export const revalidate = 0 // Revalidate immediately for dev

export default async function Home() {
  const query = groq`
    *[_type == "page" && slug.current == "home"][0] {
      ...,
      pageBuilder[] {
        ...,
        _type == "statsGrid" => {
          ...,
          items[] {
            ...,
            _key
          }
        },
        _type == "rankingList" => {
          ...,
          items[] {
            ...,
            _key
          }
        },
        _type == "videoRanking" => {
          ...,
          items[] {
            ...,
            _key
          }
        }
      }
    }
  `

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let data: any = null

  try {
    data = await client.fetch(query)
  } catch (error) {
    console.error("Sanity fetch failed:", error)
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Awesome 2025</h1>
          <p className="text-gray-400">Please create a page with slug &quot;home&quot; in Sanity Studio.</p>
          <Link href="/studio" className="inline-block mt-6 px-6 py-3 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors">
            Go to Studio
          </Link>
        </div>
      </div>
    )
  }

  const themeClass = data.theme ? `theme-${data.theme}` : 'theme-pastel'

  return (
    <main className={`min-h-screen ${themeClass}`}>
      <PageBuilder blocks={data.pageBuilder} />

      {/* Debug Info - Remove in production */}
      <div className="fixed bottom-0 left-0 w-full bg-gray-900 text-xs text-gray-500 p-2 opacity-50 hover:opacity-100 transition-opacity z-50">
        <details>
          <summary>Debug Data</summary>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </details>
      </div>
    </main>
  )
}
