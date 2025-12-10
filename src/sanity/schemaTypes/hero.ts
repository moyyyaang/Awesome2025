import { defineField, defineType } from 'sanity'
import { LayoutTemplate } from 'lucide-react'

export const hero = defineType({
    name: 'hero',
    title: 'Hero',
    type: 'object',
    icon: LayoutTemplate,
    fields: [
        defineField({
            name: 'heading',
            title: '메인 타이틀 (Heading)',
            type: 'text',
            rows: 2,
        }),
        defineField({
            name: 'titleSize',
            title: '타이틀 크기 (Title Size)',
            type: 'string',
            options: {
                list: [
                    { title: '작게 (Small)', value: 'text-4xl md:text-6xl' },
                    { title: '보통 (Medium)', value: 'text-5xl md:text-7xl' },
                    { title: '크게 (Large)', value: 'text-6xl md:text-9xl' },
                    { title: '아주 크게 (Huge)', value: 'text-7xl md:text-[10rem]' },
                ],
                layout: 'radio',
            },
            initialValue: 'text-6xl md:text-9xl',
        }),
        defineField({
            name: 'subheading',
            title: '서브 타이틀 (Subheading)',
            type: 'text',
            rows: 2,
        }),
        defineField({
            name: 'backgroundImage',
            title: '배경 이미지 (Background Image)',
            type: 'image',
            options: {
                hotspot: true,
            },
            fields: [
                defineField({
                    name: 'alt',
                    type: 'string',
                    title: '대체 텍스트 (Alt Text)',
                }),
            ],
        }),
    ],
    preview: {
        select: {
            title: 'heading',
            media: 'backgroundImage',
        },
        prepare({ title, media }) {
            return {
                title: title || 'Hero Section',
                subtitle: 'Hero',
                media,
            }
        },
    },
})
