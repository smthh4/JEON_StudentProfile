1. Project Description

Briefly describe your Student Profile application and how it has evolved into a database-driven application.

A multipage responsive student profile website that is built using HTML and JavaScript. It is a profile website that features a students profile, skills, projects, about and the contacts. Some features that make it have behavior is the ability to change the users profile descriptions and change of profile picture. In the most updated version there was the including of a login feature.

3. Application Pages

Explain the purpose of:

Profile - Shows the most basic information of the student.

About - Shows most information of the student and also the students education background.

Skills - Shows the certain skills of the student

Projects - Shows the past projects that the student built or help built

Contact - Shows the students email, social/s and Github profile

Also explain the purpose of the Login functionality. - The purpose of the Login was so that only authorized people can access the student profile


3. Authentication

Explain how users log in.

Describe:

Login → Authentication → Student Profile

Do not include actual passwords or credentials.

* A user enters their StudentID/Email then enters their password
* Node.js then authenticates it and checks if the credentials are correct
* After checking the credentials being correct, it logs in the user


4. Student Profile Management
Explain how an authenticated student can:

View their profile  - The authenticated student can browse through his/hers profile.
Edit their information - Give access to the edit profile information
Save changes - Gives access to save any profile information changes
Update their profile picture - Gives access to save any profile
Log out - unfortunately there  isn't a button, but click back on your phone will send you back into the login page

5. Database Integration

Identify the database technology used.

Briefly explain what student information is stored.

For example:

*Student ID
*Email
*Password hash
*Student name
*Course
*Year level
*About information
*Skills
*Profile picture/reference

6. API/Backend
Explain how the Cordova application communicates with the backend/API.

Include the basic architecture:

Cordova Application → API/Backend → Database

7. CRUD Operations
Explain:

Create — Creating a student/profile record
*in the .env, you can create a new studentID record to login into the website

Read — Retrieving and displaying profile information
*After retrieving the inputed student login information from the API it displays the profile website

Update — Editing and saving profile information
*when a you are to change information and click save, the application displays the updated information

Delete — Deleting an appropriate record
*Delete is to delete any user login information which is done through the backend


8. Camera Integration
Explain how the Activity 6 camera functionality is retained and integrated into the database-driven application.

The camera plugin was still intact from the previous activity but added to that after taking a picture, the data of the image taken gets saved into the database

10. Data Persistence
Explain how profile information remains available after:

Closing the application 
Restarting the application 
Logging out 
Logging in again 

All saved changed information is already saved locally, so whether closing, restarting, logging out and logging back in everything will still be intact

10. Responsive Design
Explain how the application remains responsive across:

Desktop
Tablet
Mobile

The login page is fitted for the necessary devices that are eligible to be accessed.

11. Security
Briefly explain the security measures applied.

For example:

Passwords are hashed using bcrypt/bcryptjs before being stored in MySQL.
Password aren't stored as plain text
Database credentials like the StudentID and password are stored in the .env file
Authentication is handled by the backend


12. How to Run
Provide the steps necessary to run the complete application.

Where applicable, include:

Starting the backend/API.
Configuring the database.
Installing dependencies.
Configuring the Cordova application.
Building the application.
Running the application.
Do not place actual passwords, API keys, or other secrets in these instructions.

* Create a database for the data
* make sure that required variables are configured in the .env file
* installing of the backend by doing npm install where the backend folder is located
* run the backend itself for my projects example node server.js and so that the backend will start on the designated host it is assigned to wether localhost:3000 or if cordova or mobile 10.0.2.2:3000
* Now actually running cordova with typing cordova prepare android > cordova build android > cordova run android

13. Test Accounts
If your application requires test accounts, provide test accounts specifically created for demonstration purposes.

StudentID: 2026-00001

14. Application Screenshots
Include screenshots demonstrating:

Login page - <img width="1043" height="717" alt="image" src="https://github.com/user-attachments/assets/4eb561ba-8b14-49c1-be01-efd335167b65" />

Successful login - <img width="1048" height="411" alt="image" src="https://github.com/user-attachments/assets/b7cc9e2a-569c-4e69-9156-3d9acc0bdc98" />

Student Profile - <img width="1044" height="962" alt="image" src="https://github.com/user-attachments/assets/4149c1ff-ed5c-446d-a8a3-20ddd887145d" />

Edit Profile - <img width="1042" height="950" alt="image" src="https://github.com/user-attachments/assets/838683ff-edf1-4354-9eb3-cc4c00eb2bb1" />

Updated Profile - 
Profile Picture/Camera - 
Logout - 
Database-related functionality, where appropriate - <img width="1026" height="458" alt="image" src="https://github.com/user-attachments/assets/874b233f-d00f-4e5e-b730-62f2298b5e01" />
