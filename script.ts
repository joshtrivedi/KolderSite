// Define interface for table data
interface TableData {
  id: number;
  value: string;
}

// Fetch button click event listener
document.getElementById("fetchButton")?.addEventListener("click", () => {
  document.getElementById("fileInput")?.click();
});

// File input change event listener
document.getElementById("fileInput")?.addEventListener("change", () => {
  const fileInput = document.getElementById("fileInput") as HTMLInputElement;
  const files = fileInput.files;
  if (files && files.length > 0) {
    processEmailFiles(files);
  }
});

// Process the selected email files
function processEmailFiles(files: FileList) {
  const data: TableData[] = [];

  // Read each file using FileReader
  // Read each file using FileReader
  for (const file of files) {
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const emails = text.split(",").map((email) => email.trim());
      displayTableData(emails);
    };
    reader.readAsText(file);
  }
}


// Display table data
function displayTableData(emails: any[]) {
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
document.getElementById("addToTableButton")?.addEventListener("click", () => {
  const inputValue = (<HTMLInputElement>document.getElementById("inputField"))
    ?.value;
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
document
  .getElementById("removeLastRowButton")
  ?.addEventListener("click", () => {
    const tableRows = document
      .getElementById("tableBody")
      ?.getElementsByTagName("tr");
    if (tableRows && tableRows.length > 0) {
      tableRows[tableRows.length - 1].remove();
    }
  });
