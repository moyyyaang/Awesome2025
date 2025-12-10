import { defineField, defineType } from 'sanity'
import { Trophy } from 'lucide-react'

export const ranking = defineType({
    name: 'rankingList',
    title: 'Ranking List',
    type: 'object',
    icon: Trophy,
    fields: [
        defineField({
            name: 'title',
            title: '섹션 제목 (Section Title)',
            type: 'string',
            description: '기본값: "Top Channels"',
        }),
        defineField({
            name: 'layout',
            title: '레이아웃 (Layout)',
            type: 'string',
            options: {
                list: [
                    { title: '리스트형 (List)', value: 'list' },
                    { title: '그리드형 (Grid)', value: 'grid' },
                    { title: '2단 리스트형 (Split List)', value: 'split' },
                ],
                layout: 'radio',
            },
            initialValue: 'list',
        }),
        defineField({
            name: 'items',
            title: '랭킹 아이템 목록 (Ranking Items)',
            type: 'array',
            of: [
                defineField({
                    name: 'rankingItem',
                    title: 'Ranking Item',
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'rank',
                            title: '순위 (Rank)',
                            type: 'number',
                        }),
                        defineField({
                            name: 'image',
                            title: '이미지 (Image)',
                            type: 'image',
                        }),
                        defineField({
                            name: 'name',
                            title: '이름 (Name)',
                            type: 'string',
                        }),
                        defineField({
                            name: 'subtitle',
                            title: '보조 설명 (Subtitle)',
                            type: 'string',
                        }),
                        defineField({
                            name: 'score',
                            title: '점수/수치 (Score)',
                            type: 'string',
                        }),
                    ],
                    preview: {
                        select: {
                            title: 'name',
                            subtitle: 'score',
                            rank: 'rank',
                        },
                        prepare({ title, subtitle, rank }) {
                            return {
                                title: `${rank}. ${title}`,
                                subtitle,
                            }
                        }
                    },
                }),
            ],
        }),
    ],
    preview: {
        select: {
            items: 'items',
        },
        prepare({ items }) {
            return {
                title: 'Ranking List',
                subtitle: `${items?.length || 0} items`,
            }
        },
    },
})
