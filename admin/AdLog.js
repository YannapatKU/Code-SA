const BASE_URL = 'http://localhost:3000';
let selectedCustomerID = '';

const Admin = async () => {
    console.log('Loading...');

    try {
        const response = await axios.get(`${BASE_URL}/customers`);
        const customers = response.data;
        const responses = await axios.get(`${BASE_URL}/admins`);
        console.log(responses.data);

        const urlParams = new URLSearchParams(window.location.search);
        const AdminID = urlParams.get('id');

        document.getElementById('mainNavbar').innerHTML = `
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">    
            <div class="container-fluid">
                <a class="navbar-brand" href="../main.html">
                    <img src="../picture/Neramit.webp" style="height: 65px; width: 100px;">
                </a>
            </div>
        </nav>`;

        document.getElementById('navbar').innerHTML = `
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark" style="margin-top: 2px;">    
            <div class="container-fluid">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" href="Admin.html?id=${AdminID || ''}"><h5>Home</h5></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="AdCheck.html?id=${AdminID || ''}"><h5>Check</h5></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="AdLog.html?id=${AdminID || ''}"><h5>Log</h5></a>
                    </li>
                </ul>
            </div>
        </nav>`;

        document.getElementById('Fixed').innerHTML = `
        <div class="container mt-4">
            <h3 class="text-center">Profile</h3>
            <div class="card p-4">
                <div class="mb-3">
                    <label class="form-label"><h6>ชื่อ/Name</h6></label>
                    <input type="text" id="Name" class="form-control">
                </div>
                <div class="mb-3">
                    <label class="form-label"><h6>อีเมล/Email</h6></label>
                    <input type="text" id="Email" class="form-control">
                </div>
                <div class="mb-3">
                    <label class="form-label"><h6>รหัสผ่าน/Password</h6></label>
                    <input type="text" id="Password" class="form-control">
                </div>
                <div class="mb-3">
                    <label class="form-label"><h6>ที่อยู่/Address</h6></label>
                    <input type="text" id="Address" class="form-control">
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <label class="form-label"><h6>จังหวัด/Province</h6></label>
                        <input type="text" id="Province" class="form-control">
                    </div>
                    <div class="col-md-6">
                        <label class="form-label"><h6>รหัสไปรษณีย์/Zipcode</h6></label>
                        <input type="text" id="Zipcode" class="form-control">
                    </div>
                </div>
                <div class="mb-3">
                    <label class="form-label"><h6>เบอร์โทรศัพท์/Phone</h6></label>
                    <input type="text" id="Phone" class="form-control">
                </div>
                <div class="d-flex justify-content-end">
                    <button class="btn btn-primary" onclick="updateCus()">แก้ไข</button>
                </div>
            </div>
        </div>`;

        let htmlAdminCheckData = `
        <div class="container-fluid mt-4">
            <table class="table table-dark table-striped">
                <thead>
                    <tr>
                        <th scope="col">No.</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Password</th>
                        <th scope="col">Address</th>
                        <th scope="col">Province</th>
                        <th scope="col">Zipcode</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>`;

        customers.forEach((customer) => {
            htmlAdminCheckData += `
            <tr>
                <th scope="row">${customer.ID}</th>
                <td>${customer.Name}</td>
                <td>${customer.Email}</td>
                <td>${customer.Password}</td>
                <td>${customer.Address}</td>
                <td>${customer.Province}</td>
                <td>${customer.Zipcode}</td>
                <td>${customer.Phone}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editCustomer(${customer.ID})">Edit</button>
                </td>
            </tr>`;
        });

        htmlAdminCheckData += `</tbody></table></div>`;
        document.getElementById('AdminLog').innerHTML = htmlAdminCheckData;
    } catch (error) {
        console.error('Error fetching customer data:', error);
    }
};

window.onload = Admin;

const editCustomer = async (customerID) => {
    try {
        const response = await axios.get(`${BASE_URL}/customers/${customerID}`);
        const customer = response.data;
        selectedCustomerID = customerID; 

        document.getElementById('Name').value = customer.Name;
        document.getElementById('Email').value = customer.Email;
        document.getElementById('Password').value = customer.Password;
        document.getElementById('Address').value = customer.Address;
        document.getElementById('Province').value = customer.Province;
        document.getElementById('Zipcode').value = customer.Zipcode;
        document.getElementById('Phone').value = customer.Phone;
    } catch (error) {
        console.error('Error fetching customer:', error);
        alert('ไม่สามารถดึงข้อมูลลูกค้าได้');
    }
};

const updateCus = async () => {
    if (!selectedCustomerID) {
        alert("กรุณาเลือกลูกค้าที่ต้องการแก้ไข");
        return;
    }

    const CusData = {
        Name: document.getElementById("Name").value,
        Email: document.getElementById("Email").value,
        Password: document.getElementById("Password").value,
        Address: document.getElementById("Address").value,
        Province: document.getElementById("Province").value,
        Zipcode: document.getElementById("Zipcode").value,
        Phone: document.getElementById("Phone").value,
    };

    try {
        await axios.put(`${BASE_URL}/customers/${selectedCustomerID}`, CusData);
        alert("อัปเดตข้อมูลสำเร็จ");
        Admin(); 
    } catch (error) {
        console.error("Error updating Customer:", error);
        alert("เกิดข้อผิดพลาดในการอัปเดตข้อมูล");
    }
};
