'use client'

interface DividerBlockProps {
    style?: 'default' | 'dashed' | 'spacer'
}

export default function DividerBlock({ style = 'default' }: DividerBlockProps) {
    if (style === 'spacer') {
        return <div className="h-24 w-full" />
    }

    return (
        <div className="py-12 w-full flex justify-center">
            <div className={`w-full max-w-4xl border-t-2 border-gray-200/50 ${style === 'dashed' ? 'border-dashed' : ''}`} />
        </div>
    )
}
