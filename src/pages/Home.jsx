import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUsers, deleteUser, clearError } from "../redux/slices/userSlice";

function Home() {
    const dispatch = useDispatch();
    const { users, loading, error } = useSelector((state) => state.users);
    const [search, setSearch] = useState("");

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleDeleteUser = (id) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;
        dispatch(deleteUser(id));
    };

    const handleDismissError = () => {
        dispatch(clearError());
    };

    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="page page-home">
            {error && (
                <div className="error-banner">
                    <p>{error}</p>
                    <button onClick={handleDismissError} className="btn-close">✕</button>
                </div>
            )}

            <div className="page-header">
                <div>
                    <h2>All Users</h2>
                    <p className="page-subtitle">
                        Search, view, edit, or remove users in a single streamlined list.
                    </p>
                </div>
                <Link className="btn btn-primary" to="/add">
                    + Add User
                </Link>
            </div>

            {loading && users.length === 0 && (
                <div className="loading-state">
                    <div className="spinner"></div>
                    <p>Loading users...</p>
                </div>
            )}

            <div className="list-toolbar">
                <div className="search-box">
                    <input
                        type="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search users by name"
                        disabled={loading && users.length > 0}
                    />
                </div>
                <div className="user-count">
                    {filteredUsers.length} user{filteredUsers.length === 1 ? "" : "s"}
                </div>
            </div>

            {users.length === 0 && !loading ? (
                <div className="empty-state">
                    <h3>No users found</h3>
                    <p>Try a different search term or add a new user.</p>
                    <Link className="btn btn-secondary" to="/add">
                        Add your first user
                    </Link>
                </div>
            ) : filteredUsers.length === 0 ? (
                <div className="empty-state">
                    <h3>No users found</h3>
                    <p>Try a different search term or add a new user.</p>
                    <Link className="btn btn-secondary" to="/add">
                        Add your first user
                    </Link>
                </div>
            ) : (
                <div className="users-grid">
                    {filteredUsers.map((user) => (
                        <article className="user-card" key={user.id}>
                            <div className="user-card-header">
                                <div>
                                    <h3>{user.name}</h3>
                                    <p className="user-email">{user.email}</p>
                                </div>
                                <span className="user-badge">ID {user.id}</span>
                            </div>

                            <div className="user-actions">
                                <Link className="btn btn-secondary" to={`/view/${user.id}`}>
                                    View
                                </Link>
                                <Link className="btn btn-outline" to={`/edit/${user.id}`}>
                                    Edit
                                </Link>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleDeleteUser(user.id)}
                                    disabled={loading}
                                >
                                    {loading ? "Deleting..." : "Delete"}
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Home;