//Rachel Kambala u23559129
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

function SearchInput() {
    const [searchParams, setSearchParams] = useSearchParams();

    const [searchTerm, setSearchTerm] = useState(
        searchParams.get("search") || ""
    );

    const [results, setResults] = useState({
        users: [],
        posts: [],
        albums: []
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [hasSearched, setHasSearched] = useState(false);

    async function performSearch(term) {
        const cleanedTerm = term.trim();

        if (!cleanedTerm) {
            setResults({ users: [], posts: [], albums: [] });
            setHasSearched(false);
            setError("");
            setLoading(false);
            return;
        }

        setLoading(true);
        setError("");
        setHasSearched(true);

        try {
            const response = await fetch(
                `/api/search?q=${encodeURIComponent(cleanedTerm)}`
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Unable to search the archive."
                );
            }

            setResults({
                users: Array.isArray(data.users) ? data.users : [],
                posts: Array.isArray(data.posts) ? data.posts : [],
                albums: Array.isArray(data.albums) ? data.albums : []
            });
        } catch (searchError) {
            setError(searchError.message);
            setResults({ users: [], posts: [], albums: [] });
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const term = searchParams.get("search") || "";
        setSearchTerm(term);

        if (term.trim()) {
            performSearch(term);
        } else {
            setResults({ users: [], posts: [], albums: [] });
            setHasSearched(false);
            setError("");
        }
    }, [searchParams]);

    function handleSubmit(event) {
        event.preventDefault();

        const term = searchTerm.trim();

        if (!term) {
            setSearchParams({});
            return;
        }

        setSearchParams({ search: term });
    }

    function clearSearch() {
        setSearchTerm("");
        setSearchParams({});
        setResults({ users: [], posts: [], albums: [] });
        setHasSearched(false);
        setError("");
    }

    function hashtagLink(tag) {
        return `/?search=${encodeURIComponent(
            String(tag).replace(/^#/, "")
        )}`;
    }

    return (
        <section className="mb-8">
            <form className="search-form" onSubmit={handleSubmit}>
                <label htmlFor="site-search">
                    Search The Archive
                </label>

                <div className="search-wrapper">
                    <input
                        id="site-search"
                        type="search"
                        placeholder="Search artists, artwork or hashtags..."
                        value={searchTerm}
                        onChange={event =>
                            setSearchTerm(event.target.value)
                        }
                    />

                    <button type="submit">
                        Search
                    </button>

                    {searchTerm && (
                        <button
                            type="button"
                            onClick={clearSearch}
                        >
                            Clear
                        </button>
                    )}
                </div>
            </form>

            {loading && (
                <p className="mt-4 text-sm text-[#6B6B6B]">
                    Searching the archive...
                </p>
            )}

            {error && (
                <p role="alert" className="form-error mt-4">
                    {error}
                </p>
            )}

            {hasSearched && !loading && !error && (
                <section className="mt-8 space-y-8">
                    <h2 className="text-2xl font-semibold text-[#253247]">
                        Search results for "{searchParams.get("search")}"
                    </h2>

                    {results.users.length === 0 &&
                     results.posts.length === 0 &&
                     results.albums.length === 0 && (
                        <p className="text-[#6B6B6B]">
                            No results found. Try another word or check your spelling.
                        </p>
                    )}

                    {results.users.length > 0 && (
                        <section>
                            <h3 className="mb-4 text-xl font-semibold text-[#253247]">
                                Artists
                            </h3>

                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                {results.users.map(user => (
                                    <Link
                                        key={user._id}
                                        to={`/profile/${user._id}`}
                                        className="flex items-center gap-3 border border-[#D8D3CA] bg-white p-4 hover:border-[#9D2E36]"
                                    >
                                        {user.profileImage ? (
                                            <img
                                                src={user.profileImage}
                                                alt=""
                                                className="h-12 w-12 rounded-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E8E4DC] font-semibold text-[#253247]">
                                                {(user.name || user.username || "A")
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </div>
                                        )}

                                        <div>
                                            <p className="font-semibold text-[#253247]">
                                                {user.name || user.username}
                                            </p>
                                            <p className="text-sm text-[#6B6B6B]">
                                                @{user.username}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}

                    {results.posts.length > 0 && (
                        <section>
                            <h3 className="mb-4 text-xl font-semibold text-[#253247]">
                                Artwork
                            </h3>

                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                                {results.posts.map(post => (
                                    <article
                                        key={post._id}
                                        className="overflow-hidden border border-[#D8D3CA] bg-white"
                                    >
                                        <Link to={`/post/${post._id}`}>
                                            {post.image && (
                                                <img
                                                    src={post.image}
                                                    alt={post.title || "Artwork"}
                                                    className="aspect-[4/3] w-full object-cover"
                                                />
                                            )}
                                        </Link>

                                        <div className="p-4">
                                            <Link
                                                to={`/post/${post._id}`}
                                                className="text-lg font-semibold text-[#253247] hover:text-[#9D2E36]"
                                            >
                                                {post.title || "Untitled artwork"}
                                            </Link>

                                            <p className="mt-1 text-sm text-[#6B6B6B]">
                                                By {post.artistName || "Unknown artist"}
                                            </p>

                                            <p className="mt-2 text-sm text-[#253247]">
                                                {post.description}
                                            </p>

                                            {post.hashtags?.length > 0 && (
                                                <div className="mt-3 flex flex-wrap gap-2">
                                                    {post.hashtags.map(tag => (
                                                        <Link
                                                            key={tag}
                                                            to={hashtagLink(tag)}
                                                            className="text-sm text-[#9D2E36] hover:underline"
                                                        >
                                                            {tag.startsWith("#") ? tag : `#${tag}`}
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </section>
                    )}

                    {results.albums.length > 0 && (
                        <section>
                            <h3 className="mb-4 text-xl font-semibold text-[#253247]">
                                Collections
                            </h3>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {results.albums.map(album => (
                                    <article
                                        key={album._id}
                                        className="border border-[#D8D3CA] bg-white p-5"
                                    >
                                        <p className="text-xs uppercase tracking-widest text-[#9D2E36]">
                                            Collection
                                        </p>

                                        <h4 className="mt-2 text-xl font-semibold text-[#253247]">
                                            {album.name}
                                        </h4>

                                        <p className="mt-2 text-sm leading-6 text-[#6B6B6B]">
                                            {album.description}
                                        </p>

                                        {album.hashtags?.length > 0 && (
                                            <div className="mt-3 flex flex-wrap gap-2">
                                                {album.hashtags.map(tag => (
                                                    <Link
                                                        key={tag}
                                                        to={hashtagLink(tag)}
                                                        className="text-sm text-[#9D2E36] hover:underline"
                                                    >
                                                        {tag.startsWith("#") ? tag : `#${tag}`}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}

                                        <Link
                                            to={`/album/${album._id}`}
                                            className="mt-4 inline-block font-medium text-[#9D2E36] hover:underline"
                                        >
                                            View collection →
                                        </Link>
                                    </article>
                                ))}
                            </div>
                        </section>
                    )}
                </section>
            )}
        </section>
    );
}
export default SearchInput;