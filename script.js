"use strict";
var _a, _b, _c, _d;
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
    const data = [];
    // Read each file using FileReader
    // Read each file using FileReader
    for (const file of files) {
        const reader = new FileReader();
        reader.onload = (event) => {
            var _a;
            const text = (_a = event.target) === null || _a === void 0 ? void 0 : _a.result;
            const emails = text.split(",").map((email) => email.trim());
            displayTableData(emails);
        };
        reader.readAsText(file);
    }
}
// Display table data
function displayTableData(emails) {
    const tableBody = document.getElementById('tableBody');
    if (tableBody) {
        tableBody.innerHTML = '';
        emails.forEach((email, index) => {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
          <td class="px-4 py-2">${index + 1}</td>
          <td class="px-4 py-2">${email}</td>
        `;
            tableBody.appendChild(newRow);
        });
    }
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
    .getElementById("removeLastRowButton")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", () => {
    var _a;
    const tableRows = (_a = document
        .getElementById("tableBody")) === null || _a === void 0 ? void 0 : _a.getElementsByTagName("tr");
    if (tableRows && tableRows.length > 0) {
        tableRows[tableRows.length - 1].remove();
    }
});
//# sourceMappingURL=script.js.map