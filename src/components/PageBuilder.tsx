import HeroBlock from './blocks/HeroBlock'
import StatsBlock from './blocks/StatsBlock'
import VideoBlock from './blocks/VideoBlock'
import RankingBlock from './blocks/RankingBlock'
import DividerBlock from './blocks/DividerBlock'
import VideoRankingBlock from './blocks/VideoRankingBlock'

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
        <div className="flex flex-col w-full">
            {blocks.map((block) => {
                // Render the specific block component
                const BlockComponent = () => {
                    switch (block._type) {
                        case 'hero':
                            return <HeroBlock {...block} />;
                        case 'statsGrid':
                            return <StatsBlock {...block} />;
                        case 'videoHighlight':
                            return <VideoBlock {...block} />;
                        case 'rankingList':
                            return <RankingBlock {...block} />;
                        case 'divider':
                            return <DividerBlock {...block} />;
                        case 'videoRanking':
                            return <VideoRankingBlock {...block} />;
                        default:
                            return <div className="py-10 text-center text-gray-400">Unknown block type: {block._type}</div>;
                    }
                };

                return (
                    <section key={block._key} className="snap-start min-h-screen flex flex-col justify-center w-full">
                        <BlockComponent />
                    </section>
                );
            })}
        </div>
    )
}
