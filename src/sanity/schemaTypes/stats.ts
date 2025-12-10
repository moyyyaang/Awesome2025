import { defineField, defineType } from 'sanity'
import { BarChart3 } from 'lucide-react'

export const stats = defineType({
    name: 'statsGrid',
    title: 'Stats Grid',
    type: 'object',
    icon: BarChart3,
    fields: [
        defineField({
            name: 'title',
            title: '섹션 제목 (Section Title)',
            type: 'string',
        }),
        defineField({
            name: 'cardTheme',
            title: '카드 테마 (Card Theme)',
            type: 'string',
            options: {
                list: [
                    { title: '글래스 (Glass - 기본)', value: 'glass' },
                    { title: '핑크 파스텔 (Pink Pastel)', value: 'pink' },
                ],
                layout: 'radio',
            },
            initialValue: 'glass',
        }),
        defineField({
            name: 'items',
            title: 'Stat Items',
            type: 'array',
            of: [
                defineField({
                    name: 'statItem',
                    title: 'Stat Item',
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'label',
                            title: '라벨 (Label)',
                            type: 'text',
                            rows: 2,
                            description: '엔터(Enter)를 쳐서 줄바꿈을 할 수 있습니다.',
                        }),
                        defineField({
                            name: 'value',
                            title: '값 (숫자 - Number)',
                            type: 'number',
                            description: '숫자 애니메이션(CountUp)을 사용할 때 입력하세요.',
                        }),
                        defineField({
                            name: 'valueString',
                            title: '값 (텍스트 - Text)',
                            type: 'string',
                            description: '예: "20억 5천만". 이 값이 있으면 위의 숫자 값은 무시됩니다.',
                        }),
                        defineField({
                            name: 'suffix',
                            title: '접미사 (예: +, %)',
                            type: 'string',
                        }),
                        defineField({
                            name: 'size',
                            title: '텍스트 크기 (Text Size)',
                            type: 'string',
                            options: {
                                list: [
                                    { title: '보통 (Normal)', value: 'normal' },
                                    { title: '작게 (Small)', value: 'small' },
                                    { title: '크게 (Large)', value: 'large' },
                                ],
                                layout: 'radio',
                            },
                            initialValue: 'normal',
                        }),
                        defineField({
                            name: 'icon',
                            title: '아이콘 이름 (Lucide)',
                            type: 'string',
                            description: 'Lucide 아이콘 이름을 입력하세요 (예: Heart, Star)',
                        }),
                    ],
                    preview: {
                        select: {
                            title: 'label',
                            value: 'value',
                            valueString: 'valueString',
                        },
                        prepare({ title, value, valueString }) {
                            return {
                                title: title,
                                subtitle: valueString || (value ? `${value}` : ''),
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
                title: 'Stats Grid',
                subtitle: `${items?.length || 0} items`,
            }
        },
    },
})
