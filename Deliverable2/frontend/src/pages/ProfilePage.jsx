import React from "react";
import { useParams, Link } from "react-router-dom";

import Header from "../components/Header.jsx";
import Profile from "../components/Profile.jsx";
import UserPosts from "../components/UserPosts.jsx";
import Friends from "../components/Friends.jsx";

import posts from "../data/posts.js";
import users from "../data/users.js";

function ProfilePage() {
    const { id } = useParams();

    const user = users.find(
        (user) => user.id === Number(id)
    );

    if (!user) {
        return (
            <>
                <Header />

                <main className="page">
                    <section className="page-heading">
                        <h1>Profile Not Found</h1>

                        <p>
                            We could not find a profile with
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

    const userPosts = posts.filter(
        (post) => post.artist === user.username
    );

    const friends = users.filter((friend) =>
        user.friends.includes(friend.id)
    );

    return (
        <>
            <Header />

            <main className="page">

                <Profile
                    user={user}
                    isOwnProfile={false}
                />

                <section className="profile-content">

                    <UserPosts
                        posts={userPosts}
                    />

                    <Friends
                        friends={friends}
                    />

                </section>

            </main>
        </>
    );
}

export default ProfilePage;