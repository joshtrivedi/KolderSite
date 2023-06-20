"use strict";
var _a, _b, _c, _d, _e;
// Fetch button click event listener
(_a = document.getElementById("fetchButton")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    var _a;
    (_a = document.getElementById("fileInput")) === null || _a === void 0 ? void 0 : _a.click();
});
// File input change event listener
(_b = document.getElementById("fileInput")) === null || _b === void 0 ? void 0 : _b.addEventListener("change", () => {
    const fileInput = document.getElementById("fileInput");
    const files = fileInput.files;
    if (files && files.length > 0) {
        processEmailFiles(files);
    }
});
// Process the selected email files
function processEmailFiles(files) {
    // Read each file using FileReader
    for (const file of files) {
        const reader = new FileReader();
        reader.onload = (event) => {
            var _a;
            const text = (_a = event.target) === null || _a === void 0 ? void 0 : _a.result;
            const emails = text.split(",").map((email) => email.trim());
            displayTableData(emails, files, file.name);
        };
        reader.readAsText(file);
    }
}
// Display table data
function displayTableData(emails, files, fileName) {
    const tableBody = document.getElementById('tableBody');
    if (tableBody) {
        tableBody.innerHTML = '';
        emails.forEach((email, index) => {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
        <td class="px-4 py-2">${index + 1}</td>
        <td class="px-4 py-2">${email}</td>
        <td class="px-4 py-2">${fileName}</td>

      `;
            newRow.addEventListener('click', () => {
                selectRow(newRow, index, email, emails, fileName, files);
            });
            tableBody.appendChild(newRow);
        });
    }
}
// Select row and enable editing
function selectRow(row, index, email, emails, fileName, files) {
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
        updateTextFile(emails, fileName, files);
    }
}
// Update the text file with new email values
function updateTextFile(emails, fileName, files) {
    const updatedText = emails.join(', ');
}
// Add to table button click event listener
(_c = document.getElementById("addToTableButton")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => {
    var _a;
    const inputValue = (_a = document.getElementById("inputField")) === null || _a === void 0 ? void 0 : _a.value;
    if (inputValue) {
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td class="px-4 py-2">-</td>
            <td class="px-4 py-2">${inputValue}</td>
        `;
        const tableBody = document.getElementById("tableBody");
        if (tableBody) {
            tableBody.appendChild(newRow);
        }
    }
});
// Delete last row button click event listener
(_d = document
    .getElementById("addToFile")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", () => {
});
// Search for an email by ID or value
function searchEmail() {
    var _a, _b, _c;
    const searchInput = document.getElementById("manualRowField");
    const searchTerm = searchInput.value.trim().toLowerCase();
    const tableRows = (_a = document.getElementById("tableBody")) === null || _a === void 0 ? void 0 : _a.getElementsByTagName("tr");
    if (tableRows) {
        for (const row of tableRows) {
            const idCell = row.getElementsByTagName("td")[0];
            const valueCell = row.getElementsByTagName("td")[1];
            const idText = (_b = idCell.textContent) === null || _b === void 0 ? void 0 : _b.trim().toLowerCase();
            const valueText = (_c = valueCell.textContent) === null || _c === void 0 ? void 0 : _c.trim().toLowerCase();
            if (idText === searchTerm || valueText.includes(searchTerm)) {
                row.classList.add("bg-yellow-200");
            }
            else {
                row.classList.remove("bg-yellow-200");
            }
        }
    }
    else {
        alert("No table rows found!");
    }
}
// Button click event listener for search
(_e = document.getElementById("searchButton")) === null || _e === void 0 ? void 0 : _e.addEventListener("click", () => {
    searchEmail();
});
//# sourceMappingURL=script.js.map