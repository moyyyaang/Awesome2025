'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { List } from 'lucide-react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function TableOfContents({ blocks }: { blocks: any[] }) {
    const [isOpen, setIsOpen] = useState(false)
    const [headings, setHeadings] = useState<{ id: string, text: string }[]>([])

    useEffect(() => {
        // Extract headings from blocks
        const extractedHeadings = blocks
            .map((block) => {
                const id = block._key
                // Try to find a meaningful title/heading
                const text = block.heading || block.title || (block._type === 'rankingList' ? 'Rankings' : null)

                if (text) {
                    return { id, text }
                }
                return null
            })
            .filter((item): item is { id: string, text: string } => item !== null)

        setHeadings(extractedHeadings)
    }, [blocks])

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id)
        if (element) {
            // Use native scrollIntoView or specialized scroll if using lenis via window
            element.scrollIntoView({ behavior: 'smooth' })
            setIsOpen(false)
        }
    }

    if (headings.length === 0) return null

    return (
        <>
            {/* Toggle Button */}
            <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="fixed right-6 top-6 z-50 p-3 bg-white/80 backdrop-blur-md rounded-full shadow-lg border border-gray-200 text-gray-800 hover:bg-white hover:scale-105 transition-all"
                onClick={() => setIsOpen(!isOpen)}
            >
                <List size={24} />
            </motion.button>

            {/* TOC Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        className="fixed right-6 top-20 z-50 w-64 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100 p-6"
                    >
                        <h3 className="text-lg font-bold mb-4 text-gray-900 border-b pb-2">목차</h3>
                        <div className="flex flex-col space-y-3">
                            {headings.map((heading) => (
                                <button
                                    key={heading.id}
                                    onClick={() => scrollToSection(heading.id)}
                                    className="text-left text-sm text-gray-600 hover:text-blue-600 font-medium transition-colors line-clamp-1"
                                >
                                    {heading.text}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
