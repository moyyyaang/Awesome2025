import { defineField, defineType } from 'sanity'
import { Minus } from 'lucide-react'

export const divider = defineType({
    name: 'divider',
    title: '구분선 (Divider)',
    type: 'object',
    icon: Minus,
    fields: [
        defineField({
            name: 'style',
            title: '스타일 (Style)',
            type: 'string',
            options: {
                list: [
                    { title: '기본 (Default)', value: 'default' },
                    { title: '점선 (Dashed)', value: 'dashed' },
                    { title: '공백 (Spacer)', value: 'spacer' },
                ],
                layout: 'radio',
            },
            initialValue: 'default',
        }),
    ],
    preview: {
        select: {
            style: 'style',
        },
        prepare({ style }) {
            return {
                title: '구분선',
                subtitle: style === 'spacer' ? '공백' : style === 'dashed' ? '점선' : '실선',
            }
        },
    },
})
