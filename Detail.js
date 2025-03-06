const BASE_URL = 'http://localhost:3000';

const DetailBook = async () => {
    console.log('Loading book details');
    const response = await axios.get(`${BASE_URL}/book`);
    console.log(response.data);

    const urlParams = new URLSearchParams(window.location.search);
    const ID = urlParams.get('id');
    const BookID = urlParams.get('bookid');

    
    const book = response.data.find(book => book.BookID == BookID);
    if (!book) {
        document.getElementById('Detail').innerHTML = `<h3 class="text-center text-danger">ไม่พบข้อมูลหนังสือ</h3>`;
        return;
    }

    const MainNavbarDom = document.getElementById('mainNavbar')
    let htmlMainNavData = `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">    
      <div class="container-fluid">
        <a class="navbar-brand" href="main.html?id=${ID || ''}">
          <img src="picture/Neramit.webp" style="height: 65px; width: 100px;">
        </a>
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

    
    const DetailDom = document.getElementById('Detail');
    let htmlContent = `
        <div class="row mt-4">
           
            <div class="col-md-4 text-center">
                <img src="/picture/${book.BookImage}"  class="img-fluid rounded shadow book-image" alt="${book.BookName}">
            </div>

           
            <div class="col-md-8">
                <h2>${book.BookName}</h2>
                <h4 class="text mt-3">&#3647;${book.BookPrice}</h4>
                <h4 class="text mt-3"><strong>คำอธิบาย: </strong></h4>
                <p class="mt-3">${book.Description || "ไม่มีคำอธิบาย"}</p>

                <!-- ปุ่มใส่ตะกร้า -->
                <button onclick="addToCart('${ID}', '${book.BookID}'); addToOrder('${ID}', '${book.BookID}')" class="btn btn-primary btn-lg mt-3">
                    <i class="bi bi-cart-plus"></i> ใส่ตะกร้า
                </button>
            </div>
        </div>
    `;

    DetailDom.innerHTML = htmlContent;

    const footerDom = document.getElementById('footer')
    let htmlFooterData = `<footer class="bg-dark text-light py-5" style="margin-top: 50px;">`
    htmlFooterData += `
     <div class="container">
    <div class="row align-items-start">
      <div class="col-md-5">
        <h5>About Us</h5>
        <p>We provide high-quality services to our customers with a focus on reliability, innovation, and excellence.</p>
        
      </div>

      <div class="col-md-1 d-flex justify-content-center">
        <div class="vr bg-light" style="height: 300px; width: 2px;"></div>
      </div>

      <div class="col-md-3 text-md-start">
        <h5>Quick Links</h5>
        <div class="mb-3">
            <a href="main.html?id=${ID || ''}" class="text-light me-3 text-decoration-none">Home</a>
            <a href="Manga.html?id=${ID || ''}" class="text-light me-3 text-decoration-none">Manga</a>
            <a href="Crime.html?id=${ID || ''}" class="text-light me-3 text-decoration-none">นิยายสืบสวน</a>
            <a href="Fantasy.htmlid=${ID || ''}" class="text-light text-decoration-none">นิยายแฟนตาซี</a>
            <a href="LN.html?id=${ID || ''}" class="text-light me-3 text-decoration-none">Light Novel</a>
            <a href="Yaoi.html?id=${ID || ''}" class="text-light me-3 text-decoration-none">Yaoi</a>
            <a href="Yuri.html?id=${ID || ''}" class="text-light text-decoration-none">Yuri</a>
        </div>
      </div>

        <div class="col-md-1 d-flex justify-content-center">
        <div class="vr bg-light" style="height: 300px; width: 2px;"></div>
        </div>

      <div class="col-md-2 text-md-start">
        <h5>Admin</h5>
        <div class="mb-3">
            <a href="../admin/AdLogin.html" class="text-light me-3 text-decoration-none">Administrator</a>
        </div>
    </div>

   
    <div class="text-center mt-4 pt-3 border-top">
      <p class="mb-0">&copy; 2024 Your Company. All rights reserved.</p>
    </div>
  </div>
</footer>`
    htmlFooterData += '</footer>'
    footerDom.innerHTML = htmlFooterData;
};


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

const addToOrder = async (ID, BookID) => {
    try {
        console.log('Adding to order:', ID, BookID);
        const response = await axios.post(`${BASE_URL}/orders`, {
            CusID: ID,
            BID: BookID,
            TotalQuantity: 1
        });
        console.log(response.data);
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการสั่งซื้อ:', error);
    }
}


window.onload = DetailBook;
