const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise')
const app = express();
const cors = require('cors');
const nodemailer = require('nodemailer');

app.use(bodyParser.json());
app.use(cors());

const port = 3000;

let customs = []
let counter = 1;

let conn = null
const initMySQL = async () => {
 conn = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'bookstore',
    port: 5000
  })
}

const validateData = (CusData) => {
  let errors = []
    if (!CusData.Name) {
        errors.push('กรุณากรอกชื่อ')
    }
    if (!CusData.Email) {
        errors.push('กรุณากรอกอีเมล')
    }
    if (!CusData.Password) {
        errors.push('กรุณากรอกรหัสผ่าน')
    }
    if (!CusData.Address) {
        errors.push('กรุณากรอกที่อยู่')
    }
    if (!CusData.Province) {
        errors.push('กรุณากรอกจังหวัด')
    }
    if (!CusData.Zipcode) {
        errors.push('กรุณากรอกรหัสไปรษณีย์')
    }
    if (!CusData.Phone) {
        errors.push('กรุณากรอกเบอร์')
    }
   
    
    return errors
}

app.get('/customers', async(req, res) => {
  const results = await conn.query('SELECT * FROM customers')
  res.json(results[0])
})

app.get('/customers/:ID', async(req, res) => {
  try{
    let ID = req.params.ID
    console.log('ID',ID)
    const results = await conn.query('SELECT * FROM customers WHERE ID = ?', ID)
    if (results[0].length === 0) {
      throw { statusCode: 404,message: 'ไม่พบข้อมูล'
      }
    } 
    res.json(results[0][0])
  }catch (error){
    console.log('errorMessage',error.message)
    let statusCode = error.statusCode || 500
    res.status(statusCode).json({
      message: error.message
    })
  }
})

app.post('/customers', async(req, res) => {
  try{
    let customer = req.body;
    const errors = validateData(customer)
    if (errors.length > 0) {
      throw {
        message: 'กรอกข้อมูลไม่ครบ',
        errors: errors
      }
    }
    const results = await conn.query('INSERT INTO customers SET ?', customer)
    res.json({
      message: 'สำเร็จ',
      data:results[0]
    })
  }catch (error){
    const errorMessage = error.errors || 'something went wrong'
    const errors = error.errors || []
    console.log('errorMessage',error.message)
    res.status(500).json({
      message: errorMessage,
      errors: errors
    })
  }
})



app.put('/customers/:ID', async(req, res) => {
  try{
    let ID = req.params.ID;
    let updateCustomer = req.body;
    const results = await conn.query('UPDATE customers SET ? WHERE ID = ?', [updateCustomer, ID])
    res.json({
      message: 'แก้ไขข้อมูลสำเร็จ',
      data: results[0]
    })
  } catch (error){
    console.log('errorMessage',error.message)
    res.status(500).json({
      message: 'บางอย่างผิดพลาด'
    })
  }
})

app.delete('/customers/:ID', async(req, res) => {
  try{
    let ID = req.params.ID;
    const results = await conn.query('DELETE FROM customers WHERE ID = ?', ID)
    res.json({
      message: 'ลบข้อมูลสำเร็จ',
      data: results[0]
    })
  }catch (error){
    console.log('errorMessage',error.message)
    res.status(500).json({
      message: 'บางอย่างผิดพลาด'
    })
  }
})

const validateAdmin = (ADData) => {
  let errors = []
    if (!ADData.Name) {
        errors.push('กรุณากรอกชื่อ')
    }
    if (!ADData.Email) {
        errors.push('กรุณากรอกอีเมล')
    }
    if (!ADData.Password) {
        errors.push('กรุณากรอกรหัสผ่าน')
    }
   
    return errors
}

app.get('/admins', async(req, res) => {
  const results = await conn.query('SELECT * FROM admins')
  res.json(results[0])
})

app.get('/admins/:AdminID', async(req, res) => {
  try{
    let ID = req.params.AdminID
    console.log('ID',ID)
    const results = await conn.query('SELECT * FROM admins WHERE AdminID = ?', ID)
    if (results[0].length === 0) {
      throw { statusCode: 404,message: 'ไม่พบข้อมูล'
      }
    } 
    res.json(results[0][0])
  }catch (error){
    console.log('errorMessage',error.message)
    let statusCode = error.statusCode || 500
    res.status(statusCode).json({
      message: error.message
    })
  }
})

app.post('/admins', async(req, res) => {
  try{
    let admin = req.body;
    const errors = validateAdmin(admin)
    if (errors.length > 0) {
      throw {
        message: 'กรอกข้อมูลไม่ครบ',
        errors: errors
      }
    }
    const results = await conn.query('INSERT INTO admins SET ?', admin)
    res.json({
      message: 'สำเร็จ',
      data:results[0]
    })
  }catch (error){
    const errorMessage = error.errors || 'something went wrong'
    const errors = error.errors || []
    console.log('errorMessage',error.message)
    res.status(500).json({
      message: errorMessage,
      errors: errors
    })
  }
})


app.put('/admins/:AdminID', async(req, res) => {
  try{
    let ID = req.params.AdminID;
    let updateAdmin = req.body;
    const results = await conn.query('UPDATE admins SET ? WHERE AdminID = ?', [updateAdmin, ID])
    res.json({
      message: 'แก้ไขข้อมูลสำเร็จ',
      data: results[0]
    })
  } catch (error){
    console.log('errorMessage',error.message)
    res.status(500).json({
      message: 'บางอย่างผิดพลาด'
    })
  }
})

app.delete('/admins/:AdminID', async(req, res) => {
  try{
    let ID = req.params.AdminID;
    const results = await conn.query('DELETE FROM admins WHERE AdminID = ?', ID)
    res.json({
      message: 'ลบข้อมูลสำเร็จ',
      data: results[0]
    })
  }catch (error){
    console.log('errorMessage',error.message)
    res.status(500).json({
      message: 'บางอย่างผิดพลาด'
    })
  }
})

const validateBook = (BKData) => {
  let errors = []
    if (!BKData.BookID) {
        errors.push('กรุณากรอกชื่อหนังสือ')
    }
    if (!BKData.BookName) {
        errors.push('กรุณากรอกชื่อหนังสือ')
    }
    if (!BKData.Quantity) {
        errors.push('กรุณากรอกจำนวน')
    }
    if (!BKData.Type) {
        errors.push('กรุณากรอกประเภท')
    }
    if (!BKData.SubType) {
        errors.push('กรุณากรอกประเภทย่อย')
    }
    if (!BKData.CheckIN) {
        errors.push('กรุณากรอกวันที่เข้า')
    }
    if (!BKData.Description) {
        errors.push('กรุณากรอกคำอธิบาย')
    }
    if (!BKData.BookPrice) {
        errors.push('กรุณากรอกราคา')
    }
    if (!BKData.BookImage) {
        errors.push('กรุณาเลือกรูปภาพ')
    }
    
   
    return errors
}


app.get('/book', async(req, res) => {
  const results = await conn.query('SELECT * FROM book')
  res.json(results[0])
})

app.get('/book/:BookID', async(req, res) => {
  try{
    let ID = req.params.BookID
    console.log('ID',ID)
    const results = await conn.query('SELECT * FROM book WHERE BookID = ?', ID)
    if (results[0].length === 0) {
      throw { statusCode: 404,message: 'ไม่พบข้อมูล'
      }
    } 
    res.json(results[0][0])
  }catch (error){
    console.log('errorMessage',error.message)
    let statusCode = error.statusCode || 500
    res.status(statusCode).json({
      message: error.message
    })
  }
})

app.post('/book', async(req, res) => {
  try{
    let books = req.body;
    const errors = validateBook(books)
    if (errors.length > 0) {
      throw {
        message: 'กรอกข้อมูลไม่ครบ',
        errors: errors
      }
    }
    const results = await conn.query('INSERT INTO book SET ?', books)
    res.json({
      message: 'สำเร็จ',
      data:results[0]
    })
  }catch (error){
    const errorMessage = error.errors || 'something went wrong'
    const errors = error.errors || []
    console.log('errorMessage',error.message)
    res.status(500).json({
      message: errorMessage,
      errors: errors
    })
  }
})

app.put('/book/:BookID', async(req, res) => {
  try{
    let ID = req.params.BookID;
    let updateBook = req.body;
    const results = await conn.query('UPDATE book SET ? WHERE AdminID = ?', [updateBook, ID])
    res.json({
      message: 'แก้ไขข้อมูลสำเร็จ',
      data: results[0]
    })
  } catch (error){
    console.log('errorMessage',error.message)
    res.status(500).json({
      message: 'บางอย่างผิดพลาด'
    })
  }
})

app.delete('/book/:BookID', async(req, res) => {
  try{
    let ID = req.params.BookID;
    const results = await conn.query('DELETE FROM book WHERE BookID = ?', ID)
    res.json({
      message: 'ลบข้อมูลสำเร็จ',
      data: results[0]
    })
  }catch (error){
    console.log('errorMessage',error.message)
    res.status(500).json({
      message: 'บางอย่างผิดพลาด'
    })
  }
})


app.get('/cart', async(req, res) => {
  const results = await conn.query('SELECT * FROM cart')
  console.log('results',results[0])
  res.json(results[0])
})


app.get('/cart/:ID', async (req, res) => {
  try {
      let ID = req.params.ID;
      console.log('ID:', ID);

      const [results] = await conn.query(
          `SELECT book.BookName, book.BookImage, book.BookPrice, cart.TotalQuantity, cart.BID
           FROM cart 
           JOIN book ON cart.BID = book.BookID 
           WHERE cart.CusID = ?`, 
          [ID] 
      );

      if (results.length === 0) {
          return res.status(404).json({ message: 'ไม่พบข้อมูล' });
      }

      res.json({ message: 'ดึงข้อมูลสำเร็จ', data: results }); 
  } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ message: 'เกิดข้อผิดพลาด', error: error.message });
  }
});


app.post('/cart', async (req, res) => {
  try {
    const { CusID, BID, TotalQuantity } = req.body; 

    if (!CusID || !BID || !TotalQuantity) {
      return res.status(400).json({ message: 'กรุณากรอกข้อมูลให้ครบถ้วน' });
    }

    const sql = 'INSERT INTO cart (CusID, BID, TotalQuantity) VALUES (?, ?, ?)';
    const values = [CusID, BID, TotalQuantity];

    const [result] = await conn.query(sql, values);

    res.json({
      message: 'เพิ่มสินค้าลงตะกร้าสำเร็จ',
      cartID: result.insertId,
    });
  } catch (error) {
    console.error('เกิดข้อผิดพลาด:', error.message);
    res.status(500).json({
      message: 'เกิดข้อผิดพลาดในการเพิ่มสินค้า',
      error: error.message,
    });
  }
});

app.delete('/cart/:CusID/:BID', async (req, res) => {
  try {
    let BID = req.params.BID
    let CusID = req.params.CusID
    const results = await conn.query('DELETE FROM cart WHERE CusID = ? AND BID = ?',[CusID,BID ])
    res.json({
      message: 'ลบข้อมูลสำเร็จ',
      data: results[0]
    })
  }catch (error){
    console.log('errorMessage',error.message)
    res.status(500).json({
      message: 'บางอย่างผิดพลาด'
    })
}
});

app.get('/orders', async(req, res) => {
  const results = await conn.query('SELECT * FROM orders')
  res.json(results[0])
});

app.get('/orders/:OrderID', async(req, res) => {
  try{
    let ID = req.params.BookID
    console.log('ID',ID)
    const results = await conn.query('SELECT * FROM orders WHERE OrderID = ?', ID)
    if (results[0].length === 0) {
      throw { statusCode: 404,message: 'ไม่พบข้อมูล'
      }
    } 
    res.json(results[0][0])
  }catch (error){
    console.log('errorMessage',error.message)
    let statusCode = error.statusCode || 500
    res.status(statusCode).json({
      message: error.message
    })
  }
});

app.post('/orders', async(req, res) => {
  try {
    const { CusID, BID, TotalQuantity } = req.body; 

    if (!CusID || !BID || !TotalQuantity) {
      return res.status(400).json({ message: 'กรุณากรอกข้อมูลให้ครบถ้วน' });
    }

    const sql = 'INSERT INTO orders (CusID, BID, TotalQuantity) VALUES (?, ?, ?)';
    const values = [CusID, BID, TotalQuantity];

    const [result] = await conn.query(sql, values);

    res.json({
      message: 'เพิ่มสินค้าลงตะกร้าสำเร็จ',
      cartID: result.insertId,
    });
  } catch (error) {
    console.error('เกิดข้อผิดพลาด:', error.message);
    res.status(500).json({
      message: 'เกิดข้อผิดพลาดในการเพิ่มสินค้า',
      error: error.message,
    });
  }
});

app.delete('/orders/:CusID/:BID', async (req, res) => {
  try {
    let BID = req.params.BID
    let CusID = req.params.CusID
    const results = await conn.query('DELETE FROM orders WHERE CusID = ? AND BID = ?',[CusID,BID ])
    res.json({
      message: 'ลบข้อมูลสำเร็จ',
      data: results[0]
    })
  }catch (error){
    console.log('errorMessage',error.message)
    res.status(500).json({
      message: 'บางอย่างผิดพลาด'
    })
}
});

app.post('/checkout', async (req, res) => {
  try {
    const { CusID } = req.body;

    if (!CusID) {
      return res.status(400).json({ message: 'ข้อมูลไม่ครบถ้วน' });
    }

    // ดึงสินค้าทั้งหมดจากตะกร้า
    const [cartItems] = await conn.query('SELECT BID, TotalQuantity FROM cart WHERE CusID = ?', [CusID]);

    if (cartItems.length === 0) {
      return res.status(400).json({ message: 'ไม่มีสินค้าในตะกร้า' });
    }

    // ตรวจสอบว่ามีออเดอร์อยู่หรือไม่
    const [existingOrders] = await conn.query('SELECT OrderID FROM orders WHERE CusID = ? AND OrderStat = "Not Paid"', [CusID]);

    if (existingOrders.length === 0) {
      return res.status(400).json({ message: 'ไม่มีออเดอร์ที่รอชำระ' });
    }

    // อัปเดตสถานะ OrderStat เป็น 'Paid'
    await conn.query('UPDATE orders SET OrderStat = "Paid" WHERE CusID = ? AND OrderStat = "Not Paid"', [CusID]);

    // ลบข้อมูลจาก cart
    await conn.query('DELETE FROM cart WHERE CusID = ?', [CusID]);

    res.json({ message: 'สั่งซื้อสำเร็จ และอัปเดตสถานะเป็น Paid' });
  } catch (error) {
    console.error('Error during checkout:', error.message);
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการสั่งซื้อ' });
  }
});


// app.post('/checkout', async (req, res) => {
//   try {
//       const { CusID } = req.body;

//       if (!CusID) {
//           return res.status(400).json({ message: 'ข้อมูลไม่ครบถ้วน' });
//       }

      
//       const [cartItems] = await conn.query('SELECT BID, TotalQuantity FROM cart WHERE CusID = ?', [CusID]);

//       if (cartItems.length === 0) {
//           return res.status(400).json({ message: 'ไม่มีสินค้าในตะกร้า' });
//       }

      
//       for (let item of cartItems) {
//           await conn.query('INSERT INTO orders (CusID, BID, TotalQuantity) VALUES (?, ?, ?)', 
//               [CusID, item.BID, item.TotalQuantity]);
//       }

      
//       await conn.query('DELETE FROM cart WHERE CusID = ?', [CusID]);

//       res.json({ message: 'สั่งซื้อสำเร็จ' });
//   } catch (error) {
//       console.error('Error during checkout:', error.message);
//       res.status(500).json({ message: 'เกิดข้อผิดพลาดในการสั่งซื้อ' });
//   }
// });

app.listen(port, async(req, res) => {
  await initMySQL()
    console.log('http server running on', + port);
})

