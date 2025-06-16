// Dữ liệu sự kiện
const events = [
  {
    name: "Họp Lớp C3",
    owner: "Nguyễn Trung Kiên",
    startDate: "29/06/2025",
    endDate: "30/06/2025",
    priority: "Cao",
    time: "29/06/2025 - 18:00",
    location: "Quán Nhậu Tự Do",
    notes: "Mặc đồng phục trắng, đi giày"
  },
  {
    name: "Lớp Đại Học",
    owner: "Nguyễn Trung Kiên",
    startDate: "29/06/2025",
    endDate: "30/06/2025",
    priority: "Cao",
    time: "29/06/2025 - 18:00",
    location: "Quán Nhậu Tự Do",
    notes: "Mặc đồng phục trắng, đi giày"
  }
];

// ⚠️ Hàm này phải ở ngoài
function openModal(event) {
  document.getElementById("modalName").innerText = event.name;
  document.getElementById("modalTime").innerText = event.time || event.startDate;
  document.getElementById("modalLocation").innerText = event.location || "N/A";
  document.getElementById("modalNotes").innerText = event.notes || "Không có ghi chú.";

  const modal = new bootstrap.Modal(document.getElementById('eventModal'));
  modal.show();
}

// ⚠️ Hàm này cũng phải ở ngoài
function showDetails(event) {
  const detailBox = document.getElementById("detailBox");
  detailBox.innerHTML = `
    <table class="table table-bordered mt-4">
      <thead class="table-light">
        <tr>
          <th>Event Name</th>
          <th>Owner</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Priority / Importance</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>${event.name}</td>
          <td>${event.owner}</td>
          <td>${event.startDate}</td>
          <td>${event.endDate}</td>
          <td>${event.priority}</td>
          <td>
            <button class="btn btn-sm btn-primary view-btn">View</button>
            <button class="btn btn-sm btn-outline-secondary ms-2">Edit</button>
          </td>
        </tr>
      </tbody>
    </table>
  `;

  // Bắt sự kiện nút View sau khi render xong
  document.querySelector(".view-btn").addEventListener("click", () => openModal(event));
}

// ✅ Hàm chính dùng để lọc và hiển thị kết quả
function filterEvents() {
  const keyword = document.getElementById("searchInput").value.trim().toLowerCase();
  const resultBox = document.getElementById("resultBox");
  const detailBox = document.getElementById("detailBox");

  resultBox.innerHTML = "";
  detailBox.innerHTML = "";

  if (keyword === "") {
    resultBox.classList.remove("show");
    return;
  }

  const filtered = events.filter(event =>
    event.name.toLowerCase().includes(keyword)
  );

  resultBox.classList.add("show");

  if (filtered.length === 0) {
    resultBox.innerHTML = `
      <div class="result-item text-danger text-center" style="border: none;">
        <i class="bi bi-exclamation-circle"></i> Không tìm thấy sự kiện nào phù hợp
      </div>
    `;
    return;
  }

  filtered.forEach(event => {
    const div = document.createElement("div");
    div.className = "result-item";
    div.innerHTML = `<i class="bi bi-calendar-event"></i> ${event.name}`;
    div.addEventListener("click", () => showDetails(event));
    resultBox.appendChild(div);
  });
}
