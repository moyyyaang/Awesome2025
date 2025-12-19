'use client'

import { motion } from 'framer-motion'

// import { SanityImageSource } from '@sanity/image-url/lib/types/types'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = any
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

interface RankingItem {
    rank: number
    name: string
    subtitle?: string
    score: string
    image?: SanityImageSource
    _key: string
}

interface RankingBlockProps {
    items?: RankingItem[]
    title?: string
    layout?: 'list' | 'grid' | 'split'
}

export default function RankingBlock({ items, title, layout = 'list' }: RankingBlockProps) {
    if (!items || items.length === 0) return null

    return (
        <section className="py-20 px-4">
            <div className="max-w-4xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-5xl font-black mb-12 text-center text-gray-900"
                >
                    {title || 'Top Channels'}
                </motion.h2>

                <div className={`
                    ${layout === 'grid' ? "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4" : ""}
                    ${layout === 'split' ? "columns-1 md:columns-2 gap-8 space-y-4" : ""}
                    ${layout === 'list' ? "space-y-4" : ""}
                `}>
                    {items.map((item, index) => (
                        <motion.div
                            key={item._key}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`
                                p-6 bg-white/80 rounded-2xl shadow-lg backdrop-blur-sm hover:scale-[1.02] transition-transform duration-300 h-full flex flex-col justify-between
                                ${layout === 'grid' ? 'items-center text-center' : 'items-center flex-row'}
                                ${layout === 'split' ? 'break-inside-avoid mb-4 inline-flex w-full' : ''}
                            `}
                        >
                            <div className="flex items-center flex-1 w-full">
                                <div className={`
                                    flex items-center justify-center rounded-full font-black text-2xl shadow-inner flex-shrink-0
                                    ${layout === 'grid' ? 'w-12 h-12 mb-4 mx-auto' : 'w-14 h-14 mr-6'}
                                    ${item.rank === 1 ? 'bg-yellow-300 text-yellow-800' :
                                        item.rank === 2 ? 'bg-gray-200 text-gray-600' :
                                            item.rank === 3 ? 'bg-orange-200 text-orange-700' :
                                                'bg-gray-100 text-gray-500'}
                                `}>
                                    {item.rank}
                                </div>

                                {/* Optional Image */}
                                {item.image?.asset && (
                                    <div className={`
                                        relative rounded-full overflow-hidden border-2 border-white shadow-sm flex-shrink-0
                                        ${layout === 'grid' ? 'w-20 h-20 mb-4 mx-auto' : 'w-16 h-16 mr-6'}
                                    `}>
                                        <Image
                                            src={urlFor(item.image).url()}
                                            alt={item.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                )}

                                <div className={layout === 'grid' ? "w-full mb-2" : "flex-grow"}>
                                    <h3 className={`font-bold text-gray-900 ${layout === 'grid' ? 'text-lg' : 'text-2xl'}`}>{item.name}</h3>
                                    {item.subtitle && (
                                        <p className="text-gray-500 font-medium text-sm mt-1">{item.subtitle}</p>
                                    )}
                                </div>
                            </div>

                            <div className={layout === 'grid' ? "mt-auto" : "text-right"}>
                                <span className="text-gray-600 font-mono font-bold text-lg">{item.score}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
