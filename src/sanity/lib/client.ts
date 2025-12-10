import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, useCdn } from '../env'

export const client = projectId
    ? createClient({
        projectId,
        dataset,
        apiVersion,
        useCdn: false, // Set to false for real-time updates
        perspective: 'published',
    })
    : { fetch: () => Promise.resolve(null) } as any
