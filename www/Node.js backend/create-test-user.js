const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");
require("dotenv").config();


async function createTestUser() {

    const password =
        process.env.TEST_PASSWORD;


    if (!password) {

        console.log(
            "Please set TEST_PASSWORD first."
        );

        process.exit(1);

    }


    const connection =
        await mysql.createConnection({

            host: process.env.DB_HOST,

            user: process.env.DB_USER,

            password: process.env.DB_PASSWORD,

            database: process.env.DB_NAME

        });


    try {

        const passwordHash =
            await bcrypt.hash(password, 10);


        const [result] = await connection.query(

            `INSERT INTO users
            (
                student_id,
                email,
                password_hash
            )
            VALUES (?, ?, ?)`,

            [
                "2026-00001",
                "student@example.com",
                passwordHash
            ]

        );


        const userId =
            result.insertId;


        await connection.query(

            `INSERT INTO profiles
            (
                user_id,
                full_name,
                course,
                year_level,
                about,
                skills
            )
            VALUES (?, ?, ?, ?, ?, ?)`,

            [
                userId,

                "Min Soo O. Jeon",

                "BS Information Technology",

                "3rd Year",

                "My name is Min Soo O. Jeon and you can call me Min Soo. I am 21 years old and I go to university in Xavier University Ateneo de Cagayan.",

                "HTML, CSS, Java"
            ]

        );


        console.log(
            "Test user created successfully!"
        );

        console.log(
            "Student ID: 2026-00001"
        );

        console.log(
            "Email: student@example.com"
        );


    } catch (error) {

        console.error(
            "ERROR:",
            error.message
        );

    } finally {

        await connection.end();

    }

}


createTestUser();