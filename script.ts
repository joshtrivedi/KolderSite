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
  // Read each file using FileReader
  for (const file of files) {
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const emails = text.split(",").map((email) => email.trim());
        displayTableData(emails, files, file.name);
      
    };
    reader.readAsText(file);
  }
}


// Display table data
function displayTableData(emails: string[], files: FileList, fileName:string) {
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
function selectRow(row: HTMLTableRowElement, index: number, email: string, emails: string[], fileName: string | undefined, files: FileList) {
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
function updateTextFile(emails: any[], fileName: string | undefined, files: FileList) {
  const updatedText = emails.join(', ');
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
  .getElementById("addToFile")
  ?.addEventListener("click", () => {
    
  });


// Search for an email by ID or value
function searchEmail() {
  const searchInput = document.getElementById("manualRowField") as HTMLInputElement;
  const searchTerm = searchInput.value.trim().toLowerCase();
  
  const tableRows = document.getElementById("tableBody")?.getElementsByTagName("tr");
  if (tableRows) {
    for (const row of tableRows) {
      const idCell = row.getElementsByTagName("td")[0];
      const valueCell = row.getElementsByTagName("td")[1];
      const idText = idCell.textContent?.trim().toLowerCase();
      const valueText = valueCell.textContent?.trim().toLowerCase();
      
      if (idText === searchTerm || valueText!!.includes(searchTerm)) {
        row.classList.add("bg-yellow-200");
      } else {
        row.classList.remove("bg-yellow-200");
      }
    }
  } else {
    alert("No table rows found!");
  }
}


// Button click event listener for search
document.getElementById("searchButton")?.addEventListener("click", () => {
  searchEmail();
});
