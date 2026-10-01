import React from "react";
import Header from "../components/Header.jsx";
import Profile from "../components/Profile.jsx";
import EditProfile from "../components/EditProfile.jsx";
import UserPosts from "../components/UserPosts.jsx";
import Friends from "../components/Friends.jsx";
import CreatePost from "../components/CreatePost.jsx";
import users from "../data/users.js";
import posts from "../data/posts.js";

function Studio() {
    const currentUser = users[0];

    const userPosts = posts.filter(
        (post) => post.artist === currentUser.username
    );

    const friends = users.filter((user) =>
        currentUser.friends.includes(user.id)
    );

    return (
        <>
            <Header />

            <main className="page">
                <Profile
                    user={currentUser}
                    isOwnProfile={true}
                />

                <div className="studio-layout">
                    <section>
                        <UserPosts posts={userPosts} />

                        <CreatePost />
                    </section>

                    <aside>
                        <Friends friends={friends} />

                        <EditProfile user={currentUser} />
                    </aside>
                </div>
            </main>
        </>
    );
}

export default Studio;