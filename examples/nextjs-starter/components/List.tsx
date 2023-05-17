import {
    registerUniformComponent,
    ComponentProps,
} from "@uniformdev/canvas-react";

type ListProps = ComponentProps<{
    name: string;
    description?: string;
    image?: string;
}>;

const List: React.FC<ListProps> = ({ name, description, image }: ListProps) => (
    <div>
        <h1 className="title">{name}</h1>
        <div
            className="description"
        />
        <span>{description}</span>
        <div
            className="image">
            <img src={image} alt={image}/>
        </div>
    </div>
);

registerUniformComponent({
    type: "list",
    component: List,
});

export default List;
