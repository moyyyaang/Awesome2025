'use client'

import { motion } from 'framer-motion'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = any
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

interface VideoItem {
    rank: number
    thumbnail: SanityImageSource
    title: string
    youtubeUrl: string
    description?: string
    _key: string
}

interface VideoRankingBlockProps {
    title?: string
    gridColumns?: '2' | '3' | '4'
    items?: VideoItem[]
}

export default function VideoRankingBlock({ title, gridColumns = '3', items }: VideoRankingBlockProps) {
    if (!items || items.length === 0) return null

    const gridClass = {
        '2': 'grid-cols-1 md:grid-cols-2',
        '3': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        '4': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    }[gridColumns]

    return (
        <section className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
                {title && (
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-black mb-12 text-left text-gray-900"
                    >
                        {title}
                    </motion.h2>
                )}

                <div className={`grid ${gridClass} gap-6`}>
                    {items.map((item, index) => (
                        <motion.a
                            href={item.youtubeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            key={item._key}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative block aspect-video rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                        >
                            {/* Thumbnail */}
                            {item.thumbnail?.asset && (
                                <Image
                                    src={urlFor(item.thumbnail).url()}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            )}

                            {/* Rank Badge */}
                            <div className="absolute top-4 left-4 bg-purple-100 text-purple-800 text-xl font-black px-3 py-1 rounded-lg shadow-md z-10">
                                #{item.rank}
                            </div>

                            {/* Content Overlay */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent pt-12">
                                <h3 className="text-white font-bold text-lg md:text-xl line-clamp-2 mb-1 drop-shadow-md">
                                    {item.title}
                                </h3>
                                {item.description && (
                                    <p className="text-gray-300 text-sm line-clamp-1">
                                        {item.description}
                                    </p>
                                )}
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    )
}
