
const form = document.getElementById("studentForm");
const nameInput = document.getElementById("studentName");
const numberInput = document.getElementById("studentNumber");
const studentList = document.getElementById("studentList");
const studentCount = document.getElementById("studentCount");
const studentSearch = document.getElementById("studentSearch");
let students = JSON.parse(localStorage.getItem("students") || "[]");

function saveStudents() {
  localStorage.setItem("students", JSON.stringify(students));
}

function renderStudents() {
  studentList.replaceChildren();

  if (students.length === 0) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");

    cell.colSpan = 3;
    cell.textContent = "Henüz öğrenci eklenmedi.";
    row.appendChild(cell);
    studentList.appendChild(row);
  }

const searchTerm = studentSearch.value.trim().toLocaleLowerCase("tr-TR");

const filteredStudents = students.filter((student) => {
  return (
    student.name.toLocaleLowerCase("tr-TR").includes(searchTerm) ||
    student.number.includes(searchTerm)
  );
});

filteredStudents.forEach((student) => {
    const row = document.createElement("tr");

    [student.number, student.name].forEach((value) => {
      const cell = document.createElement("td");
      cell.textContent = value;
      row.appendChild(cell);
    });

    const actionCell = document.createElement("td");
    const deleteButton = document.createElement("button");

    deleteButton.textContent = "Sil";
    deleteButton.className = "delete-btn";
    deleteButton.addEventListener("click", () => {
      students = students.filter((item) => item.id !== student.id);
      saveStudents();
      renderStudents();
    });

    actionCell.appendChild(deleteButton);
    row.appendChild(actionCell);
    studentList.appendChild(row);
  });

  studentCount.textContent = `Toplam öğrenci: ${students.length}`;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

 const name = nameInput.value.trim().replace(/\s+/g, " ");
  const number = numberInput.value.trim();

  if (!name || !number) return;

  if (students.some((student) => student.number === number)) {
  alert("Bu öğrenci numarası zaten kayıtlı.");
  numberInput.focus();
  return;
}

if (!/^\d+$/.test(number)) {
  alert("Öğrenci numarası yalnızca rakamlardan oluşmalıdır.");
  numberInput.focus();
  return;  
}

  students.push({
    id: crypto.randomUUID(),
    name,
    number
  });

  saveStudents();
  renderStudents();
  form.reset();
  nameInput.focus();
});

renderStudents();
studentSearch.addEventListener("input", renderStudents);