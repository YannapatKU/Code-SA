const BASE_URL = 'http://localhost:3000';

const loadCart = async () => {
  console.log('Loading cart...');

  const urlParams = new URLSearchParams(window.location.search);
  const CusID = urlParams.get('id');

const MainNavbarDom = document.getElementById('mainNavbar')
    let htmlMainNavData = `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">    
      <div class="container-fluid">
        <a class="navbar-brand" href="main.html?id=${CusID || ''}">
          <img src="picture/Neramit.webp" style="height: 65px; width: 100px;">
        </a>
        <ul class="navbar-nav navbar-right">
            <li><a href="Cart.html?id=${CusID || ''}""><i class="bi bi-cart" style='font-size:22px; padding-right: 15px; color: gray;'></i></a></li>`

if (CusID) {
    htmlMainNavData += `<li><a href="Profile.html?id=${CusID || ''}"><i class="bi bi-person-circle" style='font-size:36px;color: gray;'></i></a></li>`
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
            <a class="nav-link" href="main.html?id=${CusID || ''}" ><h5>Home</h5></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="Manga.html?id=${CusID || ''}"><h5>Manga</h5></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="Crime.html?id=${CusID || ''}"><h5>นิยายสืบสวน</h5></a>
          </li>
          <li class="nav-item">
              <a class="nav-link" href="Fantasy.html?id=${CusID || ''}"><h5>แฟนตาซี</h5></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="LN.html?id=${CusID || ''}"><h5>Light Novel</h5></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="Yaoi.html?id=${CusID || ''}"><h5>Yaoi</h5></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="Yuri.html?id=${CusID || ''}"><h5>Yuri</h5></a>
          </li>
        </ul>
      </div>
  </nav>
    `
    htmlNavData += '</div>'
    NavbarDom.innerHTML = htmlNavData
  
  if (!CusID) {
      alert('กรุณาเข้าสู่ระบบเพื่อดูตะกร้าสินค้า');
      window.location.href = 'Login.html';
      return;
  }

  try {
      const response = await axios.get(`${BASE_URL}/cart/${CusID}`);
      console.log(response.data);

      const CartDom = document.getElementById('CartData');
      let htmlData = '';

      if (!response.data.data || response.data.data.length === 0) {
          htmlData = `<p class="text-center">ไม่มีสินค้าในตะกร้า</p>`;
      } else {
          htmlData = `<table class="table">
              <thead>
                  <tr>
                      <th>รูปภาพ</th>
                      <th>สินค้า</th>
                      <th>จำนวน</th>
                      <th>ราคา</th>
                      <th>รวม</th>
                      <th>ลบ</th>
                  </tr>
              </thead>
              <tbody>`;

          let totalPrice = 0;


          response.data.data.forEach(item => {  
              const itemTotal = item.TotalQuantity * item.BookPrice;
              totalPrice += itemTotal;

              htmlData += `
              <tr>
                  <td><img src="./picture/${item.BookImage}" style="height: 100px;"></td>
                  <td>${item.BookName}</td>
                  <td>
                      
                      <span>${item.TotalQuantity}</span>
                      
                  </td>
                  <td>&#3647;${item.BookPrice}</td>
                  <td>&#3647;${itemTotal}</td>
                  <td><button class="btn btn-danger btn-sm" onclick="removeFromCart('${CusID}', '${item.BID}'); removeFromOrder('${CusID}', '${item.BID}')" data-book-id="${item.BID}">ลบ</button></td>
              </tr>`;
          });

          htmlData += `</tbody></table>
          <h4 class="text-end">รวมทั้งหมด: &#3647;${totalPrice}</h4>
          <button class="btn btn-success w-100" onclick="checkout()">สั่งซื้อ</button>`;
      }

      CartDom.innerHTML = htmlData;

      

  } catch (error) {
      console.error('Error loading cart:', error);
  }



};

window.onload = loadCart;

const removeFromCart = async (CusID, BID) => {
  try {
      console.log('Removing from cart:', CusID, BID);
      const response = await axios.delete(`${BASE_URL}/cart/${CusID}/${BID}`);

      alert('ลบสินค้าออกจากตะกร้าสำเร็จ!');
      console.log(response.data);
      loadCart();
  } catch (error) {
      console.error('เกิดข้อผิดพลาดในการลบสินค้า:', error);
      alert('ไม่สามารถลบสินค้าได้');
  }
};

const removeFromOrder = async (CusID, BID) => {
  try {
      console.log('Removing from orders:', CusID, BID);
      const response = await axios.delete(`${BASE_URL}/orders/${CusID}/${BID}`);

      alert('ลบสินค้าออกจากตะกร้าสำเร็จ!');
      console.log(response.data);
      loadCart();
  } catch (error) {
      console.error('เกิดข้อผิดพลาดในการลบสินค้า:', error);
  }
}

const checkout = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const CusID = urlParams.get('id');

    if (!CusID) {
        alert("ไม่พบข้อมูลลูกค้า");
        return;
    }

    try {
        const response = await axios.post(`${BASE_URL}/checkout`, { CusID });

        if (response.data.message) {
            alert(response.data.message); // แสดงข้อความจาก API
        }

        // รีเฟรชหน้าหลังจากชำระเงินสำเร็จ
        window.location.reload();
    } catch (error) {
        console.error('Error during checkout:', error);
        alert("เกิดข้อผิดพลาดในการสั่งซื้อ");
    }
};




