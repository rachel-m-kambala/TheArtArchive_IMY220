import React from "react";
import { useParams, Link } from "react-router-dom";

import Header from "../components/Header.jsx";
import Post from "../components/Post.jsx";
import Comments from "../components/Comments.jsx";
import EditPost from "../components/EditPost.jsx";

function PostPage() {
    const { id } = useParams();

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

     useEffect(() => {
        async function loadPost() {
            try {
                const response = await fetch(
                    `/api/posts/${id}`
                );

                if (!response.ok) {
                    throw new Error(
                        "Unable to retrieve post."
                    );
                }

                const data = await response.json();

                setPost(data);

            } catch (error) {
                console.error(error);
                setError(error.message);

            } finally {
                setLoading(false);
            }
        }

        loadPost();
    }, [id]);

    if (loading) {
        return (
            <>
                <Header />
                <main className="page">
                    <p>Loading artwork...</p>
                </main>
            </>
        );
    }

    if (error) {
        return (
            <>
                <Header />
                <main className="page">
                    <p className="form-error">
                        {error}
                    </p>
                </main>
            </>
        );
    }

    return (
        <>
            <Header />

            <main className="page">
                <Post post={post} />

                <Comments postId={id} />
            </main>
        </>
    );
}

export default PostPage;