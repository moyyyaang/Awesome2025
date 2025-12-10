import { type SchemaTypeDefinition } from 'sanity'
import { page } from './page'
import { hero } from './hero'
import { stats } from './stats'
import { video } from './video'
import { ranking } from './ranking'
import { divider } from './divider'
import { videoRanking } from './videoRanking'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [page, hero, stats, video, ranking, divider, videoRanking],
}
