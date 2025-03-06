const BASE_URL = 'http://localhost:3000';

const addToCart = async (ID, BookID) => {
    try {
        console.log('Adding to cart:', ID, BookID);
        const response = await axios.post(`${BASE_URL}/cart`, {
            CusID: ID,
            BID: BookID,
            TotalQuantity: 1
        });
        alert('เพิ่มลงตะกร้าสำเร็จ!');
        console.log(response.data);
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการเพิ่มลงตะกร้า:', error);
        alert('ไม่สามารถเพิ่มลงตะกร้าได้');
    }
};

const urlParams = new URLSearchParams(window.location.search);
const ID = urlParams.get('id');

const Bookie = async () => {
    console.log('Loading');
    const response = await axios.get(`${BASE_URL}/book`);
    console.log(response.data);

    const MainNavbarDom = document.getElementById('mainNavbar')
    let htmlMainNavData = `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">    
      <div class="container-fluid">
        <a class="navbar-brand" href="main.html?id=${ID || ''}">
          <img src="picture/Neramit.webp" style="height: 65px; width: 100px;">
        </a>
        <form class="d-flex w-50 h-10" id="searchForm">
            <input class="form-control me-2" type="search" id="searchInput" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
        <ul class="navbar-nav navbar-right">
            <li><a href="Cart.html?id=${ID || ''}""><i class="bi bi-cart" style='font-size:22px; padding-right: 15px; color: gray;'></i></a></li>`

if (ID) {
    htmlMainNavData += `<li><a href="Profile.html?id=${ID || ''}"><i class="bi bi-person-circle" style='font-size:36px;color: gray;'></i></a></li>`
} else {
    htmlMainNavData += `<li><a href="Login.html">ลงชื่อเข้าใช้</a></li>`
}

htmlMainNavData += `
        </ul>
    </div>
</nav>`

MainNavbarDom.innerHTML = htmlMainNavData;

    const NavbarDom = document.getElementById('navbar')
    let htmlNavData = '<nav class="navbar navbar-expand-lg navbar-dark bg-dark" style="margin-top: 2px;">'    
        htmlNavData += `
 
    <div class="container-fluid">
       
        <ul class="navbar-nav">
          <li class="nav-item active list-inline-item">
            <a class="nav-link" href="main.html?id=${ID || ''}" ><h5>Home</h5></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="Manga.html?id=${ID || ''}"><h5>Manga</h5></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="Crime.html?id=${ID || ''}"><h5>นิยายสืบสวน</h5></a>
          </li>
          <li class="nav-item">
              <a class="nav-link" href="Fantasy.html?id=${ID || ''}"><h5>แฟนตาซี</h5></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="LN.html?id=${ID || ''}"><h5>Light Novel</h5></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="Yaoi.html?id=${ID || ''}"><h5>Yaoi</h5></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="Yuri.html?id=${ID || ''}"><h5>Yuri</h5></a>
          </li>
        </ul>
      </div>
  </nav>
    `
    htmlNavData += '</div>'
    NavbarDom.innerHTML = htmlNavData

    document.addEventListener("DOMContentLoaded", function () {
        
        document.getElementById("searchForm").addEventListener("submit", function(event) {
            event.preventDefault(); 
            const query = document.getElementById("searchInput").value.trim();
    
            if (query) {
                window.location.href = `Search.html?q=${encodeURIComponent(query)}`;
            } else {
                alert("กรุณากรอกคำค้นหา");
            }
        });
    
      
        const params = new URLSearchParams(window.location.search);
        const query = params.get("q");
    
        if (query) {
            fetch(`/search?q=${encodeURIComponent(query)}`)
                .then(response => response.json())
                .then(data => displayResults(data))
                .catch(error => console.error("Error:", error));
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
    
   
    

    const footerDom = document.getElementById('footer')
    let htmlFooterData = `<footer class="bg-dark text-light py-5" style="margin-top: 50px;">`

};

window.onload = Bookie;
