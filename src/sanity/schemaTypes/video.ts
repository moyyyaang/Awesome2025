import { defineField, defineType } from 'sanity'
import { PlaySquare } from 'lucide-react'

export const video = defineType({
    name: 'videoHighlight',
    title: 'Video Highlight',
    type: 'object',
    icon: PlaySquare,
    fields: [
        defineField({
            name: 'title',
            title: '영상 제목 (Title)',
            type: 'string',
        }),
        defineField({
            name: 'titleSize',
            title: '제목 크기 (Title Size)',
            type: 'string',
            options: {
                list: [
                    { title: '작게 (Small)', value: 'text-3xl md:text-4xl' },
                    { title: '보통 (Medium)', value: 'text-4xl md:text-6xl' },
                    { title: '크게 (Large)', value: 'text-5xl md:text-7xl' },
                    { title: '아주 크게 (Huge)', value: 'text-6xl md:text-8xl' },
                ],
                layout: 'radio',
            },
            initialValue: 'text-4xl md:text-6xl',
        }),
        defineField({
            name: 'thumbnail',
            title: '썸네일 이미지 (Thumbnail)',
            type: 'image',
        }),
        defineField({
            name: 'youtubeUrl',
            title: '유튜브 URL',
            type: 'url',
        }),
        defineField({
            name: 'achievements',
            title: '성과 텍스트 (Achievements)',
            type: 'string',
            description: '예: "조회수 100만 달성"',
        }),
        defineField({
            name: 'achievementsSize',
            title: '성과 텍스트 크기 (Achievements Size)',
            type: 'string',
            options: {
                list: [
                    { title: '작게 (Small)', value: 'text-lg md:text-xl' },
                    { title: '보통 (Medium)', value: 'text-xl md:text-2xl' },
                    { title: '크게 (Large)', value: 'text-2xl md:text-3xl' },
                ],
                layout: 'radio',
            },
            initialValue: 'text-xl md:text-2xl',
        }),
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'achievements',
            media: 'thumbnail',
        },
    },
})
