"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b, _c, _d, _e, _f, _g;
//validate an email 
function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}
let url = "http://35.208.82.140:3001";
let count = "http://35.208.82.140:3001/filecount";
document.addEventListener("DOMContentLoaded", () => {
    fetchTextFileNames();
});
// Fetch button click event listener
(_a = document.getElementById("fetchButton")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    const fileSelect = document.getElementById("fileDropDown");
    const selectedFile = fileSelect.value;
    if (selectedFile !== "") {
        const fileName = `${fileSelect.value}`;
        emailsread(fileName).then((data) => {
            const emails = data;
            displayTableData(emails, fileName);
        });
    }
});
(_b = document.getElementById("fileDropDown")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
});
// File dropdown change event listener
(_c = document.getElementById("fileDropDown")) === null || _c === void 0 ? void 0 : _c.addEventListener("change", () => {
    const fileSelect = document.getElementById("fileDropDown");
    const selectedFile = fileSelect.value;
    if (selectedFile !== "") {
        const fileName = fileSelect.value;
    }
});
// Populate file dropdown with text file names
function populateFileDropdown(fileNames) {
    const fileSelect = document.getElementById("fileDropDown");
    fileNames.forEach((fileName) => {
        const option = document.createElement("option");
        option.value = fileName;
        option.textContent = fileName.replace("emails_", "").replace(".txt", "");
        fileSelect.appendChild(option);
    });
}
// Fetch available text file names with prefix "emails_"
function fetchTextFileNames() {
    const filePrefix = "emails_"; // Update with the desired prefix
    const filePath = "./"; // Replace with the actual file path
    const fileExtension = ".txt"; // Replace with the actual file extension
    filenames().then((data) => {
        const fileNames = data;
        populateFileDropdown(fileNames);
    });
}
const filecount = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`${url}/filecount`);
    const data = yield response.json();
    return data;
});
// fetch the emails from the API
const emailsread = (filename) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`${url}/emailsread/${filename}`);
    const data = yield response.json();
    console.log(data);
    return data;
});
const filenames = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`${url}/filenames`);
    const data = yield response.json();
    return data;
});
const emailsedit = (filename, emails) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(emails);
        console.log(filename);
        const response = yield fetch(`${url}/emailsedit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ filename: filename, filedata: emails })
        });
        if (response.ok) {
            const data = yield response.text();
            console.log('Success:', data);
            return data;
        }
        else {
            throw new Error('Failed to update emails');
        }
    }
    catch (error) {
        console.error('Error:', error);
        throw error;
    }
});
// Call fetchTextFileNames to populate the dropdown initially
// File input change event listener
// document.getElementById("fileInput")?.addEventListener("change", () => {
//   const fileInput = document.getElementById("fileInput") as HTMLInputElement;
//   const files = fileInput.files;
//   if (files && files.length > 0) {
//     processEmailFiles(files);
//   }
// });
// Process the selected email files
function processEmailFiles(files) {
    // Read each file using FileReader
    for (const file of files) {
        const reader = new FileReader();
        reader.onload = (event) => {
            var _a;
            const text = (_a = event.target) === null || _a === void 0 ? void 0 : _a.result;
            const emails = text.split(",").map((email) => email.trim());
            displayTableData(emails, file.name);
        };
        reader.readAsText(file);
    }
}
// Display table data
function displayTableData(emails, fileName) {
    const tableBody = document.getElementById('tableBody');
    if (tableBody) {
        tableBody.innerHTML = '';
        console.log(emails);
        emails.forEach((email, index) => {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
        <th class="px-4 py-2">${tableBody.childElementCount + 1}</th>
        <th class="px-4 py-2">${email}</th>
        <th class="px-4 py-2">${fileName}</th>
      `;
            newRow.addEventListener('click', () => {
                selectRow(newRow, index, email, emails, fileName);
            });
            tableBody.appendChild(newRow);
        });
    }
}
// Select row and enable editing
function selectRow(row, index, email, emails, filename) {
    const selectedRow = document.querySelector('.selected');
    if (selectedRow) {
        selectedRow.classList.remove('selected');
    }
    row.classList.add('selected');
    const inputValue = prompt('Edit email value:', email);
    if (inputValue !== null) {
        // Update the email value in the table
        row.children[1].textContent = inputValue;
        // Update the email value in the data array
        emails[index] = inputValue;
        // Update the text file
        updateTextFile(emails, filename);
    }
}
// Update the text file with new email values
function updateTextFile(emails, fileName) {
    const updatedText = emails.join(', ');
}
// Add to table button click event listener
// Delete last row button click event listener
(_d = document
    .getElementById("addToFile")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", () => {
});
// Search for an email by ID or value
// ...
// Search for an email by ID or value
function searchEmail() {
    var _a, _b, _c;
    const searchInput = document.getElementById("manualRowField");
    const searchTerm = searchInput.value.trim().toLowerCase();
    const tableRows = (_a = document.getElementById("tableBody")) === null || _a === void 0 ? void 0 : _a.getElementsByTagName("tr");
    if (tableRows) {
        let foundRow = null; // Variable to store the first highlighted row
        for (const row of tableRows) {
            const idCell = row.getElementsByTagName("th")[0];
            const valueCell = row.getElementsByTagName("th")[1];
            const idText = (_b = idCell.textContent) === null || _b === void 0 ? void 0 : _b.trim().toLowerCase();
            const valueText = (_c = valueCell.textContent) === null || _c === void 0 ? void 0 : _c.trim().toLowerCase();
            if (idText === searchTerm || (valueText === null || valueText === void 0 ? void 0 : valueText.includes(searchTerm))) {
                row.classList.add("bg-yellow-200");
                if (!foundRow) {
                    foundRow = row; // Store the first highlighted row
                }
            }
            else {
                row.classList.remove("bg-yellow-200");
            }
        }
        if (foundRow) {
            foundRow.scrollIntoView({ behavior: "smooth", block: "center" }); // Scroll to the first highlighted row
        }
    }
    else {
        alert("No table rows found!");
    }
}
// ...
// ...
// ...
// Regular expression for email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// ...
(_e = document.getElementById("addToTableButton")) === null || _e === void 0 ? void 0 : _e.addEventListener("click", () => {
    console.log("adding to table");
    let emails = [];
    const inputField = document.getElementById("manualRowField");
    const fileSelect = document.getElementById("fileDropDown");
    const selectedFile = fileSelect.value;
    const inputValue = inputField.value.trim().toLowerCase();
    console.log(inputValue);
    if (inputValue) {
        const tableBody = document.getElementById('tableBody');
        if (!tableBody) {
            alert("Table body not found!");
            return;
        }
        // Get existing emails from the table
        let existingEmails = [];
        tableBody.querySelectorAll('tr').forEach((row) => {
            var _a;
            const email = (_a = row.getElementsByTagName("th")[1].textContent) === null || _a === void 0 ? void 0 : _a.trim().toLowerCase();
            existingEmails.push(email);
        });
        // Split the input value into multiple emails
        const inputEmails = inputValue.split(",").map((email) => email.trim());
        // Add each email to the table if it's a valid email and not a duplicate
        inputEmails.forEach((email) => {
            if (!emailRegex.test(email)) {
                alert(`Please enter valid email(s) seperated by a ','`);
                return;
            }
            if (email && emailRegex.test(email) && !checkForDuplicates(existingEmails, email)) {
                const newRow = document.createElement('tr');
                newRow.innerHTML = `
          <th class="px-4 py-2">${tableBody.childElementCount + 1}</th>
          <th class="px-4 py-2">${email}</th>
          <th class="px-4 py-2">${selectedFile}</th>
        `;
                emails.push(email);
                newRow.addEventListener('click', () => {
                    selectRow(newRow, tableBody.childElementCount + 1, email, emails, selectedFile);
                });
                tableBody.appendChild(newRow);
                existingEmails.push(email); // Add the email to the existing emails array
            }
        });
        inputField.value = ""; // Clear the input field
    }
    else {
        alert("Please enter at least one email address");
    }
});
// ...
// ...
function checkForDuplicates(emails, email) {
    return emails.includes(email);
}
(_f = document.getElementById("addToFile")) === null || _f === void 0 ? void 0 : _f.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    var _h;
    console.log("adding to file");
    let emails = "";
    let filename = "";
    const tableBody = document.getElementById('tableBody');
    if (!tableBody || tableBody.childElementCount == 0) {
        alert("Table body not found!");
        return;
    }
    for (let i = 0; i < tableBody.childElementCount; i++) {
        const row = tableBody.children[i];
        const email = row.children[1].textContent;
        filename = (_h = row.children[2].textContent) !== null && _h !== void 0 ? _h : "";
        if (email) {
            emails += email + `, \n`;
        }
    }
    if (emails.length > 0) {
        // Call emailsedit to update the file with the new emails
        try {
            yield emailsedit(filename, emails);
            console.log("Emails updated successfully");
            // Optionally, you can display a success message to the user
            alert("Emails updated successfully");
        }
        catch (error) {
            console.error("Error updating emails:", error);
            // Optionally, you can display an error message to the user
            alert("Error updating emails. Please try again.");
        }
    }
    else {
        alert("No emails found to update");
    }
}));
// Button click event listener for search
(_g = document.getElementById("searchButton")) === null || _g === void 0 ? void 0 : _g.addEventListener("click", () => {
    searchEmail();
});
//# sourceMappingURL=script.js.map