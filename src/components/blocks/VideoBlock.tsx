'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { Play } from 'lucide-react'

// import { SanityImageSource } from '@sanity/image-url/lib/types/types'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = any

interface VideoBlockProps {
    title?: string
    thumbnail?: SanityImageSource
    youtubeUrl?: string
    achievements?: string
    titleSize?: string
    achievementsSize?: string
}

export default function VideoBlock({
    title,
    thumbnail,
    youtubeUrl,
    achievements,
    titleSize = 'text-4xl md:text-6xl',
    achievementsSize = 'text-xl md:text-2xl',
}: VideoBlockProps) {
    // Extract video ID from YouTube URL
    const getVideoId = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
        const match = url?.match(regExp)
        return (match && match[2].length === 11) ? match[2] : null
    }

    const videoId = youtubeUrl ? getVideoId(youtubeUrl) : null

    return (
        <section className="py-20 px-4">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative aspect-video rounded-3xl overflow-hidden group cursor-pointer shadow-2xl border-4 border-white"
                >
                    {/* Thumbnail or Video Embed */}
                    {videoId ? (
                        <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${videoId}`}
                            title={title || "YouTube video player"}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="absolute inset-0 w-full h-full"
                        />
                    ) : (thumbnail?.asset) ? (
                        <div className="relative w-full h-full">
                            <Image
                                src={urlFor(thumbnail).url()}
                                alt={title || 'Video Thumbnail'}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                                <div className="w-24 h-24 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50 group-hover:scale-110 transition-transform shadow-lg">
                                    <Play className="w-10 h-10 text-white fill-white ml-1" />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <p className="text-gray-500">No video configured</p>
                        </div>
                    )}
                </motion.div>

                <div className="mt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className={`${titleSize} font-black text-gray-900`}
                    >
                        {title}
                    </motion.h2>
                    {achievements && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className={`px-6 py-2 bg-black text-white rounded-full font-bold tracking-wide shadow-lg ${achievementsSize}`}
                        >
                            {achievements}
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    )
}
