import createImageUrlBuilder from '@sanity/image-url'
// import { SanityImageSource } from "@sanity/image-url/lib/types/types";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = any

import { dataset, projectId } from '../env'

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({ projectId: projectId || '', dataset: dataset || '' })

export const urlFor = (source: SanityImageSource) => {
    return builder.image(source)
}
