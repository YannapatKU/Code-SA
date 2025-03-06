const BASE_URL = 'http://localhost:3000';

const MangaBook = async () => {
    console.log('Loading');
    const response = await axios.get(`${BASE_URL}/book`);
    console.log(response.data);

    const urlParams = new URLSearchParams(window.location.search);
    const ID = urlParams.get('id');
    const subType = urlParams.get('subType') || 'All';

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

    const MangaDom = document.getElementById('MangaData');
    let htmlContent = '<div class="row" style="margin-top: 20px;">';

   
    htmlContent += `
        <div class="col-md-2">
            <div class="list-group">
                <a href="Manga.html?id=${ID}&subType=All" class="list-group-item">All</a>
                <a href="Manga.html?id=${ID}&subType=Romantic" class="list-group-item">Romantic</a>
                <a href="Manga.html?id=${ID}&subType=Crime" class="list-group-item">Crime</a>
                <a href="Manga.html?id=${ID}&subType=Action" class="list-group-item">Action</a>
                <a href="Manga.html?id=${ID}&subType=Fantasy" class="list-group-item">Fantasy</a>
                <a href="Manga.html?id=${ID}&subType=Yaoi" class="list-group-item">Yaoi</a>
                <a href="Manga.html?id=${ID}&subType=Yuri" class="list-group-item">Yuri</a>
            </div>
        </div>
    `;

   
    htmlContent += '<div class="col-md-10">';
    htmlContent += '<div class="row row-cols-1 row-cols-md-3 row-cols-lg-5 g-4">';
    
    let MangaBooks = response.data.filter(book => book.BookType === 'Manga');
    if (subType !== 'All') {
        MangaBooks = MangaBooks.filter(book => book.SubType === subType);
    }
    
    for (let i = 0; i < 12 && i < MangaBooks.length; i++) {
        let book = MangaBooks[i];    
        htmlContent += `
            <div class="col" style= "margin-top: 20px;">
                <div class="card h-100 border-0">
                    <a href="Detail.html?id=${ID || ''}&&bookid=${book.BookID}"><img src="/picture/${book.BookImage}" class="card-img-top" style="object-fit: cover;"></a>
                    <div class="card-body text-center">
                        <h5 class="card-title" style="text-align: start; font-size: 20px;">${book.BookName}</h5>
                    </div>
                    <h4 style="text-align: start; padding-bottom: 10px;"><strong>&#3647;${book.BookPrice}</strong></h4>
                    <button onclick="addToCart('${ID}', '${book.BookID}'); addToOrder('${ID}', '${book.BookID}')" class="btn btn-primary py-2 rounded-pill add-to-cart" data-bookid="${book.BookID}" style="font-size: 15px; background-color: #007bff; border-color: #007bff;">
                        <strong><i class="bi-cart" style="padding-right: 10px;"></i>ใส่ตะกร้า</strong>
                    </button>
                </div>
            </div>
        `;
    }
    
    htmlContent += '</div></div>'; 
    MangaDom.innerHTML = htmlContent;

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
        alert('ไม่สามารถเพิ่มลงตะกร้าได้ ต้องลงชื่อเข้าใช้ก่อน');
        window.location.href = 'Login.html';
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

window.onload = MangaBook;
