import {
    registerUniformComponent,
    UniformSlot,
} from "@uniformdev/canvas-react";
import React from "react";

const Section: React.FC = ({ }) => (
    <div className="grid-container">
        <div className="">
            <UniformSlot name="leftContent" />
        </div>
        <div className="">
            <UniformSlot name="rightContent" />
        </div>
    </div>
);

registerUniformComponent({
    type: "section",
    component: Section,
});

export default Section;
