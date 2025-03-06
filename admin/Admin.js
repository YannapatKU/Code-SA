const BASE_URL = 'http://localhost:3000'

const Admin = async () => {
console.log('Loading')
        
    const response = await axios.get(`${BASE_URL}/admins`)
    console.log(response.data)

    const urlParams = new URLSearchParams(window.location.search);
    const AdminID = urlParams.get('id');

    const MainNavbarDom = document.getElementById('mainNavbar')
    let htmlMainNavData = 
    `<nav class="navbar navbar-expand-lg navbar-dark bg-dark">    
        <div class="container-fluid">
        <a class="navbar-brand" href="../main.html">
            <img src="../picture/Neramit.webp" style="height: 65px; width: 100px;">
        </a>`

    htmlMainNavData += `</div></nav>`
    MainNavbarDom.innerHTML = htmlMainNavData;

    const NavbarDom = document.getElementById('navbar')
    let htmlNavData = '<nav class="navbar navbar-expand-lg navbar-dark bg-dark" style="margin-top: 2px;">'    
        htmlNavData += `
 
    <div class="container-fluid">
       
        <ul class="navbar-nav">
          <li class="nav-item active list-inline-item">
              <a class="nav-link" href="Admin.html?id=${AdminID || ''}" ><h5>Home</h5></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="AdCheck.html?id=${AdminID || ''}"><h5>Check</h5></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="AdLog.html?id=${AdminID || ''}"><h5>Log</h5></a>
            </li>
        </ul>
      </div>
  </nav>`
    htmlNavData += '</div>'
    NavbarDom.innerHTML = htmlNavData

    const AdminProDom = document.getElementById('AdminProfile')
    if (AdminID) {
        try {
            const response = await axios.get(`${BASE_URL}/admins/${AdminID}`);
            const adminData = response.data;

            let htmlAdminProData = `
            <div class="container mt-4">
                <h3 class="text-center">Admin Profile</h3>
                <div class="card p-4">
                    <div class="mb-3">
                        <label class="form-label"><h6>ชื่อ/Name</h6></label>
                        <input type="text" id="adminName" class="form-control" value="${adminData.AdName}" placeholder="กรอกชื่อ">
                    </div>


                    <div class="d-flex justify-content-end">
                        <button class="btn btn-primary" style="width: 10%; height: 32px;" onclick="updateAdmin()">แก้ไข</button>
                        <button class="btn btn-danger" style="width: 10%; height: 32px;" onclick="window.location.href='../main.html'">Logout</button>
                    </div>
                </div>
            </div>`;

            AdminProDom.innerHTML = htmlAdminProData;

        } catch (error) {
            console.log('Error fetching admin data:', error);
            AdminProDom.innerHTML = `<p class="text-danger text-center">ไม่สามารถโหลดข้อมูลแอดมินได้</p>`;
        }
    } else {
        AdminProDom.innerHTML = `<p class="text-danger text-center">ไม่พบข้อมูลแอดมิน</p>`;
    }

    
}

window.onload = Admin;

const updateAdmin = async () => {
    const adminNameDOM = document.getElementById('adminName');
    const urlParams = new URLSearchParams(window.location.search);
    const AdminID = urlParams.get('id');

    if (!AdminID) {
        alert('ไม่พบ ID ของแอดมิน');
        return;
    }

    let AdminData = {
        AdName: adminNameDOM.value, 
    };

    try {
        const response = await axios.put(`${BASE_URL}/admins/${AdminID}`, AdminData);
        console.log('Updated Admin:', response.data);

        alert('แก้ไขข้อมูลสำเร็จ');
        window.location.href = `Admin.html?id=${AdminID}`;
    } catch (error) {
        console.error('Error updating admin:', error);
        alert('เกิดข้อผิดพลาดในการอัปเดตข้อมูล');
    }
};
