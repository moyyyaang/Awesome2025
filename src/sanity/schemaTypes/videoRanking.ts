import { defineField, defineType } from 'sanity'
import { Clapperboard } from 'lucide-react'

export const videoRanking = defineType({
    name: 'videoRanking',
    title: '동영상 랭킹 (Video Ranking)',
    type: 'object',
    icon: Clapperboard,
    fields: [
        defineField({
            name: 'title',
            title: '섹션 제목 (Section Title)',
            type: 'string',
        }),
        defineField({
            name: 'gridColumns',
            title: '한 줄에 보여줄 개수 (Columns per Row)',
            type: 'string',
            options: {
                list: [
                    { title: '2개 (크게)', value: '2' },
                    { title: '3개 (보통)', value: '3' },
                    { title: '4개 (작게)', value: '4' },
                ],
                layout: 'radio',
            },
            initialValue: '3',
        }),
        defineField({
            name: 'items',
            title: '동영상 목록 (Video Items)',
            type: 'array',
            of: [
                defineField({
                    name: 'videoItem',
                    title: '동영상 아이템',
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'rank',
                            title: '순위 (Rank)',
                            type: 'number',
                        }),
                        defineField({
                            name: 'thumbnail',
                            title: '썸네일 이미지 (Thumbnail)',
                            type: 'image',
                        }),
                        defineField({
                            name: 'title',
                            title: '영상 제목 (Title)',
                            type: 'string',
                        }),
                        defineField({
                            name: 'youtubeUrl',
                            title: '유튜브 URL',
                            type: 'url',
                        }),
                        defineField({
                            name: 'description',
                            title: '설명 (Description)',
                            type: 'text',
                            rows: 2,
                        }),
                    ],
                    preview: {
                        select: {
                            title: 'title',
                            subtitle: 'rank',
                            media: 'thumbnail',
                        },
                        prepare({ title, subtitle, media }) {
                            return {
                                title: title,
                                subtitle: `#${subtitle}`,
                                media: media,
                            }
                        },
                    },
                }),
            ],
        }),
    ],
    preview: {
        select: {
            title: 'title',
            items: 'items',
        },
        prepare({ title, items }) {
            return {
                title: title || '동영상 랭킹',
                subtitle: `${items?.length || 0}개의 동영상`,
            }
        },
    },
})
