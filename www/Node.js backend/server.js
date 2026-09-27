const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();


const app = express();

app.use(cors());

app.use(
    express.json({
        limit: "10mb"
    })
);


const pool = mysql.createPool({

    host: process.env.DB_HOST,

    user: process.env.DB_USER,

    password: process.env.DB_PASSWORD,

    database: process.env.DB_NAME,

    waitForConnections: true,

    connectionLimit: 10,

    queueLimit: 0

});


app.get("/api/test", async (req, res) => {

    try {

        const [rows] =
            await pool.query("SELECT 1 AS test");

        res.json({
            success: true,
            message: "API and database are working.",
            database: rows[0].test === 1
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Database connection failed."
        });

    }

});


function authenticateToken(req, res, next) {

    const authHeader =
        req.headers["authorization"];


    const token =
        authHeader &&
        authHeader.split(" ")[1];


    if (!token) {

        return res.status(401).json({
            message: "Authentication required."
        });

    }


    jwt.verify(
        token,
        process.env.JWT_SECRET,
        (error, user) => {

            if (error) {

                return res.status(403).json({
                    message: "Invalid or expired token."
                });

            }


            req.user = user;

            next();

        }
    );

}

app.post("/api/auth/login", async (req, res) => {

    try {

        const {
            identifier,
            password
        } = req.body;


        if (!identifier || !password) {

            return res.status(400).json({
                message:
                    "Student ID/email and password are required."
            });

        }


        const [users] = await pool.query(

            `SELECT *
             FROM users
             WHERE student_id = ?
             OR email = ?
             LIMIT 1`,

            [identifier, identifier]

        );


        if (users.length === 0) {

            return res.status(401).json({
                message:
                    "Invalid Student ID/email or password."
            });

        }


        const user = users[0];


        const passwordMatch =
            await bcrypt.compare(
                password,
                user.password_hash
            );


        if (!passwordMatch) {

            return res.status(401).json({
                message:
                    "Invalid Student ID/email or password."
            });

        }


        const token = jwt.sign(

            {
                userId: user.id,

                studentId: user.student_id

            },

            process.env.JWT_SECRET,

            {
                expiresIn: "2h"
            }

        );


        res.json({

            success: true,

            message: "Login successful.",

            token: token

        });


    } catch (error) {

        console.error("LOGIN ERROR:", error);

        res.status(500).json({

            message:
                "Server error during login."

        });

    }

});

app.get(
    "/api/profile",
    authenticateToken,
    async (req, res) => {

        try {

            const [rows] = await pool.query(

                `SELECT
                    users.student_id,
                    users.email,
                    profiles.full_name,
                    profiles.course,
                    profiles.year_level,
                    profiles.about,
                    profiles.skills,
                    profiles.profile_picture
                 FROM users
                 INNER JOIN profiles
                 ON users.id = profiles.user_id
                 WHERE users.id = ?`,

                [req.user.userId]

            );


            if (rows.length === 0) {

                return res.status(404).json({

                    message:
                        "Profile not found."

                });

            }


            res.json({

                success: true,

                profile: rows[0]

            });


        } catch (error) {

            console.error(
                "GET PROFILE ERROR:",
                error
            );

            res.status(500).json({

                message:
                    "Unable to retrieve profile."

            });

        }

    }
);

app.post(
    "/api/profile",
    authenticateToken,
    async (req, res) => {

        try {

            const {
                fullName,
                course,
                yearLevel,
                about,
                skills,
                profilePicture
            } = req.body;


            if (
                !fullName ||
                !course ||
                !yearLevel ||
                !about
            ) {

                return res.status(400).json({

                    message:
                        "Required profile fields are missing."

                });

            }


            await pool.query(

                `INSERT INTO profiles
                (
                    user_id,
                    full_name,
                    course,
                    year_level,
                    about,
                    skills,
                    profile_picture
                )
                VALUES (?, ?, ?, ?, ?, ?, ?)`,

                [
                    req.user.userId,
                    fullName,
                    course,
                    yearLevel,
                    about,
                    skills || "",
                    profilePicture || null
                ]

            );


            res.status(201).json({

                success: true,

                message:
                    "Profile created successfully."

            });


        } catch (error) {

            console.error(
                "CREATE PROFILE ERROR:",
                error
            );

            res.status(500).json({

                message:
                    "Unable to create profile."

            });

        }

    }
);

app.put(
    "/api/profile",
    authenticateToken,
    async (req, res) => {

        try {

            const {
                fullName,
                course,
                yearLevel,
                about,
                skills,
                profilePicture
            } = req.body;


            if (
                !fullName ||
                !course ||
                !yearLevel ||
                !about
            ) {

                return res.status(400).json({

                    message:
                        "Please complete all required fields."

                });

            }


            await pool.query(

                `UPDATE profiles
                 SET
                    full_name = ?,
                    course = ?,
                    year_level = ?,
                    about = ?,
                    skills = ?,
                    profile_picture =
                        COALESCE(?, profile_picture)
                 WHERE user_id = ?`,

                [
                    fullName,
                    course,
                    yearLevel,
                    about,
                    skills || "",
                    profilePicture || null,
                    req.user.userId
                ]

            );


            res.json({

                success: true,

                message:
                    "Profile updated successfully."

            });


        } catch (error) {

            console.error(
                "UPDATE PROFILE ERROR:",
                error
            );

            res.status(500).json({

                message:
                    "Unable to update profile."

            });

        }

    }
);


app.delete(
    "/api/profile",
    authenticateToken,
    async (req, res) => {

        try {

            await pool.query(

                `DELETE FROM profiles
                 WHERE user_id = ?`,

                [req.user.userId]

            );


            res.json({

                success: true,

                message:
                    "Profile deleted successfully."

            });


        } catch (error) {

            console.error(
                "DELETE PROFILE ERROR:",
                error
            );

            res.status(500).json({

                message:
                    "Unable to delete profile."

            });

        }

    }
);


const PORT =
    process.env.PORT || 3000;


app.listen(
    PORT,
    () => {

        console.log(
            `Server running on http://localhost:${PORT}`
        );

    }
);