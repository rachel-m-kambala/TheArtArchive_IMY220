import React, { useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import SearchInput from "../components/SearchInput.jsx";
import Feed from "../components/Feed.jsx";

function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState([""]);

    useEffect(() => {
        async function loadPosts(){
            try{
                const response = await fetch("/api/posts");
                if(!response.ok){
                    throw new Error("Failed to fetch posts.");
                }
                const data = await response.json();
                setPosts(data);
            } catch (error) {
                setError([error.message]);
            } finally {
                setLoading(false);
            }
        }

        loadPosts();
    }, []);
    
    if(loading){
        return(
            <>
                <Header />
                <main className="page">
                    <p>Loading gallery...</p>
                </main>
            </>
        );
    }

     if(error){
        return(
            <>
                <Header />
                <main className="page">
                    <p>Error loading gallery: {error}</p>
                </main>
            </>
        );
    }
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