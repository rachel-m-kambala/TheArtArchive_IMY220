import Header from "../components/Header.jsx";
import PostPreview from "../components/PostPreview.jsx";
import posts from "../data/posts.js";

function Exhibits() {
    const exhibits = [
        {
            title: "Digital Dreams",
            description:
                "Explore imaginative digital artwork from emerging creators.",
            posts: posts.filter(
                (post) =>
                    post.category === "Digital Art" ||
                    post.category === "Illustration"
            )
        },
        {
            title: "Through the Lens",
            description:
                "A collection of photography capturing people, places and moments.",
            posts: posts.filter(
                (post) =>
                    post.category === "Photography"
            )
        }
    ];

    return (
        <>
            <Header />

            <main className="page">
                <section className="page-heading">
                    <h1>Exhibits</h1>

                    <p>
                        Curated collections from across the Archive.
                    </p>
                </section>

                {exhibits.map((exhibit) => (
                    <section
                        className="exhibit"
                        key={exhibit.title}
                    >
                        <h2>{exhibit.title}</h2>

                        <p>{exhibit.description}</p>

                        <div className="post-grid">
                            {exhibit.posts.map((post) => (
                                <PostPreview
                                    key={post.id}
                                    post={post}
                                />
                            ))}
                        </div>
                    </section>
                ))}
            </main>
        </>
    );
}

export default Exhibits;