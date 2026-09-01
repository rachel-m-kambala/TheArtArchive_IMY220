import { useState } from "react";

function SearchInput() {
    const [searchTerm, setSearchTerm] = useState("");

    function handleSubmit(event) {
        event.preventDefault();

        console.log("Search:", searchTerm);
    }

    return (
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
                    onChange={(event) =>
                        setSearchTerm(event.target.value)
                    }
                />

                <button type="submit">
                    Search
                </button>
            </div>
        </form>
    );
}

export default SearchInput;