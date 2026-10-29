//Rachel Kambala u23559129
import React, { useState } from "react";

function ReportPost({ postId }) {
    const [reason, setReason] = useState("");
    const [message, setMessage] = useState("");
    const [showForm, setShowForm] = useState(false);

    const currentUser = JSON.parse(
        localStorage.getItem(
            "currentUser"
        )
    );

    async function handleReport(
        event
    ) {
        event.preventDefault();
        setMessage("");

        if (!currentUser) {
            setMessage(
                "Please log in to report a post."
            );
            return;
        }

        if (!reason) {
            setMessage(
                "Please select a reason."
            );
            return;
        }

        try {
            const response =
                await fetch(
                    `/api/posts/${postId}/report`,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify({
                                userId:
                                    currentUser._id,

                                reason
                            })
                    }
                );
            const data =
                await response.json();
            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Unable to report post."
                );
            }
            setMessage(
                "Post reported successfully."
            );
            setReason("");
            setShowForm(false);
        } catch (error) {
            setMessage(
                error.message
            );
        }
    }

    if (!currentUser) {
        return null;
    }

    return (
        <section className="report-post">
            {!showForm ? (
                <button
                    type="button"

                    onClick={() =>
                        setShowForm(true)
                    }
                >
                    Report Post
                </button>
            ) : (
                <form
                    onSubmit={
                        handleReport
                    }
                >

                    <label
                        htmlFor="report-reason"
                    >
                        Why are you
                        reporting this post?
                    </label>

                    <select
                        id="report-reason"
                        value={reason}

                        onChange={
                            (event) =>
                                setReason(
                                    event
                                        .target
                                        .value
                                )
                        }
                    >
                        <option value="">
                            Select a reason
                        </option>
                        <option value="Spam">
                            Spam
                        </option>
                        <option value="Inappropriate Content">
                            Inappropriate Content
                        </option>
                        <option value="Harassment">
                            Harassment
                        </option>
                        <option value="Copyright">
                            Copyright
                        </option>
                        <option value="Other">
                            Other
                        </option>
                    </select>

                    <button type="submit">
                        Submit Report
                    </button>

                    <button
                        type="button"

                        onClick={() =>
                            setShowForm(false)
                        }
                    >
                        Cancel
                    </button>
                </form>
            )}
            {message && (
                <p>{message}</p>
            )}
        </section>
    );
}

export default ReportPost;