import { useState, useEffect } from "react";
import axios from "axios";

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ email: "", role: "stagiaire" });
    const [editingUser, setEditingUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState({ show: false, message: "", type: "" });
    const [validationErrors, setValidationErrors] = useState({ email: "" });

    useEffect(() => {
        fetchUsers();
    }, []);

    const showNotification = (message, type = "success") => {
        setNotification({ show: true, message, type });
        setTimeout(() => setNotification({ show: false, message: "", type: "" }), 5000);
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await axios.get("http://localhost:5000/api/users");
            setUsers(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des utilisateurs", error);
            showNotification("Erreur lors du chargement des utilisateurs", "error");
        } finally {
            setLoading(false);
        }
    };

    const handleAddUser = async () => {
        if (!newUser.email) {
            setValidationErrors({ email: "L'email est obligatoire" });
            return;
        }
        
        if (!validateEmail(newUser.email)) {
            setValidationErrors({ email: "Veuillez entrer un email valide" });
            return;
        }
        
        if (!newUser.role) {
            showNotification("Veuillez sélectionner un rôle", "error");
            return;
        }

        try {
            setLoading(true);
            await axios.post("http://localhost:5000/api/admin/create-user", newUser);
            setNewUser({ email: "", role: "stagiaire" });
            setValidationErrors({ email: "" });
            showNotification("Utilisateur ajouté avec succès");
            fetchUsers();
        } catch (error) {
            console.error("Erreur lors de l'ajout de l'utilisateur", error);
            showNotification(error.response?.data?.message || "Une erreur est survenue", "error");
        } finally {
            setLoading(false);
        }
    };

    const handleEditUser = (user) => {
        setEditingUser(user);
        setNewUser({ email: user.email, role: user.role });
    };

    const handleUpdateUser = async () => {
        if (!newUser.email) {
            setValidationErrors({ email: "L'email est obligatoire" });
            return;
        }
        
        if (!validateEmail(newUser.email)) {
            setValidationErrors({ email: "Veuillez entrer un email valide" });
            return;
        }

        try {
            setLoading(true);
            await axios.put(`http://localhost:5000/api/users/${editingUser.id}`, newUser);
            showNotification("Utilisateur modifié avec succès");
            setEditingUser(null);
            setNewUser({ email: "", role: "stagiaire" });
            setValidationErrors({ email: "" });
            fetchUsers();
        } catch (error) {
            console.error("Erreur lors de la modification de l'utilisateur", error);
            showNotification(error.response?.data?.message || "Une erreur est survenue", "error");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        console.log("ID de l'utilisateur à supprimer:", id);  // Vérifiez ici l'ID envoyé
    
        if (!window.confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) return;
        
        try {
            setLoading(true);
            const response = await axios.delete(`http://localhost:5000/api/users/${id}`);
            console.log("Réponse après suppression:", response.data);  // Vérifiez la réponse ici
            showNotification("Utilisateur supprimé avec succès");
            fetchUsers();
        } catch (error) {
            console.error("Erreur lors de la suppression de l'utilisateur:", error);
            showNotification("Erreur lors de la suppression", "error");
        } finally {
            setLoading(false);
        }
    };
    
    
    

    const cancelEdit = () => {
        setEditingUser(null);
        setNewUser({ email: "", role: "stagiaire" });
        setValidationErrors({ email: "" });
    };

    // Icônes SVG
    const EditIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
        </svg>
    );

    const DeleteIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
    );

    const SaveIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
    );

    const CancelIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
    );

    const AddIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
    );

    return (
        <div className="text-gray-900 bg-gray-200 min-h-screen p-4">
            {/* Notification Toast */}
            {notification.show && (
                <div className={`fixed top-4 right-4 z-50 p-4 rounded-md shadow-lg text-white ${
                    notification.type === "error" ? "bg-red-500" : "bg-green-500"
                }`}>
                    {notification.message}
                </div>
            )}
            
            <h1 className="text-3xl font-bold mb-4">Gestion des Utilisateurs</h1>
            
            <div className="bg-white shadow-md rounded p-4 mb-4">
                <h2 className="text-xl font-semibold mb-2">
                    {editingUser ? "Modifier un utilisateur" : "Ajouter un utilisateur"}
                </h2>
                <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:items-end">
                    <div className="w-full md:w-1/3">
                        <input
                            type="email"
                            placeholder="Email"
                            value={newUser.email}
                            onChange={(e) => {
                                setNewUser({ ...newUser, email: e.target.value });
                                setValidationErrors({ ...validationErrors, email: "" });
                            }}
                            className={`border rounded px-2 py-1 w-full ${validationErrors.email ? "border-red-500" : ""}`}
                        />
                        {validationErrors.email && (
                            <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>
                        )}
                    </div>
                    <div className="w-full md:w-1/3">
                        <select
                            value={newUser.role}
                            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                            className="border rounded px-2 py-1 w-full"
                        >
                            <option value="stagiaire">Stagiaire</option>
                            <option value="encadrant">Encadrant</option>
                            <option value="rh">RH</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <div className="flex space-x-2">
                        {editingUser ? (
                            <>
                                <button 
                                    onClick={handleUpdateUser} 
                                    disabled={loading}
                                    className={`flex items-center justify-center w-10 h-10 rounded text-white ${loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"}`}
                                    title="Sauvegarder"
                                >
                                    <SaveIcon />
                                </button>
                                <button 
                                    onClick={cancelEdit}
                                    disabled={loading}
                                    className="flex items-center justify-center w-10 h-10 rounded bg-gray-500 text-white hover:bg-gray-600"
                                    title="Annuler"
                                >
                                    <CancelIcon />
                                </button>
                            </>
                        ) : (
                            <button 
                                onClick={handleAddUser} 
                                disabled={loading}
                                className={`flex items-center justify-center w-10 h-10 rounded text-white ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
                                title="Ajouter"
                            >
                                <AddIcon />
                            </button>
                        )}
                    </div>
                </div>
            </div>
            
            <div className="bg-white shadow-md rounded p-4 overflow-x-auto">
                {loading && users.length === 0 ? (
                    <div className="flex justify-center items-center p-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                    </div>
                ) : (
                    <table className="w-full text-md text-left border-collapse">
                        <thead>
                            <tr className="border-b bg-gray-100">
                                <th className="p-3">Email</th>
                                <th className="p-3">Rôle</th>
                                <th className="p-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length === 0 ? (
                                <tr>
                                    <td colSpan="3" className="text-center p-3 text-gray-500">
                                        Aucun utilisateur trouvé.
                                    </td>
                                </tr>
                            ) : (
                                users.map((user) => (
                                    <tr key={user.id} className="border-b hover:bg-orange-100">
                                        <td className="p-3">{user.email}</td>
                                        <td className="p-3">
                                            <span className={`px-2 py-1 rounded-full text-xs ${
                                                user.role === "admin" ? "bg-purple-200 text-purple-800" :
                                                user.role === "rh" ? "bg-blue-200 text-blue-800" :
                                                user.role === "encadrant" ? "bg-green-200 text-green-800" :
                                                "bg-orange-200 text-orange-800"
                                            }`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="p-3 text-right">
                                            <div className="flex justify-end space-x-2">
                                                <button 
                                                    onClick={() => handleEditUser(user)}
                                                    disabled={loading}
                                                    className={`flex items-center justify-center w-10 h-10 rounded ${loading ? "bg-gray-400 text-gray-700" : "bg-green-600 hover:bg-green-700 text-white"}`}
                                                    title="Modifier"
                                                >
                                                    <EditIcon />
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(user.id)} 
                                                    disabled={loading}
                                                    className={`flex items-center justify-center w-10 h-10 rounded text-white ${loading ? "bg-gray-400" : "bg-red-600 hover:bg-red-700"}`}
                                                    title="Supprimer"
                                                >
                                                    <DeleteIcon />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default UserManagement;