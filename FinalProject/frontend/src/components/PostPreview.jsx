//u23559129 Rachel Kambala
import React from "react";
import { Link } from "react-router-dom";

function PostPreview({ post }) {
    return (
        <article className="group overflow-hidden bg-white">
            <Link to={`/post/${post._id}`}>
                <div className="aspect-[4/3] overflow-hidden bg-[#E8E4DC]">
                    <img
                        src={post.image}
                        alt={post.title}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                    />
                </div>
            </Link>

            <div className="p-5">
                <p className="mb-2 text-xs uppercase tracking-widest text-[#9D2E36]">
                    {post.hashtags?.join(" ")}
                </p>

                <Link to={`/post/${post._id}`}>
                    <h3 className="mb-2 text-2xl font-semibold text-[#253247] hover:text-[#9D2E36]">
                        {post.title}
                    </h3>
                </Link>

                <p className="mb-3 text-sm text-[#6B6B6B]">
                    By {post.artistName}
                </p>

                <p className="leading-6 text-[#253247]">
                    {post.description}
                </p>
            </div>
        </article>
    );
}
export default PostPreview;