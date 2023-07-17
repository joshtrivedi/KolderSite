// Define interface for table data
interface TableData {
  id: number;
  value: string;
}

//validate an email 
function validateEmail(email: string) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}


let url = "http://35.208.82.140:3001";
let count = "http://35.208.82.140:3001/filecount";


document.addEventListener("DOMContentLoaded", () => {
  fetchTextFileNames();
});


// Fetch button click event listener
document.getElementById("fetchButton")?.addEventListener("click", () => {
  const fileSelect = document.getElementById("fileDropDown") as HTMLSelectElement;
  const selectedFile = fileSelect.value;
  if (selectedFile !== "") {
    const fileName = `${fileSelect.value}`;
    emailsread(fileName).then((data) => {
      const emails = data;
      displayTableData(emails, fileName);
    })

  }
});

document.getElementById("fileDropDown")?.addEventListener("click", () => {
})

// File dropdown change event listener
document.getElementById("fileDropDown")?.addEventListener("change", () => {
  const fileSelect = document.getElementById("fileDropDown") as HTMLSelectElement;
  const selectedFile = fileSelect.value;
  if (selectedFile !== "") {
    const fileName = fileSelect.value;
  }
});

// Populate file dropdown with text file names
function populateFileDropdown(fileNames: string[]) {
  const fileSelect = document.getElementById("fileDropDown") as HTMLSelectElement;

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
  })
}

const filecount = async () => {
  const response = await fetch(`${url}/filecount`)
  const data = await response.json()
  return data
}

// fetch the emails from the API
const emailsread = async (filename: string) => {
  const response = await fetch(`${url}/emailsread/${filename}`)
  const data = await response.json()
  console.log(data)
  return data
}

const filenames = async () => {
  const response = await fetch(`${url}/filenames`)
  const data = await response.json()
  return data
}


const emailsedit = async (filename: string, emails: string) => {
  try {
    console.log(emails)
    console.log(filename)
    const response = await fetch(`${url}/emailsedit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({filename: filename, filedata: emails})
    });

    if (response.ok) {
      const data = await response.text();
      console.log('Success:', data);
      return data;
    } else {
      throw new Error('Failed to update emails');
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

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
function processEmailFiles(files: FileList) {
  // Read each file using FileReader
  for (const file of files) {
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const emails = text.split(",").map((email) => email.trim());
      displayTableData(emails, file.name);

    };
    reader.readAsText(file);
  }
}


// Display table data
function displayTableData(emails: string[], fileName: string) {
  const tableBody = document.getElementById('tableBody');
  if (tableBody) {
    tableBody.innerHTML = '';
    console.log(emails)
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
function selectRow(row: HTMLTableRowElement, index: number, email: string, emails: string[], filename: string) {
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
function updateTextFile(emails: any[], fileName: string) {
  const updatedText = emails.join(', ');
}



// Add to table button click event listener

// Delete last row button click event listener
document
  .getElementById("addToFile")
  ?.addEventListener("click", () => {

  });


// Search for an email by ID or value
// ...

// Search for an email by ID or value
function searchEmail() {
  const searchInput = document.getElementById("manualRowField") as HTMLInputElement;
  const searchTerm = searchInput.value.trim().toLowerCase();

  const tableRows = document.getElementById("tableBody")?.getElementsByTagName("tr");
  if (tableRows) {
    let foundRow: HTMLTableRowElement | null = null; // Variable to store the first highlighted row

    for (const row of tableRows) {
      const idCell = row.getElementsByTagName("th")[0];
      const valueCell = row.getElementsByTagName("th")[1];
      const idText = idCell.textContent?.trim().toLowerCase();
      const valueText = valueCell.textContent?.trim().toLowerCase();

      if (idText === searchTerm || valueText?.includes(searchTerm)) {
        row.classList.add("bg-yellow-200");
        if (!foundRow) {
          foundRow = row; // Store the first highlighted row
        }
      } else {
        row.classList.remove("bg-yellow-200");
      }
    }

    if (foundRow) {
      foundRow.scrollIntoView({ behavior: "smooth", block: "center" }); // Scroll to the first highlighted row
    }
  } else {
    alert("No table rows found!");
  }
}

// ...


// ...
// ...

// Regular expression for email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ...

document.getElementById("addToTableButton")?.addEventListener("click", () => {
  console.log("adding to table");
  let emails: string[] = [];
  const inputField = document.getElementById("manualRowField") as HTMLInputElement;
  const fileSelect = document.getElementById("fileDropDown") as HTMLSelectElement;
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
    let existingEmails: string[] = [];
    tableBody.querySelectorAll('tr').forEach((row) => {
      const email = row.getElementsByTagName("th")[1].textContent?.trim().toLowerCase();
      existingEmails.push(email!!);
    });

    // Split the input value into multiple emails
    const inputEmails = inputValue.split(",").map((email) => email.trim());

    // Add each email to the table if it's a valid email and not a duplicate
    inputEmails.forEach((email) => {
      if(!emailRegex.test(email)) {
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
  } else {
    alert("Please enter at least one email address");
  }
});

// ...


// ...



function checkForDuplicates(emails: string[], email: string) {
  return emails.includes(email);
}

document.getElementById("addToFile")?.addEventListener("click", async () => {
  console.log("adding to file");
  let emails: string = "";
  let filename: string = "";
  const tableBody = document.getElementById('tableBody');
  if (!tableBody || tableBody.childElementCount == 0) {
    alert("Table body not found!");
    return;
  }
  for (let i = 0; i < tableBody.childElementCount; i++) {
    const row = tableBody.children[i];
    const email = row.children[1].textContent;
    filename = row.children[2].textContent?? "";
    if (email) {
      emails += email + `, \n`;
    }
  }
  if (emails.length > 0) {
    // Call emailsedit to update the file with the new emails
    try {
      await emailsedit(filename, emails);
      console.log("Emails updated successfully");
      // Optionally, you can display a success message to the user
      alert("Emails updated successfully");
    } catch (error) {
      console.error("Error updating emails:", error);
      // Optionally, you can display an error message to the user
      alert("Error updating emails. Please try again.");
    }
  } else {
    alert("No emails found to update");
  }

})

// Button click event listener for search
document.getElementById("searchButton")?.addEventListener("click", () => {
  searchEmail();
});
