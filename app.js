document.addEventListener('DOMContentLoaded', function () {
    const loginView = document.getElementById('login-view');
    const dashboardView = document.getElementById('dashboard-view');
    const loginForm = document.getElementById('login-form');
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const errorMsg = document.getElementById('error-message');
    const logoutBtn = document.getElementById('logout-link');
    const navLinks = document.querySelectorAll('.main-nav a');
    const contentArea = document.querySelector('.content-area');

    const validUser1 = 'admin@gmail.com';
    const validUser2 = 'admin1';
    const validPass = 'admin123';

    const dashboardTemplate = `
        <h1>Selamat Datang di Dashboard</h1>
        <p>Ini adalah area konten utama.</p>
        <p>Pilih menu di atas untuk navigasi.</p>
    `;

    /* ==================== CUSTOMER TEMPLATE ==================== */
    const customerTemplate = `
    <div class="customers-wrapper">
        <!-- Add/Edit Customer Form -->
        <div id="addCustomerForm" class="section" style="display:none;">
            <div class="section-header">
                <h2 class="section-title" id="formTitle">Add New Customer</h2>
                <button class="close-btn" onclick="hideAddForm()">✕ Close</button>
            </div>
            <form class="customer-form">
                <input type="hidden" id="editIndex" value="">
                <div class="form-group"><label class="form-label">Customer Name</label><input type="text" class="form-input" id="name" required></div>
                <div class="form-group"><label class="form-label">Customer Company</label><input type="text" class="form-input" id="company" required></div>
                <div class="form-group"><label class="form-label">Customer Nationality</label><input type="text" class="form-input" id="nationality" required></div>
                <div class="form-group"><label class="form-label">Customer Region</label><input type="text" class="form-input" id="region" required></div>
                <div class="form-group"><label class="form-label">Customer Contact</label><input type="tel" class="form-input" id="contact" required></div>
                <div class="form-group"><label class="form-label">Customer Notes</label><textarea class="form-input form-textarea" id="notes" rows="3" required></textarea></div>
                <div class="form-actions">
                    <button type="submit" class="submit-btn">Save</button>
                    <button type="button" class="cancel-btn" onclick="hideAddForm()">Cancel</button>
                </div>
            </form>
        </div>

        <!-- Customer List -->
        <div class="section" id="customerListSection">
            <div class="section-header">
                <h2 class="section-title">Customer Lists</h2>
                <button class="add-btn" onclick="showAddForm()">+ Add New</button>
            </div>
            <div class="table-container">
                <table id="customerTable">
                    <thead>
                        <tr>
                            <th>Customer_ID</th>
                            <th>Name</th>
                            <th>Company</th>
                            <th>Nationality</th>
                            <th>Category</th>
                            <th>Contact</th>
                            <th>Region</th>
                            <th>Total_Transaction</th>
                            <th>Total_Amount (USD)</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>

        <!-- Transaction History -->
        <div class="section">
            <div class="section-header">
                <h2 class="section-title">Transaction History</h2>
            </div>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Transaction_ID</th>
                            <th>Customer_ID</th>
                            <th>Transaction_Date</th>
                            <th>Payment_Method</th>
                            <th>Total_Amount (USD)</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>TX0001</td><td>CU0001</td><td>2025-10-15</td><td>Credit Card</td><td>1,250</td><td><span class="status-badge status-completed">Completed</span></td></tr>
                        <tr><td>TX0002</td><td>CU0002</td><td>2025-10-14</td><td>PayPal</td><td>680</td><td><span class="status-badge status-completed">Completed</span></td></tr>
                        <tr><td>TX0003</td><td>CU0003</td><td>2025-10-14</td><td>Bank Transfer</td><td>3,200</td><td><span class="status-badge status-pending">Pending</span></td></tr>
                        <tr><td>TX0004</td><td>CU0004</td><td>2025-10-13</td><td>Credit Card</td><td>890</td><td><span class="status-badge status-completed">Completed</span></td></tr>
                        <tr><td>TX0005</td><td>CU0005</td><td>2025-10-12</td><td>Credit Card</td><td>445</td><td><span class="status-badge status-ongoing">Ongoing</span></td></tr>
                    </tbody>
                </table>
            </div>

            <div class="table-container" style="margin-top: 30px;">
                <table>
                    <thead>
                        <tr>
                            <th>Detail_ID</th>
                            <th>Transaction_ID</th>
                            <th>Product_ID</th>
                            <th>Product_Name</th>
                            <th>Quantity</th>
                            <th>Unit_Price (USD)</th>
                            <th>Subtotal (USD)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>D001</td><td>TX0001</td><td>P001</td><td>UltraGrip 2" Tape</td><td>2</td><td>5</td><td>10</td></tr>
                        <tr><td>D002</td><td>TX0001</td><td>P005</td><td>PowerBond Heavy</td><td>5</td><td>4.2</td><td>21</td></tr>
                        <tr><td>D003</td><td>TX0002</td><td>P002</td><td>MegaStick 2" Tape</td><td>3</td><td>6</td><td>18</td></tr>
                        <tr><td>D004</td><td>TX0003</td><td>P002</td><td>MegaStick 2" Tape</td><td>3</td><td>4.5</td><td>13.5</td></tr>
                        <tr><td>D005</td><td>TX0003</td><td>P004</td><td>EcoGrip Tape</td><td>5</td><td>4.3</td><td>21.5</td></tr>
                        <tr><td>D006</td><td>TX0004</td><td>P001</td><td>UltraGrip 2" Tape</td><td>3</td><td>4</td><td>12</td></tr>
                        <tr><td>D007</td><td>TX0004</td><td>P002</td><td>MegaStick 2" Tape</td><td>2</td><td>5</td><td>10</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>`;

    /* ==================== LOGIN CHECK ==================== */
    function checkLogin() {
        if (sessionStorage.getItem('isAdminLoggedIn') === 'true') {
            loginView.classList.add('hidden');
            dashboardView.classList.remove('hidden');
        } else {
            loginView.classList.remove('hidden');
            dashboardView.classList.add('hidden');
        }
    }

    if (loginForm) {
        loginForm.addEventListener('submit', e => {
            e.preventDefault();
            if ((username.value === validUser1 || username.value === validUser2) && password.value === validPass) {
                sessionStorage.setItem('isAdminLoggedIn', 'true');
                errorMsg.textContent = '';
                checkLogin();
            } else {
                errorMsg.textContent = 'Username atau password salah.';
            }
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', e => {
            e.preventDefault();
            sessionStorage.removeItem('isAdminLoggedIn');
            checkLogin();
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            const page = link.textContent.trim();
            if (page === 'Customers') {
                contentArea.innerHTML = customerTemplate;
                initCustomerScripts();
            } else {
                contentArea.innerHTML = dashboardTemplate;
            }
        });
    });

    checkLogin();
});

/* ==================== CUSTOMER PAGE SCRIPT ==================== */
function showAddForm(editIndex = null) {
    document.getElementById('addCustomerForm').style.display = 'block';
    document.getElementById('customerListSection').style.display = 'none';
    document.getElementById('formTitle').textContent = editIndex !== null ? 'Edit Customer' : 'Add New Customer';
    document.getElementById('editIndex').value = editIndex !== null ? editIndex : '';
}
function hideAddForm() {
    document.getElementById('addCustomerForm').style.display = 'none';
    document.getElementById('customerListSection').style.display = 'block';
}

function loadCustomers() {
    let customers = JSON.parse(localStorage.getItem('customers'));
    if (!customers || customers.length === 0) {
        customers = [
            { id: 'CU0001', name: 'James Wang', company: 'Amazon', nationality: 'United States', region: 'North America', contact: '+1 206 266 1000', notes: 'Tech Solutions' },
            { id: 'CU0002', name: 'Alex Martin', company: 'Mercedes', nationality: 'Germany', region: 'Europe', contact: '+49 621 1854 3000', notes: 'Manufacturing' },
            { id: 'CU0003', name: 'Eva Brown', company: 'Volkswagen', nationality: 'Germany', region: 'Europe', contact: '+49 5361 9091 01', notes: 'Automotive' },
            { id: 'CU0004', name: 'Emily Zhang', company: 'Alibaba', nationality: 'China', region: 'Asia', contact: '+86 135 9999 2345', notes: 'E-Commerce' }
        ];
        localStorage.setItem('customers', JSON.stringify(customers));
    }

    const tbody = document.querySelector('#customerTable tbody');
    tbody.innerHTML = '';
    customers.forEach((c, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${c.id}</td>
            <td>${c.name}</td>
            <td>${c.company}</td>
            <td>${c.nationality}</td>
            <td>${c.notes}</td>
            <td>${c.contact}</td>
            <td>${c.region}</td>
            <td>0</td>
            <td>0</td>
            <td>
                <button class="small-btn edit-btn" onclick="editCustomer(${index})">Edit</button>
                <button class="small-btn delete-btn" onclick="deleteCustomer(${index})">Hapus</button>
            </td>`;
        tbody.appendChild(tr);
    });
}

function saveCustomer(customer) {
    const customers = JSON.parse(localStorage.getItem('customers')) || [];
    customers.push(customer);
    localStorage.setItem('customers', JSON.stringify(customers));
}

function updateCustomer(index, updatedCustomer) {
    const customers = JSON.parse(localStorage.getItem('customers')) || [];
    customers[index] = updatedCustomer;
    localStorage.setItem('customers', JSON.stringify(customers));
}

function deleteCustomer(index) {
    const customers = JSON.parse(localStorage.getItem('customers')) || [];
    if (confirm(`Yakin ingin menghapus ${customers[index].name}?`)) {
        customers.splice(index, 1);
        localStorage.setItem('customers', JSON.stringify(customers));
        loadCustomers();
    }
}

function editCustomer(index) {
    const customers = JSON.parse(localStorage.getItem('customers')) || [];
    const c = customers[index];
    showAddForm(index);
    document.getElementById('name').value = c.name;
    document.getElementById('company').value = c.company;
    document.getElementById('nationality').value = c.nationality;
    document.getElementById('region').value = c.region;
    document.getElementById('contact').value = c.contact;
    document.getElementById('notes').value = c.notes;
}

function initCustomerScripts() {
    loadCustomers();
    const form = document.querySelector('.customer-form');
    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            const index = document.getElementById('editIndex').value;
            const name = document.getElementById('name').value;
            const company = document.getElementById('company').value;
            const nationality = document.getElementById('nationality').value;
            const region = document.getElementById('region').value;
            const contact = document.getElementById('contact').value;
            const notes = document.getElementById('notes').value;

            const newCustomer = {
                id: index ? JSON.parse(localStorage.getItem('customers'))[index].id : 'CU' + String(Date.now()).slice(-4),
                name, company, nationality, region, contact, notes
            };

            if (index) {
                updateCustomer(index, newCustomer);
                alert('Customer updated successfully!');
            } else {
                saveCustomer(newCustomer);
                alert('Customer added successfully!');
            }

            loadCustomers();
            hideAddForm();
            form.reset();
        });
    }
}