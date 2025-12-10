'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

// import { SanityImageSource } from '@sanity/image-url/lib/types/types'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = any

interface HeroBlockProps {
    heading?: string
    subheading?: string
    backgroundImage?: SanityImageSource & { alt?: string }
    titleSize?: string
}

export default function HeroBlock({ heading, subheading, backgroundImage, titleSize }: HeroBlockProps) {
    const headingClass = titleSize || 'text-6xl md:text-9xl'

    return (
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
            {/* Background Image (Optional Overlay) */}
            {backgroundImage?.asset && (
                <div className="absolute inset-0 z-0">
                    <Image
                        src={urlFor(backgroundImage).url()}
                        alt={backgroundImage.alt || 'Hero Background'}
                        fill
                        className="object-cover opacity-20 mix-blend-overlay"
                        priority
                    />
                </div>
            )}

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className={`${headingClass} font-black mb-6 tracking-tighter text-gray-900 drop-shadow-sm whitespace-pre-wrap`}
                >
                    {heading}
                </motion.h1>

                {subheading && (
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                        className="text-2xl md:text-3xl text-gray-800 font-bold"
                    >
                        {subheading}
                    </motion.p>
                )}
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            >
                <div className="w-6 h-10 border-2 border-gray-800 rounded-full flex justify-center p-2">
                    <motion.div
                        animate={{ y: [0, 12, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="w-1 h-1 bg-gray-800 rounded-full"
                    />
                </div>
            </motion.div>
        </section>
    )
}
