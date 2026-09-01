import { useParams, Link } from "react-router-dom";

import Header from "../components/Header.jsx";
import Post from "../components/Post.jsx";
import Comments from "../components/Comments.jsx";
import EditPost from "../components/EditPost.jsx";

import posts from "../data/posts.js";
import comments from "../data/comments.js";

function PostPage() {
    const { id } = useParams();

    const post = posts.find(
        (post) => post.id === Number(id)
    );

    if (!post) {
        return (
            <>
                <Header />

                <main className="page">
                    <section className="page-heading">

                        <h1>Artwork Not Found</h1>

                        <p>
                            We could not find artwork with
                            ID {id}.
                        </p>

                        <Link to="/home">
                            Return to Gallery
                        </Link>

                    </section>
                </main>
            </>
        );
    }

    const isOwner =
        post.artistId === 1 || post.artistId === 2;

    return (
        <>
            <Header />

            <main className="page">

                <Post
                    post={post}
                />

                <Comments
                    comments={comments}
                />

                {isOwner && (
                    <EditPost
                        post={post}
                    />
                )}

            </main>
        </>
    );
}

export default PostPage;