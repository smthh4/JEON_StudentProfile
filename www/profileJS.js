const defaultProfile = {
    fullName: "Min Soo O. Jeon",

    course: "BS Information Technology",

    yearLevel: "3rd Year",

    about: "My name is Min Soo O. Jeon and you can call me Min Soo. I am 21 years old and I go to university in Xavier University Ateneo de Cagayan.",

    skills: "HTML, CSS, Java" };

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

    if (
        !validateProfile(
            fullName,
            course,
            yearLevel,
            about
        )
    ) {

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

document.addEventListener(
    "DOMContentLoaded",
    function () {

        displayProfile();

        const editButton =
            document.getElementById(
                "editProfileButton"
            );

        if (editButton) {

            editButton.addEventListener(
                "click",
                openEditProfile
            );

        }

        const cancelButton =
            document.getElementById(
                "cancelButton"
            );

        if (cancelButton) {

            cancelButton.addEventListener(
                "click",
                cancelEdit
            );

        }

        const profileForm =
            document.getElementById(
                "profileForm"
            );

        if (profileForm) {

            profileForm.addEventListener(
                "submit",
                saveProfile
            );

        }

    }
);