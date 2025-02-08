const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key";

// Ruta para autenticación con Google
router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

// Callback después de autenticación con Google
router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/auth/failure" }),
    (req, res) => {
        try {
            const token = jwt.sign({ user: req.user }, JWT_SECRET, {
                expiresIn: "1h",
            });

            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "Strict",
            });

            res.redirect("/api-docs"); // Redirigir al usuario después de iniciar sesión
        } catch (error) {
            console.error("Error generating token:", error);
            res.redirect("/auth/failure");
        }
    }
);

// Ruta para manejar fallo de autenticación
router.get("/failure", (req, res) => {
    res.status(401).json({ message: "Authentication failed" });
});

// Ruta para cerrar sesión
router.get("/logout", (req, res) => {
    req.logout(() => {
        res.clearCookie("token");
        req.session?.destroy?.(() => {
            res.redirect("/api-docs");
        });
    });
});

module.exports = router;
