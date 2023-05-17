import {
    registerUniformComponent,
    ComponentProps,
} from "@uniformdev/canvas-react";

type HeroHeroProps = ComponentProps<{
    title: string;
    description?: string;
    subtitle?: string;
}>;

const HeroHero: React.FC<HeroHeroProps> = ({ title, description, subtitle }: HeroHeroProps) => (
    <div>
        <h1 className="title">{title}{title}</h1>
        <div
            className="description"
            dangerouslySetInnerHTML={{ __html: description }}
        />
        <div
            className="subtitle">
            <span>{subtitle}</span>
            <span>{subtitle}</span>

        </div>
    </div>
);

registerUniformComponent({
    type: "herohero",
    component: HeroHero,
});

export default HeroHero;
