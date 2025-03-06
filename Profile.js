const BASE_URL = 'http://localhost:3000'

const ProCust = async () => {
console.log('Loading')
        
    const response = await axios.get(`${BASE_URL}/customers`)
    console.log(response.data)

    const urlParams = new URLSearchParams(window.location.search);
    const ID = urlParams.get('id');

   

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


    const ProDom = document.getElementById('ProfileData')
    if (ID) {
        try {
            const response = await axios.get(`${BASE_URL}/customers/${ID}`);
            const ProfileData = response.data;

            let htmlCusProData = `
            <div class="container mt-4">
                <h3 class="text-center">Profile</h3>
                <div class="card p-4">
                    <div class="mb-3">
                        <label class="form-label"><h6>ชื่อ/Name</h6></label>
                        <input type="text" id="Name" class="form-control" style="height: 35px; font-size: 15px;" value="${ProfileData.Name}">
                    </div>
                    <div class="mb-3">
                        <label class="form-label"><h6>ที่อยู่</h6></label>
                        <input type="text" id="Address" class="form-control" style="height: 35px; font-size: 15px;" value="${ProfileData.Address}">
                    </div>
                    <div class="row">
                    <div class="col-md-6">
                        <label class="form-label"><h6>จังหวัด/Province</h6></label>
                        <input type="text" id="Province" class="form-control" style="height: 35px; font-size: 15px;" value="${ProfileData.Province}">
                    </div>

                    <div class="col-md-6">
                        <label class="form-label"><h6>รหัสไปรษณีย์/Zipcode</h6></label>
                        <input type="text" id="Zipcode" class="form-control" style="height: 35px; font-size: 15px;" minlength="0" maxlength="5" value="${ProfileData.Zipcode}">
                    </div>

                    <div class="mb-3" style="margin-top: 10px;">
                        <label class="form-label"><h6>เบอร์โทรศัพท์/Phone</h6></label>
                        <input type="text" id="Phone" class="form-control" style="height: 35px; font-size: 15px;" value="${ProfileData.Phone}">
            </div>

                    <div class="d-flex justify-content-end">
                        <button class="btn btn-primary" style="width: 10%; height: 32px; margin-right: 15px;" onclick="updateCus()">แก้ไข</button>
                        <button class="btn btn-danger" style="width: 10%; height: 32px;" onclick="window.location.href='main.html'">Logout</button>
                    </div>
                </div>
            </div>`;

            ProDom.innerHTML = htmlCusProData;

        } catch (error) {
            console.log('Error fetching admin data:', error);
            ProDom.innerHTML = `<p class="text-danger text-center">ไม่สามารถโหลดข้อมูลผู้ใช้ได้</p>`;
        }
    } else {
       ProDom.innerHTML = `<p class="text-danger text-center">ไม่พบข้อมูลผู้ใช้</p>`;
    }

    
}

window.onload = ProCust;

const updateCus = async () => {
    const NameDOM = document.getElementById('Name');
    const AddressDOM = document.getElementById('Address');
    const ProvinceDOM = document.getElementById('Province');
    const ZipcodeDOM = document.getElementById('Zipcode');
    const PhoneDOM = document.getElementById('Phone');
    const urlParams = new URLSearchParams(window.location.search);
    const ID = urlParams.get('id');

    if (!ID) {
        alert('ไม่พบ ID ของผู้ใช้');
        return;
    }

    let CusData = {
        Name: NameDOM.value,
        Address: AddressDOM.value,
        Province: ProvinceDOM.value,
        Zipcode: ZipcodeDOM.value,
        Phone: PhoneDOM.value, 
    };

    try {
        const response = await axios.put(`${BASE_URL}/customers/${ID}`, CusData);
        console.log('Updated Customer:', response.data);

        alert('แก้ไขข้อมูลสำเร็จ');
        window.location.href = `Profile.html?id=${ID}`;
    } catch (error) {
        console.error('Error updating Customer:', error);
        alert('เกิดข้อผิดพลาดในการอัปเดตข้อมูล');
    }
};
