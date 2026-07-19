// ===============================
// Google Apps Script URL
// ===============================

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwkFUNYS1bKCU84lPGIoaimQKwkJMoYIrFSh-amiX5zygRalW886z58gNMA6D88fygQVw/exec";




// ===============================
// States List
// ===============================

const states = [

    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Puducherry"

];




// ===============================
// Course List
// ===============================

const courses = [

    "MBBS",
    "BDS",
    "BAMS",
    "BHMS",
    "BSc Nursing",
    "GNM Nursing",
    "Pharmacy",
    "Physiotherapy",

    "B.Tech",
    "M.Tech",
    "BCA",
    "MCA",
    "Artificial Intelligence",
    "Data Science",
    "Cyber Security",

    "BBA",
    "MBA",
    "B.Com",
    "M.Com",
    "Hotel Management",

    "BA",
    "MA",
    "BSc",
    "MSc",
    "Psychology",

    "Graphic Design",
    "UI/UX Design",
    "3D Animation",
    "Animation & VFX",
    "Fashion Designing",
    "Fashion Technology",
    "Interior Design",
    "Digital Marketing",

    "Aviation",
    "Law",
    "Agriculture",
    "Teaching Courses",
    "Travel & Tourism",
    "Other"

];




// ===============================
// Load Dropdown
// ===============================

function loadDropdown(id,data){


    const dropdown = document.getElementById(id);


    if(!dropdown) return;



    data.forEach(item=>{


        const option = document.createElement("option");


        option.value = item;


        option.textContent = item;


        dropdown.appendChild(option);


    });


}




// ===============================
// Initialize Dropdown
// ===============================

document.addEventListener("DOMContentLoaded",()=>{


    loadDropdown(
        "homeState",
        states
    );


    loadDropdown(
        "studyState",
        states
    );


    loadDropdown(
        "course",
        courses
    );


});






// ===============================
// Form Submit
// ===============================


const form = document.getElementById("studentForm");



if(form){


form.addEventListener("submit",(e)=>{


    e.preventDefault();




    const name =
    document.getElementById("name").value.trim();



    const phone =
    document.getElementById("phone").value.trim();



    const email =
    document.getElementById("email").value.trim();




    const gender =
    document.getElementById("gender").value;




    const consent =
    document.getElementById("consent").checked;






    // Name Validation

    if(name.length < 3){

        alert("Enter valid name");

        return;

    }







    // Phone Validation

    const phonePattern = /^[6-9][0-9]{9}$/;


    if(!phonePattern.test(phone)){


        alert(
        "Enter valid 10 digit mobile number"
        );


        return;


    }







    // Email Validation

    const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if(!emailPattern.test(email)){


        alert(
        "Enter valid email"
        );


        return;


    }

    //gender

    if(gender === ""){

    alert("Please select gender");

    return;


    }







    // Consent

    if(!consent){


        alert(
        "Please accept consent"
        );


        return;


    }








    // Form Data


    const formData = {


        name:name,


        phone:phone,


        email:email,


        gender:gender,


        homeState:
        document.getElementById("homeState").value,


        studyState:
        document.getElementById("studyState").value,


        course:
        document.getElementById("course").value,


        contactTime:
        document.getElementById("contactTime").value


    };









    // Send To Google Sheet


    fetch(SCRIPT_URL,{


        method:"POST",


        headers:{


            "Content-Type":"text/plain;charset=utf-8"


        },


        body:JSON.stringify(formData)


    })



    .then(response=>response.json())



    .then(data=>{



        if(data.status === "duplicate"){


            alert(
            "Already registered for this course."
            );


            return;


        }






        if(data.status === "error"){


            alert(
            "Server Error: " + data.message
            );


            return;


        }







        alert(

        "Registration Successful!\n\nLead ID: "
        + data.leadID

        );



        form.reset();



    })



    .catch(error=>{


        console.error(error);



        alert(
        "Something went wrong"
        );


    });



});


}
