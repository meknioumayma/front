import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérification des champs vides
    if (!email || !password) {
      setError("Email et mot de passe sont obligatoires");
      return;
    }

    try {
      // Envoi de la requête de connexion
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      // Vérification si la réponse contient un message de succès
      if (response.data.message === "Connexion réussie") {
        // Récupérer le rôle de l'utilisateur (ici, on suppose qu'il est renvoyé par le backend)
        const userRole = response.data.role;

        // Stockage du token dans le localStorage (optionnel, selon votre gestion de session)
        localStorage.setItem("token", response.data.token);

        // Redirection en fonction du rôle
        if (userRole === "admin") {
          navigate("/dashboard");
        } else if (userRole === "rh") {
          navigate("/dashboardRh");
        } else if (userRole === "stagiaire") {
          navigate("/stagiaire/dashboard");
        } else if (userRole === "encadrant") {
          navigate("/encadrant/dashboard");
        } else {
          setError("Rôle inconnu");
        }
      } else {
        setError("Email ou mot de passe incorrect");
      }
    } catch (err) {
      console.error("Erreur lors de la connexion:", err);
      setError("Une erreur est survenue lors de la connexion");
    }
  };

  return (
    <div className="signin-form">
      <h2>Connexion</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default SignIn;
