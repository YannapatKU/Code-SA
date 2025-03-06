const BASE_URL = 'http://localhost:3000';

const Admin = async () => {
    console.log('Loading...');

    try {
        const response = await axios.get(`${BASE_URL}/orders`);
        const order = response.data;
        const responses = await axios.get(`${BASE_URL}/customers`);
        const customer = responses.data;
        const response2 = await axios.get(`${BASE_URL}/book`);
        const books = response2.data;

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

        
        let htmlAdminCheckData = `
        <div class="container-fluid mt-4">
            <table class="table table-dark table-striped">
                <thead>
                    <tr>
                        <th scope="col">Order.</th>
                        <th scope="col">CusID</th>
                        <th scope="col">Name</th>
                        <th scope="col">BookID</th>
                        <th scope="col">BookName</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Status</th>
                        <th scope="col">Ordered at</th>
                    </tr>
                </thead>
                <tbody>`;

        order.forEach((orders) => {
            
            const customers = customer.find(c => String(c.ID) === String(orders.CusID)) || {};
            const book = books.find(b => b.BookID === orders.BID) || {};

            htmlAdminCheckData += `
            <tr>
                <th scope="row">${orders.OrderID}</th>
                <td>${orders.CusID}</td>
                <td>${customers.Name || 'N/A'}</td>
                <td>${orders.BID}</td>
                <td>${book.BookName || 'N/A'}</td>
                <td>${orders.TotalQuantity}</td>
                <td>${orders.OrderStat || 'Pending'}</td>
                <td>${orders.OrderedAt || 'N/A'}</td>
            </tr>`;
        });

        htmlAdminCheckData += `</tbody></table></div>`;
        document.getElementById('AdminCheck').innerHTML = htmlAdminCheckData;

    } catch (error) {
        console.error('Error fetching customer data:', error);
    }
};

window.onload = Admin;
