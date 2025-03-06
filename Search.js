document.addEventListener("DOMContentLoaded", function () {
    const searchForm = document.getElementById("searchForm");
    const searchInput = document.getElementById("searchInput");

    // ตรวจสอบว่าฟอร์มค้นหามีอยู่ก่อนใช้งาน
    if (searchForm && searchInput) {
        searchForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const query = searchInput.value.trim();

            if (query) {
                window.location.href = `Search.html?q=${encodeURIComponent(query)}`;
            } else {
                alert("กรุณากรอกคำค้นหา");
            }
        });
    }

    // ดึงค่าค้นหาจาก URL และแสดงผล (เฉพาะ Search.html)
    const searchResults = document.getElementById("searchResults");
    if (searchResults) {
        const params = new URLSearchParams(window.location.search);
        const query = params.get("q");

        if (query) {
            fetch(`/search?q=${encodeURIComponent(query)}`)
                .then(response => response.json())
                .then(data => displayResults(data))
                .catch(error => console.error("❌ Error:", error));
        }
    }
});

function displayResults(books) {
    const resultsContainer = document.getElementById("searchResults");
    resultsContainer.innerHTML = "";

    if (books.length === 0) {
        resultsContainer.innerHTML = "<p>ไม่พบหนังสือที่ค้นหา</p>";
        return;
    }

    let htmlData = "";
    books.forEach(book => {
        htmlData += `
            <div class="col">
                <div class="card h-100 border-0">
                    <a href="Detail.html?bookid=${book.BookID}">
                        <img src="/picture/${book.BookImage}" class="card-img-top" style="object-fit: cover; height: 200px;">
                    </a>
                    <div class="card-body text-center">
                        <h5 class="card-title" style="text-align: start; font-size: 20px;">${book.BookName}</h5>
                    </div>
                    <h4 style="text-align: start; padding-bottom: 10px;">
                        <strong>&#3647;${book.BookPrice}</strong>
                    </h4>
                    <button onclick="addToCart('${book.BookID}')" class="btn btn-primary py-2 rounded-pill add-to-cart" data-bookid="${book.BookID}" style="font-size: 15px;">
                        <strong><i class="bi-cart" style="padding-right: 10px;"></i>ใส่ตะกร้า</strong>
                    </button>
                </div>
            </div>
        `;
    });

    resultsContainer.innerHTML = htmlData;
}


