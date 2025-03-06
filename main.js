const BASE_URL = 'http://localhost:3000';



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

        const CarouselrDom = document.getElementById('carousel')
        let htmlCarouselData = '<div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel" >'    
        htmlCarouselData += `
     
         <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="https://www.phoenixnext.com/media/nextgenimages/media/banner/tmp/EC_Banner_Alya-03.webp" 
            class="d-block w-100" alt="..." style="height: 400px; opacity: 0.75;">
          </div>
          <div class="carousel-item">
            <img src="https://www.phoenixnext.com/media/nextgenimages/media/banner/tmp/EC_Banner_Guild_No_Uketsukejo.webp" 
            class="d-block w-100" alt="..." style="height: 400px; opacity: 0.75;">
          </div>
          <div class="carousel-item">
            <img src="https://www.phoenixnext.com/media/nextgenimages/media/banner/tmp/Kage_Banner.webp" 
            class="d-block w-100" alt="..." style="height: 400px; opacity: 0.75;">
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
        `
        htmlCarouselData += '</div>'
        CarouselrDom.innerHTML = htmlCarouselData

    const BookDom = document.getElementById('BookData');
    let htmlData = '<div class="row row-cols-1 row-cols-md-3 row-cols-lg-5 g-4">';

    for (let i = 0; i < 5 && i < response.data.length; i++) {
        let book = response.data[i];
        htmlData += `
            <div class="col">
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
    

    htmlData += '</div>';
    BookDom.innerHTML = htmlData;

    const MangaDom = document.getElementById('MangaData');
    let htmlMangaData = '<div class="row row-cols-1 row-cols-md-3 row-cols-lg-5 g-4">';

    const MangaBooks = response.data.filter(book => book.BookType === 'Manga');

    for (let i = 0; i < 5 && i < MangaBooks.length; i++) {
        let MangaDom1 = MangaBooks[i];    
        htmlMangaData += `
           <div class="col">
                <div class="card h-100 border-0">
                    <a href="Detail.html?id=${ID || ''}&&bookid=${MangaDom1.BookID}"><img src="/picture/${MangaDom1.BookImage}" class="card-img-top" style="object-fit: cover;"></a>
                    <div class="card-body text-center">
                        <h5 class="card-title" style="text-align: start; font-size: 20px;">${MangaDom1.BookName}</h5>
                    </div>
                    <h4 style="text-align: start; padding-bottom: 10px;"><strong>&#3647;${MangaDom1.BookPrice}</strong></h4>
                    <button onclick="addToCart('${ID}', '${MangaDom1.BookID}'); addToOrder('${ID}', '${MangaDom1.BookID}')" class="btn btn-primary py-2 rounded-pill add-to-cart" data-bookid="${MangaDom1.BookID}" style="font-size: 15px; background-color: #007bff; border-color: #007bff;">
                        <strong><i class="bi-cart" style="padding-right: 10px;"></i>ใส่ตะกร้า</strong>
                    </button>
                </div>
            </div>
        `
    }
    htmlMangaData += '</div>';
    MangaDom.innerHTML = htmlMangaData;

    const BookDom1 = document.getElementById('BookData1');
    let htmlData1 = '<div class="row row-cols-1 row-cols-md-3 row-cols-lg-5 g-4">';

    const crimeBooks = response.data.filter(book => book.BookType === 'นิยาย' && book.SubType === 'Crime');

    for (let i = 0; i < 5 && i < crimeBooks.length; i++) {
        let Books1Dom = crimeBooks[i];    
        htmlData1 += `
            <div class="col">
                <div class="card h-100 border-0">
                     <a href="Detail.html?id=${ID || ''}&&bookid=${Books1Dom.BookID}"><img src="/picture/${Books1Dom.BookImage}" class="card-img-top" style="object-fit: cover;"></a>
                    <div class="card-body text-center">
                        <h5 class="card-title" style="text-align: start; font-size: 20px;">${Books1Dom.BookName}</h5>        
                    </div>
                    <h4 style="text-align: start; padding-bottom: 10px;"><strong>$${Books1Dom.BookPrice}</strong></h4>
                    <button onclick="addToCart('${ID}', '${Books1Dom.BookID}'); addToOrder('${ID}', '${Books1Dom.BookID}')" class="btn btn-primary py-2 rounded-pill add-to-cart" style="font-size: 15px; background-color: #007bff; border-color: #007bff;">
                        <strong><i class="bi-cart" style="padding-right: 10px;"></i>ใส่ตะกร้า</strong>
                    </button>
                </div>
            </div>
        `
    }
    htmlData1 += '</div>';
    BookDom1.innerHTML = htmlData1;

    const BookDom2 = document.getElementById('BookData2');
    let htmlData2 = '<div class="row row-cols-1 row-cols-md-3 row-cols-lg-5 g-4">';

    const FantasyBooks = response.data.filter(book => book.BookType === 'นิยาย' && book.SubType === 'Fantasy');

    for (let i = 0; i < 5 && i < FantasyBooks.length; i++) {
        let Books2Dom = FantasyBooks[i];    
        htmlData2 += `
            <div class="col">
                <div class="card h-100 border-0">
                    <a href="Detail.html?id=${ID || ''}&&bookid=${Books2Dom.BookID}"><img src="/picture/${Books2Dom.BookImage}" class="card-img-top" style="object-fit: cover;"></a>
                    <div class="card-body text-center">
                        <h5 class="card-title" style="text-align: start; font-size: 20px;">${Books2Dom.BookName}</h5>        
                    </div>
                    <h4 style="text-align: start; padding-bottom: 10px;"><strong>$${Books2Dom.BookPrice}</strong></h4>
                    <button onclick="addToCart('${ID}', '${Books2Dom.BookID}'); addToOrder('${ID}', '${Books2Dom.BookID}')" class="btn btn-primary py-2 rounded-pill" style="font-size: 15px; background-color: #007bff; border-color: #007bff;"">
                        <strong><i class="bi-cart" style="padding-right: 10px;"></i>ใส่ตะกร้า</strong>
                    </button>
                </div>
            </div>
        `
    }
    htmlData2 += '</div>';
    BookDom2.innerHTML =  htmlData2;

    const BookDom3 = document.getElementById('BookData3');
    let htmlData3 = '<div class="row row-cols-1 row-cols-md-3 row-cols-lg-5 g-4">';

    const LNBooks = response.data.filter(book => book.BookType === 'Light Novel');

    for (let i = 0; i < 5 && i < LNBooks.length; i++) {
        let Books3Dom = LNBooks[i];    
        htmlData3 += `
            <div class="col">
                <div class="card h-100 border-0">
                    <a href="Detail.html?id=${ID || ''}&&bookid=${Books3Dom.BookID}"><img src="/picture/${Books3Dom.BookImage}" class="card-img-top" style="object-fit: cover;"></a>
                    <div class="card-body text-center">
                        <h5 class="card-title" style="text-align: start; font-size: 20px;">${Books3Dom.BookName}</h5>        
                    </div>
                    <h4 style="text-align: start; padding-bottom: 10px;"><strong>$${Books3Dom.BookPrice}</strong></h4>
                    <button onclick="addToCart('${ID}', '${Books3Dom.BookID}'); addToOrder('${ID}', '${Books3Dom.BookID}')" class="btn btn-primary rounded-pill " style="font-size: 15px; background-color: #007bff; border-color: #007bff;">
                        <strong><i class="bi-cart" style="padding-right: 10px;"></i>ใส่ตะกร้า</strong>
                    </button>
                </div>
            </div>
        `
    }
    htmlData3 += '</div>';
    BookDom3.innerHTML = htmlData3;

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
window.onload = Bookie;

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


