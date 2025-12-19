'use client'

import { ReactNode, useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { usePathname } from 'next/navigation'

interface SmoothScrollProps {
    children: ReactNode
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
    const pathname = usePathname()
    const isStudio = pathname?.startsWith('/studio')

    useEffect(() => {
        if (isStudio) return

        const lenis = new Lenis()

        function raf(time: number) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        return () => {
            lenis.destroy()
        }
    }, [isStudio])

    return <>{children}</>
}
