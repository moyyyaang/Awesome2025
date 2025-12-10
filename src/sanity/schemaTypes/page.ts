import { defineField, defineType } from 'sanity'
import { FileText } from 'lucide-react'

export const page = defineType({
    name: 'page',
    title: 'Page',
    type: 'document',
    icon: FileText,
    fields: [
        defineField({
            name: 'title',
            title: '페이지 제목 (Title)',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            title: '슬러그 (URL 주소)',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
        }),
        defineField({
            name: 'theme',
            title: '페이지 테마 (Theme)',
            type: 'string',
            options: {
                list: [
                    { title: '파스텔 (Pastel)', value: 'pastel' },
                    { title: '다크 (Dark)', value: 'dark' },
                    { title: '비비드 (Vivid)', value: 'vivid' },
                ],
                layout: 'radio',
            },
            initialValue: 'pastel',
        }),
        defineField({
            name: 'pageBuilder',
            title: '페이지 빌더 (Page Builder)',
            type: 'array',
            of: [
                { type: 'hero' },
                { type: 'statsGrid' },
                { type: 'videoHighlight' },
                { type: 'rankingList' },
                { type: 'videoRanking' },
                { type: 'divider' },
                // Free block can be a simple text block or rich text
                defineField({
                    name: 'freeBlock',
                    title: 'Free Block',
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'content',
                            title: 'Content',
                            type: 'array',
                            of: [{ type: 'block' }],
                        }),
                    ],
                }),
            ],
        }),
    ],
})
