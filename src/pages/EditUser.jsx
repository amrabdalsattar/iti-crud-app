import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchUserById, updateUser, clearError } from "../redux/slices/userSlice";

function EditUser() {
    const [user, setUser] = useState({ name: "", email: "" });
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { currentUser, loading, error } = useSelector((state) => state.users);

    useEffect(() => {
        dispatch(fetchUserById(id));
    }, [id, dispatch]);

    useEffect(() => {
        if (currentUser) {
            setUser(currentUser);
        }
    }, [currentUser]);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await dispatch(updateUser({ id, userData: user }));
        if (result.payload) {
            navigate("/");
        }
    };

    const handleDismissError = () => {
        dispatch(clearError());
    };

    return (
        <div className="page page-form">
            {error && (
                <div className="error-banner">
                    <p>{error}</p>
                    <button onClick={handleDismissError} className="btn-close">✕</button>
                </div>
            )}

            {loading && !currentUser ? (
                <div className="loading-state">
                    <div className="spinner"></div>
                    <p>Loading user details...</p>
                </div>
            ) : (
                <div className="form-card">
                    <div className="form-header">
                        <div>
                            <h2>Edit User</h2>
                            <p className="form-description">
                                Update the user's details and save the changes.
                            </p>
                        </div>
                        <span className="user-badge">ID {id}</span>
                    </div>

                    <form className="form" onSubmit={handleSubmit}>
                        <label>
                            Name
                            <input
                                name="name"
                                value={user.name}
                                onChange={handleChange}
                                placeholder="Enter full name"
                                required
                                disabled={loading}
                            />
                        </label>

                        <label>
                            Email
                            <input
                                type="email"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                                placeholder="Enter email address"
                                required
                                disabled={loading}
                            />
                        </label>
                        <div className="form-actions">
                            <button className="btn btn-primary" type="submit" disabled={loading}>
                                {loading ? "Updating..." : "Update User"}
                            </button>
                            <button
                                className="btn btn-secondary"
                                type="button"
                                onClick={() => navigate("/")}
                                disabled={loading}
                            >
                                Cancel
                            </button>

                        </div>
                    </form>
                </div>
            )
            }
        </div>
    );
}

export default EditUser;