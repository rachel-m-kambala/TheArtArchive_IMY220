import Header from "../components/Header.jsx";
import SearchInput from "../components/SearchInput.jsx";
import Feed from "../components/Feed.jsx";
import posts from "../data/posts.js";

function Home() {
    const currentUser = "artsy5";

    const localPosts = posts.filter(
        (post) =>
            post.artist === currentUser ||
            post.artist === "lunavance" ||
            post.artist === "oliverthorne"
    );

    return (
        <>
            <Header />

            <main className="page">
                <section className="page-heading">
                    <p className="eyebrow">
                        THE ART ARCHIVE
                    </p>

                    <h1>Gallery</h1>

                    <p>
                        Explore the latest activity from your
                        creative community.
                    </p>
                </section>

                <SearchInput />

                <Feed
                    posts={localPosts}
                    title="Local Gallery"
                />

                <Feed
                    posts={posts}
                    title="Global Showcase"
                />
            </main>
        </>
    );
}

export default Home;