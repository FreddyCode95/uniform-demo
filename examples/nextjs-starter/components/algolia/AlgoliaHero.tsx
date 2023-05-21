import {
    registerUniformComponent,
    ComponentProps,
} from "@uniformdev/canvas-react";

type HeroProps = ComponentProps<{
    title: string;
    description?: string;
    subtitle?: string;
}>;

const AlgoliaHero: React.FC<HeroProps> = ({ title, description, subtitle }: HeroProps) => (
    <div>
        <h1 className="title">{title}</h1>
        <div
            className="description"
            dangerouslySetInnerHTML={{ __html: description }}
        />
        <div
            className="subtitle">
            <h6>{subtitle}</h6>
        </div>
    </div>
);

registerUniformComponent({
    type: "algoliahero",
    component: AlgoliaHero,
});

export default AlgoliaHero;
