import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { fetchUserById, clearError } from "../redux/slices/userSlice";

function ViewUser() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { currentUser, loading, error } = useSelector((state) => state.users);

    useEffect(() => {
        dispatch(fetchUserById(id));
    }, [id, dispatch]);

    const handleDismissError = () => {
        dispatch(clearError());
    };

    return (
        <div className="page page-view">
            {error && (
                <div className="error-banner">
                    <p>{error}</p>
                    <button onClick={handleDismissError} className="btn-close">✕</button>
                </div>
            )}

            {loading || !currentUser ? (
                <div className="loading-state">
                    <div className="spinner"></div>
                    <p>Loading user details...</p>
                </div>
            ) : (
                <div className="form-card">
                    <div className="form-header">
                        <div>
                            <h2>User Details</h2>
                            <p className="form-description">
                                Review the user information and return to the list when you're ready.
                            </p>
                        </div>
                        <span className="user-badge">ID {id}</span>
                    </div>

                    <div className="details-grid">
                        <div className="detail-row">
                            <span>Name</span>
                            <strong>{currentUser.name}</strong>
                        </div>
                        <div className="detail-row">
                            <span>Email</span>
                            <strong>{currentUser.email}</strong>
                        </div>
                    </div>

                    <Link className="btn btn-secondary" to="/">
                        Back to list
                    </Link>
                </div>
            )}
        </div>
    );
}

export default ViewUser;