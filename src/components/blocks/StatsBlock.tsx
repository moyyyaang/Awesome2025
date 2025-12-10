'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import * as LucideIcons from 'lucide-react'

import CountUp from 'react-countup'

interface StatItem {
    label: string
    value?: number
    valueString?: string
    suffix?: string
    icon?: string
    size?: 'normal' | 'small' | 'large'
    _key: string
}

interface StatsBlockProps {
    items?: StatItem[]
    cardTheme?: 'glass' | 'pink'
    title?: string
}

export default function StatsBlock({ items, cardTheme = 'glass', title }: StatsBlockProps) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })

    if (!items || items.length === 0) return null

    return (
        <section ref={ref} className="py-20 px-4">
            <div className="max-w-6xl mx-auto">
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {items.map((item, index) => {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        const IconComponent = item.icon ? (LucideIcons as any)[item.icon] : null

                        // Theme Styles
                        const themeClasses = cardTheme === 'pink'
                            ? 'bg-pink-100/90 border-pink-200 text-gray-900 shadow-lg'
                            : 'bg-white/60 border-white/50 text-gray-900 shadow-xl backdrop-blur-md'

                        // Size Classes
                        const valueSizeClass = item.size === 'small' ? 'text-3xl md:text-4xl' : item.size === 'large' ? 'text-6xl md:text-7xl' : 'text-5xl md:text-5xl'
                        const labelSizeClass = item.size === 'small' ? 'text-sm' : 'text-lg'

                        return (
                            <motion.div
                                key={item._key}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className={`p-8 rounded-3xl border flex flex-col items-center justify-center text-center ${themeClasses}`}
                            >
                                {IconComponent && (
                                    <div className={`mb-4 p-3 rounded-full ${cardTheme === 'pink' ? 'bg-white/50 text-pink-600' : 'bg-white/50 text-gray-700'}`}>
                                        <IconComponent size={32} />
                                    </div>
                                )}

                                <div className={`font-black mb-2 flex items-baseline justify-center flex-wrap ${valueSizeClass} break-words w-full`}>
                                    {item.valueString ? (
                                        <span className="whitespace-pre-wrap leading-tight">{item.valueString}</span>
                                    ) : (
                                        <span className="whitespace-nowrap">
                                            <CountUp
                                                start={0}
                                                end={item.value || 0}
                                                separator=","
                                                duration={2}
                                                className="inline-block"
                                            />
                                            {item.suffix && <span className="ml-1">{item.suffix}</span>}
                                        </span>
                                    )}
                                </div>

                                <div className={`font-medium opacity-80 ${labelSizeClass} whitespace-pre-wrap`}>
                                    {item.label}
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
