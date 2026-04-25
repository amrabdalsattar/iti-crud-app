import { useEffect, useState } from "react";
import api from "../api/axios";
import { useParams, Link } from "react-router-dom";

function ViewUser() {
    const [user, setUser] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        api.get(`/users/${id}`).then((res) => setUser(res.data)).catch((err) => console.error(err));
    }, [id]);

    if (!user) return <p className="loading">Loading user details...</p>;

    return (
        <div className="page page-view">
            <div className="form-card">
                <div className="form-header">
                    <div>
                        <h2>User Details</h2>
                        <p className="form-description">
                            Review the user information and return to the list when you’re ready.
                        </p>
                    </div>
                    <span className="user-badge">ID {id}</span>
                </div>

                <div className="details-grid">
                    <div className="detail-row">
                        <span>Name</span>
                        <strong>{user.name}</strong>
                    </div>
                    <div className="detail-row">
                        <span>Email</span>
                        <strong>{user.email}</strong>
                    </div>
                </div>

                <Link className="btn btn-secondary" to="/">
                    Back to list
                </Link>
            </div>
        </div>
    );
}

export default ViewUser;