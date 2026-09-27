const PROFILE_IMAGE_KEY = "profileImage";

const defaultProfile = {
    fullName: "Min Soo O. Jeon",
    course: "BS Information Technology",
    yearLevel: "3rd Year",
    about: "My name is Min Soo O. Jeon and you can call me Min Soo. I am 21 years old and I go to university in Xavier University Ateneo de Cagayan.",
    skills: "HTML, CSS, Java"
};


// =========================
// LOGIN / AUTHENTICATION
// =========================

function getAuthToken() {
    return localStorage.getItem("authToken");
}

function isLoggedIn() {
    return !!getAuthToken();
}

function requireLogin() {

    if (!isLoggedIn()) {
        window.location.href = "login.html";
        return false;
    }

    return true;
}

function logout() {

    localStorage.removeItem("authToken");

    window.location.href = "login.html";
}

function loadProfile() {

    const savedProfile =
        localStorage.getItem("studentProfile");

    if (savedProfile) {

        try {

            return JSON.parse(savedProfile);

        } catch (error) {

            console.error(
                "Error loading saved profile:",
                error
            );

            return defaultProfile;
        }
    }

    return defaultProfile;
}


function displayProfile() {

    const profile = loadProfile();

    const displayName =
        document.getElementById("displayName");

    const displayCourse =
        document.getElementById("displayCourse");

    const displayYear =
        document.getElementById("displayYear");

    const displayAbout =
        document.getElementById("displayAbout");

    const displaySkills =
        document.getElementById("displaySkills");


    if (displayName) {
        displayName.textContent =
            profile.fullName;
    }

    if (displayCourse) {
        displayCourse.textContent =
            profile.course;
    }

    if (displayYear) {
        displayYear.textContent =
            profile.yearLevel;
    }

    if (displayAbout) {
        displayAbout.textContent =
            profile.about;
    }

    if (displaySkills) {
        displaySkills.textContent =
            profile.skills;
    }
}

function openEditProfile() {

    console.log("EDIT PROFILE BUTTON CLICKED");

    const profile = loadProfile();


    const fullName =
        document.getElementById("fullName");

    const course =
        document.getElementById("course");

    const yearLevel =
        document.getElementById("yearLevel");

    const about =
        document.getElementById("about");

    const skills =
        document.getElementById("skills");


    if (fullName) {
        fullName.value =
            profile.fullName;
    }

    if (course) {
        course.value =
            profile.course;
    }

    if (yearLevel) {
        yearLevel.value =
            profile.yearLevel;
    }

    if (about) {
        about.value =
            profile.about;
    }

    if (skills) {
        skills.value =
            profile.skills;
    }


    const profileView =
        document.getElementById("profileView");

    const editProfileSection =
        document.getElementById("editProfileSection");


    if (profileView) {
        profileView.classList.add("hidden");
    }

    if (editProfileSection) {
        editProfileSection.classList.remove("hidden");
    }


    const formMessage =
        document.getElementById("formMessage");

    if (formMessage) {
        formMessage.textContent = "";
    }


    window.scrollTo(0, 0);
}


function cancelEdit() {

    console.log("CANCEL BUTTON CLICKED");


    const editProfileSection =
        document.getElementById("editProfileSection");

    const profileView =
        document.getElementById("profileView");


    if (editProfileSection) {
        editProfileSection.classList.add("hidden");
    }

    if (profileView) {
        profileView.classList.remove("hidden");
    }


    const formMessage =
        document.getElementById("formMessage");

    if (formMessage) {
        formMessage.textContent = "";
    }


    window.scrollTo(0, 0);
}


function validateProfile(
    fullName,
    course,
    yearLevel,
    about
) {

    if (fullName.trim() === "") {

        alert(
            "Please enter your full name."
        );

        return false;
    }


    if (course.trim() === "") {

        alert(
            "Please enter your course."
        );

        return false;
    }


    if (yearLevel.trim() === "") {

        alert(
            "Please enter your year level."
        );

        return false;
    }


    if (about.trim() === "") {

        alert(
            "Please enter your About Me information."
        );

        return false;
    }


    return true;
}


function saveProfile(event) {

    event.preventDefault();

    console.log("PROFILE FORM SUBMITTED");


    const fullName =
        document.getElementById("fullName").value;

    const course =
        document.getElementById("course").value;

    const yearLevel =
        document.getElementById("yearLevel").value;

    const about =
        document.getElementById("about").value;

    const skills =
        document.getElementById("skills").value;


    if (!validateProfile(
        fullName,
        course,
        yearLevel,
        about
    )) {

        return;
    }


    const updatedProfile = {

        fullName:
            fullName.trim(),

        course:
            course.trim(),

        yearLevel:
            yearLevel.trim(),

        about:
            about.trim(),

        skills:
            skills.trim()
    };


    localStorage.setItem(
        "studentProfile",
        JSON.stringify(updatedProfile)
    );


    displayProfile();


    document.getElementById(
        "editProfileSection"
    ).classList.add("hidden");


    document.getElementById(
        "profileView"
    ).classList.remove("hidden");


    alert(
        "Profile successfully updated!"
    );


    window.scrollTo(0, 0);
}


function loadProfileImage() {

    const savedImage =
        localStorage.getItem(PROFILE_IMAGE_KEY);


    if (!savedImage) {
        return;
    }


    const profileImage =
        document.getElementById("profileImage");


    if (!profileImage) {
        return;
    }


    profileImage.src =
        savedImage;


    console.log(
        "Saved profile image loaded."
    );
}

function changeProfilePicture() {

    console.log(
        "CHANGE PROFILE BUTTON CLICKED"
    );


    if (!navigator.camera) {

        alert(
            "Camera plugin is not available. Please run the app on the Cordova Android device/emulator."
        );

        return;
    }


    const options = {

        quality: 50,

        destinationType:
            Camera.DestinationType.DATA_URL,

        sourceType:
            Camera.PictureSourceType.CAMERA,

        encodingType:
            Camera.EncodingType.JPEG,

        mediaType:
            Camera.MediaType.PICTURE,

        targetWidth: 400,

        targetHeight: 400,

        correctOrientation: true,

        allowEdit: false
    };


    navigator.camera.getPicture(

        function (imageData) {

            console.log(
                "CAMERA SUCCESS!"
            );


            if (!imageData) {

                alert(
                    "Camera returned no image data."
                );

                return;
            }


            const profileImage =
                document.getElementById(
                    "profileImage"
                );


            if (!profileImage) {

                alert(
                    "Profile image element not found."
                );

                return;
            }


            let imageSource;


            if (
                imageData.startsWith(
                    "data:image"
                )
            ) {

                imageSource =
                    imageData;

            } else {

                imageSource =
                    "data:image/jpeg;base64," +
                    imageData;
            }


            profileImage.src =
                imageSource;


            try {

                localStorage.setItem(
                    PROFILE_IMAGE_KEY,
                    imageSource
                );


                console.log(
                    "PROFILE IMAGE SAVED!"
                );


                alert(
                    "Profile picture successfully changed!"
                );


            } catch (error) {

                console.error(
                    "LOCAL STORAGE ERROR:",
                    error
                );


                alert(
                    "Photo displayed, but could not be saved."
                );
            }

        },


        function (error) {

            console.error(
                "CAMERA ERROR:",
                error
            );


            if (
                error === "Camera cancelled." ||
                error === "Selection cancelled."
            ) {

                return;
            }


            alert(
                "Camera error: " + error
            );
        },


        options
    );
}

function setupProfileEvents() {

    console.log(
        "SETTING UP PROFILE EVENTS..."
    );


    const editButton =
        document.getElementById(
            "editProfileButton"
        );


    if (editButton) {

        editButton.onclick =
            openEditProfile;

        console.log(
            "Edit Profile button connected."
        );
    }


    const cancelButton =
        document.getElementById(
            "cancelButton"
        );


    if (cancelButton) {

        cancelButton.onclick =
            cancelEdit;

        console.log(
            "Cancel button connected."
        );
    }


    const profileForm =
        document.getElementById(
            "profileForm"
        );


    if (profileForm) {

        profileForm.onsubmit =
            saveProfile;

        console.log(
            "Profile form connected."
        );
    }


    const changeProfilePictureButton =
        document.getElementById(
            "changeProfilePictureButton"
        );


    if (changeProfilePictureButton) {

        changeProfilePictureButton.onclick =
            changeProfilePicture;

        console.log(
            "Change Profile button connected."
        );
    }
}

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "DOM CONTENT LOADED"
        );


        if (!requireLogin()) {
            return;
        }


        displayProfile();

        loadProfileImage();

        setupProfileEvents();
    }
);


document.addEventListener(
    "deviceready",
    function () {

        console.log(
            "CORDOVA IS READY"
        );


        if (!requireLogin()) {
            return;
        }


        displayProfile();

        loadProfileImage();

        setupProfileEvents();
    },
    false
);