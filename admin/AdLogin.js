const BASE_URL = 'http://localhost:3000'
let mode = 'Detect' 
let selectedId = ''

window.onload = async () => {
    const urlParams = new URLSearchParams(window.location.search)
    const AdminID  = urlParams.get('ID')
    console.log('ID', AdminID)
    if (AdminID) {
        mode = 'EDIT'
        selectedId = AdminID 
        
        try {
           const response = await axios.get(`${BASE_URL}/admins/${AdminID}`)
           const inv = response.data
        
        let AdEmailDOM = document.querySelector('input[name=AdEmail]')
        let AdPasswordDOM = document.querySelector('input[name=AdPassword]')
        
        AdEmailDOM.value = inv.Email
        AdPasswordDOM.value = inv.Password	
       
        }catch (error){
            console.log('error',error)
        }

    }
}

const validateAdminCheck = (invData) => {
    let errors = []
   
    if (!invData.Email) {
        errors.push('กรุณากรอกอีเมล')
    }
    if (!invData.Password) {
        errors.push('กรุณากรอกรหัสผ่าน')
    }
   
   
    
    return errors
}

const AdminData = async () => {
   
    let AdEmailDOM = document.querySelector('input[name=AdEmail]')
    let AdPasswordDOM = document.querySelector('input[name=AdPassword]')
    let messageDOM = document.getElementById('message')

    try {
      console.log('check')
      let invData = {
        AdEmail: AdEmailDOM.value,
        AdPassword: AdPasswordDOM.value
        
      }  
      console.log('checkData', invData)

        let message = 'พบเจอข้อมูล'
        if (mode === 'Detect') {
            const response = await axios.get(`${BASE_URL}/admins`, invData)
            console.log('response',response.data)

            const foundAdmin = response.data.find(inv => inv.AdEmail === invData.AdEmail && inv.AdPassword === invData.AdPassword)

            if (foundAdmin) {
                let AdminID = foundAdmin.AdminID;
                message = 'พบเจอข้อมูล'
                window.location.href = `Admin.html?id=${AdminID}`;
                return
            } else {
                message = 'ไม่พบข้อมูลผู้ใช้หรือรหัสผ่านไม่ถูกต้อง'
                messageDOM.className = 'message danger'
            }
            
        } else {
            message = 'แก้ไขข้อมูลสำเร็จ'
            console.log('response',response.data)
            
        }
        messageDOM.innerHTML = message
        messageDOM.className = 'message success'
    }catch (error) {
        console.log('error',error.message)
        console.log('error',error.errors)

        if (error.response) {
            console.log(error.response)
            error.message = error.response.data.message
            error.errors = error.response.data.errors
          }
          let htmlData ='<div>'
          htmlData += `<div>${error.message}</div>`
          for (let i = 0; i < error.errors.length; i++) {
          htmlData += `<li>${error.errors[i]}</li>`
          }
          htmlData += '</div>'
      
      
          messageDOM.innerHTML = htmlData
          messageDOM.className = 'message danger'  
    }
   
}