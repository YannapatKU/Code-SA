const BASE_URL = 'http://localhost:3000'
let mode = 'CREATE' 
let selectedId = ''

window.onload = async () => {
    const urlParams = new URLSearchParams(window.location.search)
    const ID = urlParams.get('ID')
    console.log('ID', ID)
    if (ID) {
        mode = 'EDIT'
        selectedId = ID
        
        try {
           const response = await axios.get(`${BASE_URL}/customers/${ID}`)
           const inv = response.data
        
        let NameDOM = document.querySelector('input[name=Name]')
        let EmailDOM = document.querySelector('input[name=Email]')
        let PasswordDOM = document.querySelector('input[name=Password]')
        let AddressDOM = document.querySelector('input[name=Address]')
        let ProvinceDom = document.querySelector('input[name=Province]')
        let ZipcodeDOM = document.querySelector('input[name=Zipcode]')
        let PhoneDOM = document.querySelector('input[name=Phone]')

        NameDOM.value = inv.Name
        EmailDOM.value = inv.Email
        PasswordDOM.value = inv.Password	
        AddressDOM.value = inv.Address
        ProvinceDom.value = inv.Province	
        ZipcodeDOM.value = inv.Zipcode
        PhoneDOM.value = inv.Phone
        

        }catch (error){
            console.log('error',error)
        }
         
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
}

const validateData = (invData) => {
    let errors = []
    if (!invData.Name) {
        errors.push('กรุณากรอกชื่อ')
    }
    if (!invData.Email) {
        errors.push('กรุณากรอกอีเมล')
    }
    if (!invData.Password) {
        errors.push('กรุณากรอกรหัสผ่าน')
    }
    if (!invData.Address) {
        errors.push('กรุณากรอกที่อยู่')
    }
    if (!invData.Province) {
        errors.push('กรุณากรอกจังหวัด')
    }
    if (!invData.Zipcode) {
        errors.push('กรุณากรอกรหัสไปรษณีย์')
    }
    if (!invData.Phone) {
        errors.push('กรุณากรอกเบอร์')
    }
   
    
    return errors
}

const registerUser = async () => {
    let NameDOM = document.querySelector('input[name=Name]');
    let EmailDOM = document.querySelector('input[name=Email]');
    let PasswordDOM = document.querySelector('input[name=Password]');
    let AddressDOM = document.querySelector('input[name=Address]');
    let ProvinceDOM = document.querySelector('input[name=Province]');
    let ZipcodeDOM = document.querySelector('input[name=Zipcode]');
    let PhoneDOM = document.querySelector('input[name=Phone]');
    let messageDOM = document.getElementById('message');

    try {
        let userData = {
            Name: NameDOM.value,
            Email: EmailDOM.value,
            Password: PasswordDOM.value,
            Address: AddressDOM.value,
            Province: ProvinceDOM.value,
            Zipcode: ZipcodeDOM.value,
            Phone: PhoneDOM.value
        };
        
        console.log('Registering user:', userData);
        
        await axios.post(`${BASE_URL}/customers`, userData);
        
        messageDOM.innerHTML = 'ลงทะเบียนสำเร็จ! กำลังนำไปยังหน้าล็อกอิน...';
        messageDOM.className = 'message success';
        
        // Redirect to login page after successful registration
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 10);
    } catch (error) {
        console.error('Error:', error);
        
        let errorMessage = 'เกิดข้อผิดพลาดในการลงทะเบียน';
        if (error.response) {
            errorMessage = error.response.data.message;
        }
        
        messageDOM.innerHTML = errorMessage;
        messageDOM.className = 'message danger';
    }
};



