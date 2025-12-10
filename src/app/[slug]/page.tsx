import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import PageBuilder from '@/components/PageBuilder'
import { notFound } from 'next/navigation'

export const revalidate = 60

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function DynamicPage({ params }: { params: { slug: string } }) {
  const query = groq`
    *[_type == "page" && slug.current == $slug][0] {
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
    data = await client.fetch(query, { slug: params.slug })
  } catch (error) {
    console.error("Sanity fetch failed:", error)
  }

  if (!data) {
    notFound()
  }

  const themeClass = data.theme ? `theme-${data.theme}` : 'theme-pastel'

  return (
    <main className={`min-h-screen ${themeClass}`}>
      <PageBuilder blocks={data.pageBuilder} />
    </main>
  )
}

export async function generateStaticParams() {
  const query = groq`*[_type == "page"]{ "slug": slug.current }`
  const pages = await client.fetch(query)

  return pages.map((page: { slug: string }) => ({
    slug: page.slug,
  }))
}
