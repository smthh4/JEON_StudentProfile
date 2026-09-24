const PROFILE_IMAGE_KEY = "profileImage";

const defaultProfile = {
    fullName: "Min Soo O. Jeon",
    course: "BS Information Technology",
    yearLevel: "3rd Year",
    about: "My name is Min Soo O. Jeon and you can call me Min Soo. I am 21 years old and I go to university in Xavier University Ateneo de Cagayan.",
    skills: "HTML, CSS, Java"
};

function loadProfile() {

    const savedProfile = localStorage.getItem("studentProfile");

    if (savedProfile) {

        try {
            return JSON.parse(savedProfile);

        } catch (error) {

            console.error("Error loading saved profile:", error);

            return defaultProfile;
        }
    }

    return defaultProfile;
}

function displayProfile() {

    const profile = loadProfile();

    document.getElementById("displayName").textContent =
        profile.fullName;

    document.getElementById("displayCourse").textContent =
        profile.course;

    document.getElementById("displayYear").textContent =
        profile.yearLevel;

    document.getElementById("displayAbout").textContent =
        profile.about;

    document.getElementById("displaySkills").textContent =
        profile.skills;
}

function openEditProfile() {

    const profile = loadProfile();

    document.getElementById("fullName").value =
        profile.fullName;

    document.getElementById("course").value =
        profile.course;

    document.getElementById("yearLevel").value =
        profile.yearLevel;

    document.getElementById("about").value =
        profile.about;

    document.getElementById("skills").value =
        profile.skills;

    document.getElementById("profileView")
        .classList.add("hidden");

    document.getElementById("editProfileSection")
        .classList.remove("hidden");

    document.getElementById("formMessage")
        .textContent = "";

    window.scrollTo(0, 0);
}


function cancelEdit() {

    document.getElementById("editProfileSection")
        .classList.add("hidden");

    document.getElementById("profileView")
        .classList.remove("hidden");

    document.getElementById("formMessage")
        .textContent = "";

    window.scrollTo(0, 0);
}


function validateProfile(
    fullName,
    course,
    yearLevel,
    about
) {

    if (fullName.trim() === "") {

        alert("Please enter your full name.");

        return false;
    }

    if (course.trim() === "") {

        alert("Please enter your course.");

        return false;
    }

    if (yearLevel.trim() === "") {

        alert("Please enter your year level.");

        return false;
    }

    if (about.trim() === "") {

        alert("Please enter your About Me information.");

        return false;
    }

    return true;
}


function saveProfile(event) {

    event.preventDefault();

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

        fullName: fullName.trim(),

        course: course.trim(),

        yearLevel: yearLevel.trim(),

        about: about.trim(),

        skills: skills.trim()
    };

    localStorage.setItem(
        "studentProfile",
        JSON.stringify(updatedProfile)
    );

    displayProfile();

    document.getElementById("editProfileSection")
        .classList.add("hidden");

    document.getElementById("profileView")
        .classList.remove("hidden");


    alert("Profile successfully updated!");

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

    profileImage.src = savedImage;

    console.log(
        "Saved profile image loaded."
    );
}

function changeProfilePicture() {

    console.log("CHANGE PROFILE BUTTON CLICKED");

    if (!navigator.camera) {
        alert("Camera plugin is not available.");
        return;
    }

    const options = {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        targetWidth: 400,
        targetHeight: 400,
        correctOrientation: true,
        allowEdit: false
    };

    navigator.camera.getPicture(

        function (imageData) {

            console.log("CAMERA SUCCESS!");
            console.log("Image data received.");
            console.log("Image data length:", imageData.length);

            if (!imageData) {
                alert("Camera returned no image data.");
                return;
            }

            const profileImage =
                document.getElementById("profileImage");

            if (!profileImage) {
                alert("Profile image element not found.");
                return;
            }

            let imageSource;

            if (imageData.startsWith("data:image")) {

                imageSource = imageData;

            } else {

                imageSource =
                    "data:image/jpeg;base64," + imageData;
            }

            profileImage.onload = function () {

                console.log("NEW PROFILE IMAGE LOADED!");

            };


            profileImage.onerror = function () {

                console.error(
                    "PROFILE IMAGE FAILED TO LOAD"
                );

                alert(
                    "Photo was taken, but the image could not be displayed."
                );

            };

            profileImage.src = imageSource;

            try {

                localStorage.setItem(
                    PROFILE_IMAGE_KEY,
                    imageSource
                );

                console.log(
                    "PROFILE IMAGE SAVED!"
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

            alert(
                "Camera error: " + error
            );

        },

        options
    );
}

document.addEventListener(
    "DOMContentLoaded",
    function () {

        displayProfile();

        loadProfileImage();

    }
);

document.addEventListener(
    "deviceready",
    function () {

        console.log("Cordova is ready.");

        displayProfile();
        loadProfileImage();

        const editButton =
            document.getElementById("editProfileButton");

        if (editButton) {
            editButton.addEventListener(
                "click",
                openEditProfile
            );
        }

        const cancelButton =
            document.getElementById("cancelButton");

        if (cancelButton) {
            cancelButton.addEventListener(
                "click",
                cancelEdit
            );
        }

        const profileForm =
            document.getElementById("profileForm");

        if (profileForm) {
            profileForm.addEventListener(
                "submit",
                saveProfile
            );
        }

        const changeProfilePictureButton =
            document.getElementById(
                "changeProfilePictureButton"
            );

        if (changeProfilePictureButton) {

            changeProfilePictureButton.addEventListener(
                "click",
                changeProfilePicture
            );
        }

    },
    false
);