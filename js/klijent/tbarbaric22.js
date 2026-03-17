//tbarbaric22.js


//#region PrebaciNaMobilnuVerziju
function setDeviceVersion(version) {
    document.cookie = "deviceVersion=" + version + "; expires=Fri, 31 Dec 9999 23:59:59 GMT";
}

function getDeviceVersion() {
    var name = "deviceVersion=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookieArray = decodedCookie.split(';');
    for (var i = 0; i < cookieArray.length; i++) {
        var cookie = cookieArray[i];
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) == 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return "";
}

function checkDeviceVersion() {
    var deviceVersion = getDeviceVersion();
    if (deviceVersion === "mobile") {
        document.getElementById("linkSM1").href = "../css/smartphone2.css";
        document.getElementById("btn1").innerHTML = "Vrati na stolnu verziju";
    } else {
        document.getElementById("linkSM1").href = "../css/smartphone.css";
        document.getElementById("btn1").innerHTML = "Prebaci na mobilnu verziju";
    }
}

checkDeviceVersion();

document.getElementById("btn1").addEventListener("click", function() {
    var currentVersion = getDeviceVersion();
    if (currentVersion !== "mobile") {
        setDeviceVersion("mobile");
    } else {
        setDeviceVersion("desktop");
    }
    checkDeviceVersion();
});
//#endregion

//#region Obrazac(a)
//ovo neka ostane samo kao primjer za 2.obrazac

document.getElementById("obrazac1").addEventListener("submit", function(event) {
    if (!validateForm()) {
        event.preventDefault(); 
    }
});

function validateForm() {
    var inputs = document.querySelectorAll('input[required]');
    var errors = false; 

    for (var i = 0; i < inputs.length; i++) {
        if (!inputs[i].value) {
            errors = true; 
            displayError(inputs[i], "Molimo vas da popunite ovo polje.");
        } else {
            removeError(inputs[i]); 
        }
    }

    var selectedOption = document.querySelector('input[name="pilir"]:checked');
    if (!selectedOption) {
        errors = true; 
        displayError(document.getElementById("prijava"), "Molimo vas odaberite jednu od opcija.");
    } else {
        removeError(document.getElementById("prijava")); 
    }

    if (errors) {
        return false;
    }

    return true; 
}

function displayError(element, message) {
    var errorDiv = document.createElement("div");
    errorDiv.className = "error-message";
    errorDiv.textContent = message;

    element.parentNode.insertBefore(errorDiv, element.nextSibling);

    element.classList.add("error-field");
    element.style.backgroundColor = "red"; 
}

function removeError(element) {
    var errorMessage = element.nextElementSibling;
    if (errorMessage && errorMessage.classList.contains("error-message")) {
        errorMessage.parentNode.removeChild(errorMessage);
    }

    element.classList.remove("error-field");
}

//#endregion

//#region Obrazac(b)

//#endregion