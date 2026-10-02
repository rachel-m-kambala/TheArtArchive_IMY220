//Rachel Kambala u23559129
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header.jsx";
import UserPosts from "../components/UserPosts.jsx";
import Friends from "../components/Friends.jsx";

function ProfilePage() {
    const { id } = useParams();

    const [user, setUser] = useState(null);
    const [userPosts, setUserPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadProfile() {
            try {
                setLoading(true);
                setError("");

                const userResponse = await fetch(
                    `/api/users/${id}`
                );

                if (!userResponse.ok) {
                    throw new Error(
                        "Failed to retrieve user."
                    );
                }

                const userData =
                    await userResponse.json();

                const postsResponse = await fetch(
                    "/api/posts"
                );

                if (!postsResponse.ok) {
                    throw new Error(
                        "Failed to retrieve posts."
                    );
                }

                const postsData =
                    await postsResponse.json();

                const filteredPosts =
                    postsData.filter(
                        (post) =>
                            String(post.userId) ===
                            String(id)
                    );

                setUser(userData);
                setUserPosts(filteredPosts);
            } catch (error) {
                console.error(error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        loadProfile();
    }, [id]);

    if (loading) {
        return <p>Loading profile...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!user) {
        return <p>User not found.</p>;
    }

    return (
        <>
            <Header />

            <main>
                <h1>{user.name}</h1>

                <p>@{user.username}</p>

                {user.profileImage && (
                    <img
                        src={user.profileImage}
                        alt={user.username}
                    />
                )}

                <p>{user.bio}</p>

                <UserPosts
                    posts={userPosts}
                />

                <Friends
                    friends={user.friends || []}
                />
            </main>
        </>
    );
}

export default ProfilePage;