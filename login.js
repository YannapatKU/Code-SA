const BASE_URL = 'http://localhost:3000'
let mode = 'Detect'
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


            let EmailDOM = document.querySelector('input[name=Email]')
            let PasswordDOM = document.querySelector('input[name=Password]')


            EmailDOM.value = inv.Email
            PasswordDOM.value = inv.Password


            

        } catch (error) {
            console.log('error', error)
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
                <li><a href="Cart.html"><i class="bi bi-cart" style='font-size:22px; padding-right: 15px; color: gray;'></i></a></li>`

            if (ID) {
                htmlMainNavData += `<li><a href="Profile.html"><i class="bi bi-person-circle" style='font-size:36px;color: gray;'></i></a></li>`
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
                <a class="nav-link" href="main.html" ><h5>Home</h5></a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="Manga.html"><h5>Manga</h5></a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="Crime.html"><h5>นิยายสืบสวน</h5></a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="Fantasy.html"><h5>แฟนตาซี</h5></a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="LN.html"><h5>Light Novel</h5></a>
            </li>
            <li class="nav-item">
                 <a class="nav-link" href="Yaoi.html"><h5>Yaoi</h5></a>
            </li>
            <li class="nav-item">
        <a class="nav-link" href="Yuri.html"><h5>Yuri</h5></a>
      </li>
    </ul>
  </div>
</nav>
`
            htmlNavData += '</div>'
            NavbarDom.innerHTML = htmlNavData
}



const validateCheck = (invData) => {
    let errors = []

    if (!invData.Email) {
        errors.push('กรุณากรอกอีเมล')
    }
    if (!invData.Password) {
        errors.push('กรุณากรอกรหัสผ่าน')
    }



    return errors
}

const checkData = async () => {

    let EmailDOM = document.querySelector('input[name=Email]')
    let PasswordDOM = document.querySelector('input[name=Password]')
    let messageDOM = document.getElementById('message')

    try {
        console.log('check')
        let invData = {
            Email: EmailDOM.value,
            Password: PasswordDOM.value,

        }
        console.log('checkData', invData)

        let message = 'พบเจอข้อมูล'
        if (mode === 'Detect') {
            const response = await axios.get(`${BASE_URL}/customers`, invData)
            console.log('response', response.data)

            const foundCustomer = response.data.find(inv => inv.Email === invData.Email && inv.Password === invData.Password)

            if (foundCustomer) {
                let ID = foundCustomer.ID;
                message = 'พบเจอข้อมูล'
                window.location.href = `main.html?id=${ID}`;
                return
            } else {
                message = 'ไม่พบข้อมูลผู้ใช้หรือรหัสผ่านไม่ถูกต้อง'
                messageDOM.className = 'message danger'
            }

        } else {
            message = 'แก้ไขข้อมูลสำเร็จ'
            console.log('response', response.data)

        }
        messageDOM.innerHTML = message
        messageDOM.className = 'message success'
    } catch (error) {
        console.log('error', error.message)
        console.log('error', error.errors)

        if (error.response) {
            console.log(error.response)
            error.message = error.response.data.message
            error.errors = error.response.data.errors
        }
        let htmlData = '<div>'
        htmlData += `<div>${error.message}</div>`
        for (let i = 0; i < error.errors.length; i++) {
            htmlData += `<li>${error.errors[i]}</li>`
        }
        htmlData += '</div>'


        messageDOM.innerHTML = htmlData
        messageDOM.className = 'message danger'
    }

}


