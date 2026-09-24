

1. Project Description

A multipage responsive student profile website that is built using HTML and JavaScript. It is a profile website that features a students profile, skills, projects, about and the contacts. Some features that make it have behavior is the ability to change the users profile descriptions and change of profile picture.



2. Application Pages

Explain the purpose of:

Profile - Shows the most basic information of the student.

About - Shows most information of the student and also the students education background.

Skills - Shows the certain skills of the student

Projects - Shows the past projects that the student built or help built

Contact - Shows the students email, social/s and Github profile

3. Profile Editing

Profile editing starts with clicking the Edit Profile button. The following information that can be changed are the following:

* Name
* About
* Course
* Year level
* Skills

4. Camera Integration

Explain how the application uses a Cordova camera plugin.

Describe the process:

Change Profile Picture → Open Camera → Capture Image → Update Profile Picture

When you click on the Change Profile button it will lead to opening of the camera, upon taking a picture it will say whether the picture was uploaded or if there was any error. After confirming the picture was uploaded it updates the profile

5. Device Feature Integration
Explain why Cordova is used to access the camera.

Its because cordova provides the ability to use the camera. 

6. Image Handling
Explain how the captured image is displayed and persisted.

After picturing the image, the application receives the picture from the cordova plugin the it displays it in the profile picture section of the website


8. Error Handling
Explain how your application handles:

Camera permission denial - There will be a popup notification that there isn't an access to the camera
Camera cancellation - If a user were to cancel or go back to the previous page before taking of a picture it will redirect them back to the profile page
Camera errors - There will be a popup notification after taking a picture if the picture was not captured

8. Responsive Design
Explain how the application remains responsive across:

Desktop
Tablet
Mobile

The application stays consistent in the changing of profile as the button stays a good size throughout the different screen sizes of different devices


9. How to Run
Provide the necessary steps to:

Install dependencies
Configure the Cordova project
Install/configure the camera plugin
Build the application
Run the application

1 step: Open a terminal in my case CMD (need node.js to be installed to also install cordova)

2. Navigate to where the saved project is so cd into the file

3. In CMD, to install the camera plugin type "cordova plugin add cordova-plugin-camera"

4. After navigating add the android platform by doing "cordova platform add android"

5. after adding prepare by doing "cordova prepare android"

6. Next is to build by doing "cordova build android"

7. Lastly, run the application by doing "cordova run android"

8. Start up an app that can run cordova like android studios and you will be able to launch the website.


10. Application Screenshots
Include screenshots demonstrating:

Student Profile - <img width="1080" height="2400" alt="image" src="https://github.com/user-attachments/assets/07a273e0-6574-43d8-9a8d-bca2ad046701" />

Camera - <img width="1080" height="2400" alt="image" src="https://github.com/user-attachments/assets/1ac45859-7d6d-4416-84d1-a51d36cdf2e7" />

Change Profile Picture - 
Captured Image - 
Updated Profile Picture - <img width="1080" height="2400" alt="image" src="https://github.com/user-attachments/assets/7482f614-0a74-419b-9a61-00c623066586" />
