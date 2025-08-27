// Εναλλαγή sections στο dashboard
function showSection(id) {
  const sections = document.querySelectorAll('.content-section');
  sections.forEach(section => section.classList.add('d-none'));

  document.getElementById('default-message').classList.add('d-none');
  document.getElementById(id).classList.remove('d-none');

  // Highlight ενεργού κουμπιού στο sidebar
  const buttons = document.querySelectorAll('.nav button');
  buttons.forEach(btn => btn.classList.remove('active'));

  const clickedButton = [...buttons].find(btn => btn.getAttribute('onclick')?.includes(id));
  if (clickedButton) clickedButton.classList.add('active');

  if (id === 'section-themata') initThematologia();
  if (id === 'section-anathesi') initAnatheseis();
  if (id === 'section-diplomatikes') initDiplomatikesMou();
  if (id === 'section-proskliseis') initProskliseis();
  if (id === 'section-statistika') initStatistika();
  if (id === 'section-diaxeirisi') initDiaxeirisi();
}

// ============ Placeholder Functions για κάθε λειτουργία ============ //

// 📝 Θεματολόγιο
function initThematologia() {
  console.log("Φόρτωση θεματολογίου...");

  const topics = [
    {
      id: 1,
      title: "Ανάπτυξη Web Πλατφόρμας",
      summary: "Σύστημα υποστήριξης διπλωματικών με PHP/MySQL.",
      pdf: "platform.pdf"
    },
    {
      id: 2,
      title: "AI στην Εκπαίδευση",
      summary: "Χρήση τεχνητής νοημοσύνης για προσαρμοστική διδασκαλία.",
      pdf: "ai_edu.pdf"
    }
  ];

  const list = document.getElementById("topicsList");
  list.innerHTML = "";

  topics.forEach(topic => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-start";
    li.innerHTML = `
      <div>
        <h6 class="mb-1">${topic.title}</h6>
        <small class="text-muted">${topic.summary}</small><br>
        <small><a href="#">📄 ${topic.pdf}</a></small>
      </div>
      <button class="btn btn-sm btn-outline-secondary">✏️ Επεξεργασία</button>
    `;
    list.appendChild(li);
  });

  // Καταχώρηση νέου θέματος (προσωρινά mock)
  const form = document.getElementById("topicForm");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const summary = document.getElementById("summary").value;
    const pdf = document.getElementById("pdf").files[0]?.name || "χωρίς αρχείο";

    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-start";
    li.innerHTML = `
      <div>
        <h6 class="mb-1">${title}</h6>
        <small class="text-muted">${summary}</small><br>
        <small><a href="#">📄 ${pdf}</a></small>
      </div>
      <button class="btn btn-sm btn-outline-secondary">✏️ Επεξεργασία</button>
    `;

    list.prepend(li);
    form.reset();
  });
}

// 📨 Αναθέσεις
function initAnatheseis() {
  console.log("Φόρτωση αναθέσεων...");

  const form = document.getElementById("assignmentForm");
  const assignmentList = document.getElementById("assignmentList");

  if (form.dataset.bound === "true") return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const student = document.getElementById("studentSearch").value.trim();
    const title = document.getElementById("title").value.trim();
    const summary = document.getElementById("summary").value.trim();
    const pdfFile = document.getElementById("pdfFile").files[0]?.name || "χωρίς αρχείο";

    if (!student || !title || !summary) {
      alert("Παρακαλώ συμπληρώστε όλα τα υποχρεωτικά πεδία.");
      return;
    }

    const li = document.createElement("li");
    li.className = "list-group-item";
    li.innerHTML = `
      <div>
        <strong>Φοιτητής:</strong> ${student}<br>
        <strong>Θέμα:</strong> ${title}<br>
        <small class="text-muted">${summary}</small><br>
        <small><em>Αρχείο:</em> ${pdfFile}</small>
      </div>
      <span class="badge bg-secondary mt-1">Προσωρινή Ανάθεση</span>
    `;

    assignmentList.prepend(li);
    form.reset();
  });
  form.dataset.bound = "true";
}

// 📚 Οι Διπλωματικές μου
function initDiplomatikesMou() {
  console.log("Φόρτωση διπλωματικών...");
   const tableBody = document.querySelector("#diplomatikesTable tbody");
  const roleFilter = document.getElementById("roleFilter");
  const statusFilter = document.getElementById("statusFilterD");

  const data = [
  {
    title: "Συστήματα IoT στην Υγεία",
    student: "Ελένη Κωνσταντίνου",
    status: "ενεργή",
    role: "επιβλέπων",
    committee: ["Δρ. Παπαδόπουλος", "Δρ. Μαυρίδης", "Δρ. Ζάχος"],
    timeline: ["2025-01-10: Ανάθεση", "2025-03-01: Έναρξη υλοποίησης"]
  },
  {
    title: "Αυτόματη Εξαγωγή Πληροφορίας από PDF",
    student: "Ανδρέας Ζώτος",
    status: "υπό ανάθεση",
    role: "μέλος",
    committee: ["Δρ. Παπαδάτου", "Δρ. Λάμπρου", "Δρ. Σωτηρίου"],
    timeline: ["2025-07-10: Πρόσκληση", "2025-07-12: Αποδοχή"]
  },
  {
    title: "Αναγνώριση Εικόνας με ML",
    student: "Μαρία Τσιλιγκίρη",
    status: "περατωμένη",
    role: "επιβλέπων",
    committee: ["Δρ. Σταθόπουλος", "Δρ. Αντωνίου", "Δρ. Δέδες"],
    timeline: ["2024-02-05: Ανάθεση", "2025-05-25: Περάτωση"],
    grade: 9.2,
    link: "https://nemertes.upatras.gr/record/9999",
    praktiko: "praktiko-ml-2025.pdf"
  }
];

  function render() {
    const role = roleFilter.value;
    const status = statusFilter.value;

    tableBody.innerHTML = "";

    const filtered = data.filter(d => {
      const matchRole = (role === "all" || d.role === role);
      const matchStatus = (status === "all" || d.status === status);
      return matchRole && matchStatus;
    });

    if (filtered.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="4" class="text-muted text-center">Καμία εγγραφή.</td></tr>`;
      return;
    }

    filtered.forEach(d => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${d.title}</td>
        <td>${d.student}</td>
        <td>${d.status}</td>
        <td>${d.role}</td>
      `;
      tr.addEventListener("click", () => showDetails(d));
      tableBody.appendChild(tr);
    });
  }

  roleFilter.addEventListener("change", render);
  statusFilter.addEventListener("change", render);

const detailsBox = document.getElementById("diplomaDetailsBox");
const detailsContent = document.getElementById("diplomaDetailsContent");

function showDetails(dipl) {
  let html = `
    <p><strong>Τίτλος:</strong> ${dipl.title}</p>
    <p><strong>Φοιτητής:</strong> ${dipl.student}</p>
    <p><strong>Τριμελής Επιτροπή:</strong> ${dipl.committee.join(", ")}</p>
    <p><strong>Κατάσταση:</strong> ${dipl.status}</p>
    <hr>
    <p><strong>Χρονολόγιο:</strong></p>
    <ul>
      ${dipl.timeline.map(entry => `<li>${entry}</li>`).join("")}
    </ul>
  `;

  if (dipl.status === "περατωμένη") {
    html += `
      <hr>
      <p><strong>Τελικός Βαθμός:</strong> ${dipl.grade}</p>
      <p><strong>Αποθετήριο:</strong> <a href="${dipl.link}" target="_blank">${dipl.link}</a></p>
      <p><strong>Πρακτικό:</strong> <a href="${dipl.praktiko}" target="_blank">${dipl.praktiko}</a></p>
    `;
  }

  detailsContent.innerHTML = html;
}

  render();
}

// 👥 Προσκλήσεις Τριμελούς
function initProskliseis() {
  console.log("Φόρτωση προσκλήσεων...");

  const invitations = [
    {
      student: "Μαρία Παπαδοπούλου",
      topic: "Ανάλυση Κοινωνικών Δικτύων",
      date: "2025-07-20"
    },
    {
      student: "Γιώργος Νικολαΐδης",
      topic: "Blockchain & Τεκμηρίωση",
      date: "2025-07-15"
    }
  ];

  const invitationsList = document.getElementById("invitationsList");
  const actionBox = document.getElementById("actionBox");
  const studentName = document.getElementById("studentName");
  const topicTitle = document.getElementById("topicTitle");
  const invitationDate = document.getElementById("invitationDate");

  invitationsList.innerHTML = "";
  actionBox.classList.add("d-none");

  invitations.forEach((inv, index) => {
    const row = document.createElement("div");
    row.className = "border rounded p-3 mb-2 clickable-row";
    row.dataset.student = inv.student;
    row.dataset.title = inv.topic;
    row.dataset.date = inv.date;
    row.dataset.index = index;

    row.innerHTML = `
      <strong>${inv.student}</strong> – <em>${inv.topic}</em><br>
      <small>Ημ/νία πρόσκλησης: ${inv.date}</small>
    `;

    row.addEventListener("click", () => {
      studentName.textContent = inv.student;
      topicTitle.textContent = inv.topic;
      invitationDate.textContent = inv.date;

      // κρατάμε reference στο επιλεγμένο row
      actionBox.dataset.selectedIndex = index;
      actionBox.classList.remove("d-none");
      actionBox.scrollIntoView({ behavior: "smooth" });
    });

    invitationsList.appendChild(row);
  });
}

function handleAction(action) {
  const selectedIndex = document.getElementById("actionBox").dataset.selectedIndex;
  if (selectedIndex === undefined) return;

  const selectedRow = document.querySelectorAll(".clickable-row")[selectedIndex];
  const name = selectedRow?.dataset.student;

  if (!selectedRow) return;

  if (action === 'accepted') {
    alert(`Αποδεχθήκατε την πρόσκληση για τη διπλωματική της ${name}.`);
  } else {
    alert(`Απορρίψατε την πρόσκληση για τη διπλωματική της ${name}.`);
  }

  selectedRow.remove();
  document.getElementById("actionBox").classList.add("d-none");
}

// 📊 Στατιστικά
function initStatistika() {
  console.log("Φόρτωση στατιστικών...");

  // Destroy προηγούμενα charts αν υπάρχουν (για επανεμφάνιση)
if (window.chartTime instanceof Chart) window.chartTime.destroy();
if (window.chartGrade instanceof Chart) window.chartGrade.destroy();
if (window.chartCount instanceof Chart) window.chartCount.destroy();


  // 1. Χρόνος Περάτωσης
  const ctxTime = document.getElementById("chartTime");
  window.chartTime = new Chart(ctxTime, {
    type: "bar",
    data: {
      labels: ["Ως Επιβλέπων", "Ως Μέλος"],
      datasets: [{
        label: "Μήνες",
        data: [10.2, 9.1],
        backgroundColor: ["#198754", "#0d6efd"]
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      }
    }
  });

  // 2. Μέσος Βαθμός
  const ctxGrade = document.getElementById("chartGrade");
  window.chartGrade = new Chart(ctxGrade, {
    type: "bar",
    data: {
      labels: ["Ως Επιβλέπων", "Ως Μέλος"],
      datasets: [{
        label: "Βαθμός",
        data: [8.4, 8.1],
        backgroundColor: ["#ffc107", "#fd7e14"]
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { suggestedMax: 10 }
      },
      plugins: {
        legend: { display: false }
      }
    }
  });

  // 3. Πλήθος
  const ctxCount = document.getElementById("chartCount");
  window.chartCount = new Chart(ctxCount, {
    type: "pie",
    data: {
      labels: ["Ως Επιβλέπων", "Ως Μέλος"],
      datasets: [{
        label: "Πλήθος",
        data: [6, 9],
        backgroundColor: ["#20c997", "#6f42c1"]
      }]
    },
    options: {
      responsive: true
    }
  });
}

// 🗂️ Διαχείριση Διπλωματικών
function initDiaxeirisi() {
  console.log("Φόρτωση διαχείρισης διπλωματικών...");

  const diplomas = [
    {
  id: 1,
  title: "Ανάλυση Κοινωνικών Δικτύων",
  student: "Μ. Παπαδοπούλου",
  status: "υπό ανάθεση",
  invitedMembers: [
    { name: "Δρ. Νίκος Δημητρίου", status: "εκκρεμεί", date: null },
    { name: "Δρ. Ελένη Παπαδάτου", status: "αποδεκτό", date: "2025-07-28" },
    { name: "Δρ. Χρήστος Μπένος", status: "απορρίφθηκε", date: "2025-07-25" }
  ]
},
    {
      id: 2,
      title: "IoT στην Υγεία",
      student: "Ν. Κωνσταντίνου",
      status: "ενεργή"
    },
    {
      id: 3,
      title: "Αναγνώριση Εικόνας με ML",
      student: "Γ. Βασιλείου",
      status: "υπό εξέταση"
    }
  ];

  const list = document.getElementById("manageDiplomaList");
  const details = document.getElementById("manageDiplomaDetails");

  list.innerHTML = "";
  details.innerHTML = `<p class="text-muted">Επιλέξτε μία διπλωματική για να δείτε τις επιλογές διαχείρισης.</p>`;

  diplomas.forEach(dipl => {
    const li = document.createElement("li");
    li.className = "list-group-item list-group-item-action";
    li.textContent = `${dipl.title} (${dipl.status})`;
    li.addEventListener("click", () => showManageDetails(dipl));
    list.appendChild(li);
  });

  function showManageDetails(dipl) {
    let html = `
      <h5>${dipl.title}</h5>
      <p><strong>Φοιτητής:</strong> ${dipl.student}</p>
      <p><strong>Κατάσταση:</strong> ${dipl.status}</p>
    `;

    if (dipl.status === "υπό ανάθεση") {
  html += `
    <hr>
    <h6>📨 Μέλη Τριμελούς Επιτροπής (Πρόσκληση)</h6>
    <table class="table table-bordered">
      <thead class="table-light">
        <tr>
          <th>Όνομα</th>
          <th>Κατάσταση</th>
          <th>Ημ/νία Απάντησης</th>
        </tr>
      </thead>
      <tbody>
  `;

  (dipl.invitedMembers || []).forEach(member => {
    const statusBadge = {
      "εκκρεμεί": `<span class="badge bg-secondary">Εκκρεμεί</span>`,
      "αποδεκτό": `<span class="badge bg-success">Αποδεκτό</span>`,
      "απορρίφθηκε": `<span class="badge bg-danger">Απορρίφθηκε</span>`
    }[member.status];

    html += `
      <tr>
        <td>${member.name}</td>
        <td>${statusBadge}</td>
        <td>${member.date || "—"}</td>
      </tr>
    `;
  });

  html += `
      </tbody>
    </table>
    <button class="btn btn-danger mt-2">❌ Ακύρωση Ανάθεσης</button>
  `;
}

    if (dipl.status === "ενεργή") {
      html += `
        <hr>
        <div class="mb-3">
          <label class="form-label">✍️ Προσθήκη Σημείωσης (μόνο για εσάς)</label>
          <textarea class="form-control" rows="2" placeholder="π.χ. Έχει αργήσει το 2ο κεφάλαιο..."></textarea>
        </div>
        <div class="mb-3">
          <label class="form-label">Αρ. Πρακτικού ΓΣ για ακύρωση (μετά από 2 έτη)</label>
          <input type="text" class="form-control" placeholder="π.χ. 123/2025">
        </div>
        <button class="btn btn-danger me-2">❌ Ακύρωση Ανάθεσης</button>
        <button class="btn btn-success">🔁 Μετάβαση σε 'Υπό Εξέταση'</button>
      `;
    }

    if (dipl.status === "υπό εξέταση") {
      html += `
        <hr>
        <p>📄 Προσχέδιο διπλωματικής έχει κατατεθεί (mock).</p>
        <p><strong>Καταχώρηση Βαθμού:</strong></p>
        <div class="mb-3">
          <label class="form-label">Βαθμός (0–10)</label>
          <input type="number" class="form-control w-25" min="0" max="10">
        </div>
        <button class="btn btn-primary">💾 Καταχώρηση</button>
      `;
    }

    details.innerHTML = html;
  }
}

// ============ Αυτόματη ενεργοποίηση default ενότητας (αν θες) ============ //
// showSection('section-themata'); // Ενεργοποιεί ένα section by default
