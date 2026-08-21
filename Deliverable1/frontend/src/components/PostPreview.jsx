//u23559129 Rachel Kambala
import { Link } from "react-router-dom";

export default function PostPreview({ post }) {
    return (
        <div className="postPreview">
            <Link to={`/post/${post.id}`} className="postPreviewLink">
                <img src={post.imageUrl} alt={post.title} className="postPreviewImage" />
                <h3 className="postPreviewTitle">{post.title}</h3>
            </Link>
            
        </div>
    );
}