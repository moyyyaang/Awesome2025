import HeroBlock from './blocks/HeroBlock'
import StatsBlock from './blocks/StatsBlock'
import VideoBlock from './blocks/VideoBlock'
import RankingBlock from './blocks/RankingBlock'
import DividerBlock from './blocks/DividerBlock'
import VideoRankingBlock from './blocks/VideoRankingBlock'
import TableOfContents from './TableOfContents';

interface PageBuilderProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    blocks: { _type: string; _key: string;[key: string]: any }[]
}

export default function PageBuilder({ blocks }: PageBuilderProps) {
    if (!blocks || blocks.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-gray-500 space-y-4">
                <p className="text-xl font-semibold">No content blocks found</p>
                <p>Please add items to the &quot;Page Builder&quot; in Sanity Studio.</p>
            </div>
        )
    }

    return (
        <div className="flex flex-col w-full relative">
            <TableOfContents blocks={blocks} />
            {blocks.map((block) => {
                // Render the specific block component
                const BlockComponent = () => {
                    switch (block._type) {
                        case 'hero':
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            return <HeroBlock {...(block as any)} />;
                        case 'statsGrid':
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            return <StatsBlock {...(block as any)} />;
                        case 'videoHighlight':
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            return <VideoBlock {...(block as any)} />;
                        case 'rankingList':
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            return <RankingBlock {...(block as any)} />;
                        case 'divider':
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            return <DividerBlock {...(block as any)} />;
                        case 'videoRanking':
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            return <VideoRankingBlock {...(block as any)} />;
                        default:
                            return <div className="py-10 text-center text-gray-400">Unknown block type: {block._type}</div>;
                    }
                };

                return (
                    <section id={block._key} key={block._key} className="snap-start min-h-screen flex flex-col justify-center w-full relative">
                        <BlockComponent />
                    </section>
                );
            })}
        </div>
    )
}
