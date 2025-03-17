import React from "react";
import CommentSectionInput from "./CommentSectionInput";

interface CommentSectionProps {}

const CommentSection: React.FC<CommentSectionProps> = ({}) => {
    return (
        <div>
            <CommentSectionInput />
        </div>
    );
};

export default CommentSection;
