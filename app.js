// --- Elemen DOM Utama ---
const loginView = document.getElementById("login-view");
const dashboardView = document.getElementById("dashboard-view");
const loginForm = document.getElementById("login-form");
const username = document.getElementById("username");
const password = document.getElementById("password");
const errorMsg = document.getElementById("error-message");
const logoutBtn = document.getElementById("logout-link");
const navLinks = document.querySelectorAll(".main-nav a");
const contentArea = document.querySelector(".content-area");

// --- Kredensial Login ---
const validUser1 = "admin@gmail.com";
const validUser2 = "admin1";
const validPass = "admin123";

// --- DATA APLIKASI ---
// Memuat data dari LocalStorage atau menggunakan data default jika tidak ada

let customersData = JSON.parse(localStorage.getItem("customersData")) || [
  { id: "C0001", name: "Alex Tan", email: "alex@company.com", phone: "+62-811-1111", totalTransaction: 15, totalAmount: 9500 },
  { id: "C0002", name: "Benjamin Lee", email: "ben@company.com", phone: "+62-811-2222", totalTransaction: 12, totalAmount: 8200 },
  { id: "C0003", name: "Catherine Wong", email: "catherine@company.com", phone: "+62-811-3333", totalTransaction: 10, totalAmount: 7800 },
  { id: "C0004", name: "David Chen", email: "david@company.com", phone: "+62-811-4444", totalTransaction: 9, totalAmount: 6900 },
  { id: "C0005", name: "Emily Zhang", email: "emily@company.com", phone: "+62-811-5555", totalTransaction: 8, totalAmount: 6450 },
  { id: "C0006", name: "Frank Yusuf", email: "frank@company.com", phone: "+62-811-6666", totalTransaction: 22, totalAmount: 15600 },
  { id: "C0007", name: "Grace Kim", email: "grace@company.com", phone: "+62-811-7777", totalTransaction: 18, totalAmount: 12300 },
  { id: "C0008", name: "Henry Gunawan", email: "henry@company.com", phone: "+62-811-8888", totalTransaction: 14, totalAmount: 9800 },
  { id: "C0009", name: "Irene Susilo", email: "irene@company.com", phone: "+62-811-9999", totalTransaction: 11, totalAmount: 7500 },
  { id: "C0010", name: "Jason Hartono", email: "jason@company.com", phone: "+62-811-1010", totalTransaction: 25, totalAmount: 18900 },
  { id: "C0011", name: "Karen Lim", email: "karen@company.com", phone: "+62-811-1111", totalTransaction: 6, totalAmount: 5200 },
  { id: "C0012", name: "Leo Tan", email: "leo@company.com", phone: "+62-811-1313", totalTransaction: 1, totalAmount: 850 }
];

// Data untuk Transaksi (Orders) - Dimuat dari LocalStorage
let transactions = JSON.parse(localStorage.getItem("ongoingTransactions")) || [
  { orderId: "20001", customerId: "C0001", transactionId: "TXN001", productId: "P4P01", productName: "Cloth Tape Black", quantity: 10, unitPrice: 26, total: 260, status: "Ongoing" },
  { orderId: "20002", customerId: "C0002", transactionId: "TXN002", productId: "P4P02", productName: "Double Tape", quantity: 15, unitPrice: 24, total: 360, status: "Pending" },
  { orderId: "20003", customerId: "C0003", transactionId: "TXN003", productId: "P4P03", productName: "Packaging Tape", quantity: 20, unitPrice: 18, total: 360, status: "Shipped" },
  { orderId: "20004", customerId: "C0004", transactionId: "TXN004", productId: "P4P04", productName: "Aluminum Tape", quantity: 8, unitPrice: 32, total: 256, status: "Completed" },
  { orderId: "20005", customerId: "C0005", transactionId: "TXN005", productId: "P4P05", productName: "Masking Tape", quantity: 12, unitPrice: 20, total: 240, status: "Ongoing" },
  { orderId: "20006", customerId: "C0006", transactionId: "TXN006", productId: "P4P06", productName: "Foam Tape", quantity: 5, unitPrice: 28, total: 140, status: "Pending" },
  { orderId: "20007", customerId: "C0007", transactionId: "TXN007", productId: "P4P07", productName: "Clear Tape Pro", quantity: 25, unitPrice: 22, total: 550, status: "Completed" },
  { orderId: "20008", customerId: "C0008", transactionId: "TXN008", productId: "P4P08", productName: "Warning Stripe Tape", quantity: 18, unitPrice: 25, total: 450, status: "Shipped" },
  { orderId: "20009", customerId: "C0009", transactionId: "TXN009", productId: "P4P09", productName: "Heavy Duty Tape", quantity: 7, unitPrice: 35, total: 245, status: "Ongoing" },
  { orderId: "20010", customerId: "C0010", transactionId: "TXN010", productId: "P4P10", productName: "Electrical Tape", quantity: 30, unitPrice: 15, total: 450, status: "Completed" }
];

let pipelineData = {
  lead: 99,
  qualification: 40,
  proposal: 15,
  negotiation: 8,
  closedWon: 62,
};

let products = JSON.parse(localStorage.getItem("productsData")) || [
  { id: "P4P01", name: "Nashua Top1 Cloth Tape Black (25 mm x 5 y)", category: "Cloth Tape", price: 26000, supply: "Active", stock: "Active", width: 25, length: 5, rating: 4.8 },
  { id: "P4P02", name: "Nashua Top1 Double Tape", category: "Double Tape", price: 24000, supply: "Active", stock: "Active", width: 24, length: 5, rating: 4.6 },
  { id: "P4P03", name: "Nashua Top1 Packaging Tape Clear", category: "Packaging Tape", price: 18000, supply: "Active", stock: "Active", width: 48, length: 100, rating: 4.7 },
  { id: "P4P04", name: "Nashua Top1 Aluminum Foil Tape", category: "Aluminum Tape", price: 32000, supply: "Active", stock: "Active", width: 50, length: 45, rating: 4.5 },
  { id: "P4P05", name: "Nashua Top1 Masking Tape", category: "Masking Tape", price: 20000, supply: "Active", stock: "Active", width: 24, length: 18, rating: 4.6 },
  { id: "P4P06", name: "Nashua Top1 Foam Tape Double Side", category: "Foam Tape", price: 28000, supply: "Active", stock: "Active", width: 12, length: 5, rating: 4.7 },
  { id: "P4P07", name: "Nashua Top1 Clear Tape Premium", category: "Clear Tape", price: 22000, supply: "Active", stock: "Active", width: 48, length: 100, rating: 4.9 },
  { id: "P4P08", name: "Nashua Top1 Warning Stripe Tape", category: "Warning Tape", price: 25000, supply: "Active", stock: "Active", width: 48, length: 33, rating: 4.4 },
  { id: "P4P09", name: "Nashua Top1 Heavy Duty Tape", category: "Packaging Tape", price: 35000, supply: "Active", stock: "Active", width: 48, length: 50, rating: 4.8 },
  { id: "P4P10", name: "Nashua Top1 Electrical Insulation Tape", category: "Clear Tape", price: 15000, supply: "Active", stock: "Active", width: 19, length: 20, rating: 4.3 },
  { id: "P4P11", name: "Nashua Top1 Fragile Tape (48mm x 66m)", category: "Warning Tape", price: 22000, supply: "Active", stock: "Active", width: 48, length: 66, rating: 4.8 }
];

let marketShareData = [
  { company: "Nashua Industrial Tape", share: 35, color: "#8b2e3b" },
  { company: "3M", share: 25, color: "#b84452" },
  { company: "Bostik", share: 15, color: "#c94f5e" },
  { company: "Gorilla", share: 12, color: "#ff6b7a" },
  { company: "Others", share: 13, color: "#666" }
];

// Data untuk Sales Pipeline (Deals) - Dimuat dari LocalStorage
let deals = JSON.parse(localStorage.getItem("salesDeals")) || [
  { id: "D001", title: "Bulk Order - Manufacturing", customer: "PT Maju Jaya", stage: "NEW LEAD" },
  { id: "D002", title: "Partnership Deal", customer: "CV Sentosa", stage: "QUALIFICATION" },
  { id: "D003", title: "Retail Partnership", customer: "ABC Store Chain", stage: "PROPOSAL" },
  { id: "D004", title: "Supply Agreement", customer: "XYZ Manufacturing", stage: "NEGOTIATION" },
  { id: "D005", title: "Export Deal", customer: "Global Traders Inc", stage: "CLOSED/WON" }
];

// ADD THIS - Transaction History Data (for Analytics and Customer page)
let transactionsData = JSON.parse(localStorage.getItem("transactionsData")) || [
  { orderId: "20001", customerId: "C0001", transactionId: "TXN001", productId: "P4P01", productName: "Cloth Tape Black", quantity: 10, unitPrice: 26, subtotal: 260, month: "January", region: "Asia Pacific (APAC)" },
  { orderId: "20002", customerId: "C0002", transactionId: "TXN002", productId: "P4P02", productName: "Double Tape", quantity: 15, unitPrice: 24, subtotal: 360, month: "February", region: "Asia Pacific (APAC)" },
  { orderId: "20003", customerId: "C0003", transactionId: "TXN003", productId: "P4P03", productName: "Packaging Tape", quantity: 20, unitPrice: 18, subtotal: 360, month: "March", region: "Europe, Middle East & Africa (EMEA)" },
  { orderId: "20004", customerId: "C0004", transactionId: "TXN004", productId: "P4P04", productName: "Aluminum Tape", quantity: 8, unitPrice: 32, subtotal: 256, month: "April", region: "Asia Pacific (APAC)" },
  { orderId: "20005", customerId: "C0005", transactionId: "TXN005", productId: "P4P05", productName: "Masking Tape", quantity: 12, unitPrice: 20, subtotal: 240, month: "May", region: "North America" },
  { orderId: "20006", customerId: "C0006", transactionId: "TXN006", productId: "P4P06", productName: "Foam Tape", quantity: 5, unitPrice: 28, subtotal: 140, month: "June", region: "Asia Pacific (APAC)" },
  { orderId: "20007", customerId: "C0007", transactionId: "TXN007", productId: "P4P07", productName: "Clear Tape Pro", quantity: 25, unitPrice: 22, subtotal: 550, month: "July", region: "Europe, Middle East & Africa (EMEA)" },
  { orderId: "20008", customerId: "C0008", transactionId: "TXN008", productId: "P4P08", productName: "Warning Stripe Tape", quantity: 18, unitPrice: 25, subtotal: 450, month: "August", region: "North America" },
  { orderId: "20009", customerId: "C0009", transactionId: "TXN009", productId: "P4P09", productName: "Heavy Duty Tape", quantity: 7, unitPrice: 35, subtotal: 245, month: "September", region: "Asia Pacific (APAC)" },
  { orderId: "20010", customerId: "C0010", transactionId: "TXN010", productId: "P4P10", productName: "Electrical Tape", quantity: 30, unitPrice: 15, subtotal: 450, month: "October", region: "Europe, Middle East & Africa (EMEA)" },
  { orderId: "20011", customerId: "C0001", transactionId: "TXN011", productId: "P4P02", productName: "Double Tape", quantity: 20, unitPrice: 24, subtotal: 480, month: "November", region: "Asia Pacific (APAC)" },
  { orderId: "20012", customerId: "C0002", transactionId: "TXN012", productId: "P4P05", productName: "Masking Tape", quantity: 10, unitPrice: 20, subtotal: 200, month: "November", region: "Asia Pacific (APAC)" }
];


// --- FUNGSI PENYIMPANAN DATA (LocalStorage) ---

function saveCustomers() {
  localStorage.setItem("customersData", JSON.stringify(customersData));
}

function saveProducts() {
  localStorage.setItem("productsData", JSON.stringify(products));
}

function saveOngoingTransactions() {
  localStorage.setItem("ongoingTransactions", JSON.stringify(transactions));
}

function saveSalesDeals() {
  localStorage.setItem("salesDeals", JSON.stringify(deals));
}


/* ===== HTML TEMPLATES UNTUK SETIAP HALAMAN ===== */

// --- Dashboard Template (Dengan ID untuk navigasi) ---
const dashboardTemplate = `
<div class="analytics-dashboard">
  <div class="card" id="card-top-customers" style="cursor: pointer;">
    <div class="card-header">Top 10 Customers</div>
    <table class="customers-table">
      <thead><tr><th>Customer_ID</th><th>Customer</th><th>Total_Transaction</th><th>Total_Amount (USD)</th></tr></thead>
      <tbody>
        <tr><td>C0001</td><td>Alex Tan</td><td>15</td><td>9,500</td></tr>
        <tr><td>C0002</td><td>Benjamin Lee</td><td>12</td><td>8,200</td></tr>
        <tr><td>C0003</td><td>Catherine Wong</td><td>10</td><td>7,800</td></tr>
        <tr><td>C0004</td><td>David Chen</td><td>9</td><td>6,900</td></tr>
        <tr><td>C0005</td><td>Emily Zhang</td><td>8</td><td>6,450</td></tr>
        <tr><td>C0006</td><td>Frank Yusuf</td><td>22</td><td>15,600</td></tr>
        <tr><td>C0007</td><td>Grace Kim</td><td>18</td><td>12,300</td></tr>
        <tr><td>C0008</td><td>Henry Gunawan</td><td>14</td><td>9,800</td></tr>
        <tr><td>C0009</td><td>Irene Susilo</td><td>11</td><td>7,500</td></tr>
        <tr><td>C0010</td><td>Jason Hartono</td><td>25</td><td>18,900</td></tr>
      </tbody>
    </table>
  </div>

  <div class="card" id="card-performance-summary" style="cursor: pointer;">
    <div class="card-header">Performance Summary</div>
    <div class="performance-grid">
      <div class="performance-card"><div class="performance-title">Monthly Total Sales</div><div class="performance-value">$285k</div></div>
      <div class="performance-card"><div class="performance-title">Lead Conversion Rate</div><div class="performance-value">68%</div></div>
      <div class="performance-card"><div class="performance-title">Monthly Deal Closed</div><div class="performance-value">47</div></div>
      <div class="performance-card"><div class="performance-title">Qualified Leads</div><div class="performance-value">156</div></div>
      <div class="performance-card"><div class="performance-title">Sales Closed</div><div class="performance-value">234</div></div>
      <div class="performance-card"><div class="performance-title">Monthly sold units</div><div class="performance-value">1,847</div></div>
    </div>
  </div>

  <div class="card" id="card-pending-followup" style="cursor: pointer;">
    <div class="card-header">Pending Follow Up</div>
    <table class="followup-table">
      <thead><tr><th>Transaction_ID</th><th>Customer_ID</th><th>Transaction_Date</th><th>Payment_Method</th><th>Est_Amount (USD)</th><th>Status</th></tr></thead>
      <tbody>
        <tr><td>TXN045</td><td>C1205</td><td>2025-11-05</td><td>Bank Transfer</td><td>5,200</td><td>Pending</td></tr>
        <tr><td>TXN046</td><td>C1208</td><td>2025-11-06</td><td>Credit Card</td><td>3,800</td><td>Pending</td></tr>
        <tr><td>TXN047</td><td>C1212</td><td>2025-11-08</td><td>PayPal</td><td>4,500</td><td>Pending</td></tr>
      </tbody>
    </table>
  </div>

  <div class="card" id="card-newest-order" style="cursor: pointer;">
    <div class="card-header">Newest Order</div>
    <table class="order-table">
      <thead><tr><th>Order_ID</th><th>Customer_ID</th><th>Transaction_ID</th><th>Product_Name</th><th>Quantity</th><th>Total_Price</th><th>Date</th></tr></thead>
      <tbody>
        <tr><td>20547</td><td>C0089</td><td>TXN547</td><td>EcoSeal Tape</td><td>15</td><td>$675</td><td>Nov 2</td></tr>
        <tr><td>20546</td><td>C0072</td><td>TXN546</td><td>Masking 2" Tape</td><td>25</td><td>$1,125</td><td>Nov 1</td></tr>
        <tr><td>20545</td><td>C0055</td><td>TXN545</td><td>PowerBond Hitam</td><td>10</td><td>$550</td><td>Oct 31</td></tr>
        <tr><td>20544</td><td>C0041</td><td>TXN544</td><td>Double Sided Tape</td><td>30</td><td>$1,800</td><td>Oct 30</td></tr>
        <tr><td>20543</td><td>C0033</td><td>TXN543</td><td>Clear Packing Tape</td><td>50</td><td>$2,250</td><td>Oct 29</td></tr>
      </tbody>
    </table>
  </div>

  <div class="card" style="grid-column: 1 / -1;">
  <div class="card-header">Sales Pipeline Overview</div>
  <div class="pipeline-overview">
    <div class="pipeline-stage">
      <div class="pipeline-stage-count">0</div>
      <div class="pipeline-stage-name">Lead</div>
    </div>
    <div class="pipeline-stage">
      <div class="pipeline-stage-count">0</div>
      <div class="pipeline-stage-name">Qualification</div>
    </div>
    <div class="pipeline-stage">
      <div class="pipeline-stage-count">0</div>
      <div class="pipeline-stage-name">Proposal</div>
    </div>
    <div class="pipeline-stage">
      <div class="pipeline-stage-count">0</div>
      <div class="pipeline-stage-name">Negotiation</div>
    </div>
  </div>
</div>
`;

// --- Template Halaman Sales Pipeline ---
const pipelineTemplate = `
<div class="section">
  <div class="section-header">
    <h2 class="section-title">Sales Pipeline</h2>
    <button class="add-btn" id="addDealBtn" style="float:none;">+ Add New Deal</button>
  </div>
  <div class="pipeline" id="pipeline"></div>
</div>

<div class="sidebar" id="sidebar">
  <div class="sidebar-header">
    <h2 id="dealSidebarTitle">Add New Deal</h2>
    <button class="close-btn" id="closeSidebar">×</button>
  </div>
  <form id="dealForm">
    <div class="form-group"><label>Deal Title</label><input type="text" id="dealTitle" required></div>
    <div class="form-group"><label>Customer/Company</label><input type="text" id="customerName" required></div>
    <div class="form-group"><label>Deal ID</label><input type="text" id="dealId" required></div>
    <div class="form-group">
      <label>Stage</label>
      <select id="dealStage">
        <option value="NEW LEAD">NEW LEAD</option>
        <option value="QUALIFICATION">QUALIFICATION</option>
        <option value="PROPOSAL">PROPOSAL</option>
        <option value="NEGOTIATION">NEGOTIATION</option>
        <option value="CLOSED/WON">CLOSED/WON</option>
      </select>
    </div>
    <button type="submit" class="submit-btn" id="dealSubmitBtn">Add Deal</button>
  </form>
</div>
`;

// --- Template Halaman Analytics (Dengan tabel produk yang dapat diedit) ---
const analyticsTemplate = `
<div class="analytics-grid">
  <div class="analytics-card">
    <h3>Sales Report by Region</h3>
    <table class="analytics-table">
      <thead><tr><th>Region_Name</th><th>Total_Transaction</th><th>Total_Amount (USD)</th><th>Conv_Rate (%)</th><th>Top_Selling_Product</th></tr></thead>
      <tbody id="regionTable"></tbody>
    </table>
  </div>

  <div class="analytics-card">
    <h3>Sales Performance</h3>
    <div class="quarter-tabs">
      <button class="quarter-tab active" data-view="monthly">Monthly</button>
      <button class="quarter-tab" data-view="q1">Quarter 1</button>
      <button class="quarter-tab" data-view="q2">Quarter 2</button>
      <button class="quarter-tab" data-view="q3">Quarter 3</button>
      <button class="quarter-tab" data-view="q4">Quarter 4</button>
    </div>
    <div class="metric-grid" id="performanceMetrics"></div>
  </div>

<div class="analytics-card">
    <h3>Customer Retention</h3>
    <div style="margin-bottom: 20px;">
      <h4 style="margin: 0 0 10px 0; font-size: 14px; opacity: 0.9;">Regular Customers (2+ Transactions)</h4>
      <table class="analytics-table">
        <thead><tr><th>Customer_ID</th><th>Customer_Name</th><th>Total_Trans</th><th>Total_Amount</th></tr></thead>
        <tbody id="regularCustomers"></tbody>
      </table>
    </div>
    <div>
      <h4 style="margin: 0 0 10px 0; font-size: 14px; opacity: 0.9;">Potential Customers (Highest Qty)</h4>
      <table class="analytics-table">
        <thead><tr><th>Customer_ID</th><th>Customer_Name</th><th>Total_Trans</th><th>Total_Qty</th></tr></thead>
        <tbody id="potentialCustomers"></tbody>
      </table>
    </div>
  </div>
  <div class="analytics-card">
    <div class="analytics-card full-width">
      <h3>Sales Trend Analysis</h3>
      <div class="deals-info">
        <div class="deals-info-item"><div class="deals-label">Deals Open</div><div class="deals-value" id="dealsOpen">0</div></div>
        <div class="deals-info-item"><div class="deals-label">Deals Closed</div><div class="deals-value" id="dealsClosed">0</div></div>
      </div>
      <div class="chart-container"><canvas id="salesTrendChart"></canvas></div>
    </div>
  
    <div class="analytics-card">
      <h3>Market Share Graphics</h3>
      <div class="chart-container" style="height: 300px;">
        <canvas id="marketShareChart"></canvas>
      </div>
      <div class="market-share-legend" id="marketShareLegend"></div>
    </div>
  </div>

  <div class="analytics-card full-width">
    <h3>Product List</h3>
    <button class="add-btn" id="addProductBtn">+ Add New</button>
    <div style="clear: both;"></div>
    <table class="analytics-table">
      <thead>
        <tr>
          <th>Product_ID</th>
          <th>Product_Name</th>
          <th>Category</th>
          <th>Price (Rp)</th>
          <th>Supply_Status</th>
          <th>Stock_Status</th>
          <th>Width (mm)</th>
          <th>Length (m)</th>
          <th>Rating</th>
          <th>Actions</th> </tr>
      </thead>
      <tbody id="productTable"></tbody>
    </table>
  </div>
</div>
`;

// --- Template GABUNGAN untuk Halaman "Orders" dan "Customers" ---
const customersAndOrdersTemplate = `

<div class="section">
  <div class="section-header">
    <h2 class="section-title">Ongoing Transaction</h2>
    <button class="add-btn" id="addNewBtn" style="float:none;">+ Add New</button>
  </div>
  <div class="filters">
    <div class="filter-group"><label>Status</label><select id="filterStatus"><option value="all">All Status</option><option value="Ongoing">Ongoing</option><option value="Pending">Pending</option><option value="Shipped">Shipped</option><option value="Completed">Completed</option></select></div>
    <div class="filter-group"><label>Payment Method</label><select id="filterPayment"><option value="all">All Methods</option><option value="Bank Transfer">Bank Transfer</option><option value="Credit Card">Credit Card</option><option value="PayPal">PayPal</option><option value="Cash">Cash</option></select></div>
    <div class="filter-group"><label>Search</label><input type="text" id="searchInput" placeholder="Search by Transaction ID..."></div>
  </div>
  <table class="data-table" id="transactionTable">
    <thead><tr><th>Transaction_ID</th><th>Customer</th><th>Product_Name</th><th>Transaction_Date</th><th>Payment_Method</th><th>Total_Amount (USD)</th><th>Status</th><th>Actions</th></tr></thead>
    <tbody id="transactionBody"></tbody>
  </table>
</div>

<div class="sidebar" id="transactionSidebar">
  <div class="sidebar-header">
    <h2 id="sidebarTitle">Add New Transaction</h2>
    <button class="close-btn" id="closeSidebar">×</button>
  </div>
  <form id="transactionForm">
    <div class="form-group"><label>Transaction ID</label><input type="text" id="transactionId" readonly></div>
    <div class="form-group"><label>Customer Name</label><input type="text" id="customerName" required></div>
    <div class="form-group"><label>Product Name</label><input type="text" id="productName" required></div>
    <div class="form-group"><label>Transaction Date</label><input type="date" id="transactionDate" required></div>
    <div class="form-group"><label>Payment Method</label><select id="paymentMethod" required><option value="">Select Method</option><option value="Bank Transfer">Bank Transfer</option><option value="Credit Card">Credit Card</option><option value="PayPal">PayPal</option><option value="Cash">Cash</option></select></div>
    <div class="form-group"><label>Total Amount (USD)</label><input type="number" id="totalAmount" step="0.01" required></div>
    <div class="form-group"><label>Status</label><select id="status" required><option value="Ongoing">Ongoing</option><option value="Pending">Pending</option><option value="Shipped">Shipped</option><option value="Completed">Completed</option></select></div>
    <button type="submit" class="submit-btn">Save Transaction</button>
  </form>
</div>
`;

// --- Template for Orders page only ---
const ordersTemplate = `
<div class="section">
  <div class="section-header">
    <h2 class="section-title">Ongoing Transaction</h2>
    <button class="add-btn" id="addNewBtn" style="float:none;">+ Add New</button>
  </div>
  <div class="filters">
    <div class="filter-group"><label>Status</label><select id="filterStatus"><option value="all">All Status</option><option value="Ongoing">Ongoing</option><option value="Pending">Pending</option><option value="Shipped">Shipped</option><option value="Completed">Completed</option></select></div>
    <div class="filter-group"><label>Payment Method</label><select id="filterPayment"><option value="all">All Methods</option><option value="Bank Transfer">Bank Transfer</option><option value="Credit Card">Credit Card</option><option value="PayPal">PayPal</option><option value="Cash">Cash</option></select></div>
    <div class="filter-group"><label>Search</label><input type="text" id="searchInput" placeholder="Search..."></div>
  </div>
  <table class="data-table" id="transactionTable">
    <thead><tr><th>Order_ID</th><th>Customer_ID</th><th>Transaction_ID</th><th>Product_ID</th><th>Product_Name</th><th>Quantity</th><th>Unit_Price (USD)</th><th>Total (USD)</th><th>Status</th><th>Actions</th></tr></thead>
    <tbody id="transactionBody"></tbody>
  </table>
</div>

<div class="sidebar" id="transactionSidebar">
  <div class="sidebar-header">
    <h2 id="sidebarTitle">Add New Transaction</h2>
    <button class="close-btn" id="closeSidebar">×</button>
  </div>
  <form id="transactionForm">
    <div class="form-group"><label>Order ID</label><input type="text" id="orderId" readonly></div>
    <div class="form-group"><label>Customer ID</label><input type="text" id="customerId" required></div>
    <div class="form-group"><label>Transaction ID</label><input type="text" id="transactionId" readonly></div>
    <div class="form-group"><label>Product ID</label><input type="text" id="productId" required></div>
    <div class="form-group"><label>Product Name</label><input type="text" id="productName" required></div>
    <div class="form-group"><label>Quantity</label><input type="number" id="quantity" min="1" required></div>
    <div class="form-group"><label>Unit Price (USD)</label><input type="number" id="unitPrice" step="0.01" min="0" required></div>
    <div class="form-group"><label>Total (USD)</label><input type="number" id="totalAmount" step="0.01" readonly style="background-color: #2a2a2a;"></div>
    <div class="form-group"><label>Status</label><select id="status" required><option value="Ongoing">Ongoing</option><option value="Pending">Pending</option><option value="Shipped">Shipped</option><option value="Completed">Completed</option></select></div>
    <button type="submit" class="submit-btn">Save Transaction</button>
  </form>
</div>
`;

// --- Template for Customers page only ---
const customersTemplate = `
<div class="section">
  <div class="section-header">
    <h2 class="section-title">Customer Lists</h2>
    <button class="add-btn" id="addCustomerBtn" style="float:none;">+ Add New</button>
  </div>
  <div id="customersList" style="min-height:250px;">
    <table class="customers-table">
      <thead><tr><th>Customer_ID</th><th>Customer</th><th>Email</th><th>Phone</th><th>Total_Transaction</th><th>Total_Amount</th><th>Actions</th></tr></thead>
      <tbody id="customersTableBody"></tbody>
    </table>
  </div>
</div>

<div class="section">
  <div class="section-header">
    <h2 class="section-title">Transaction History</h2>
  </div>
  <div id="transactionHistory" style="overflow-x:auto;">
    <table class="customers-table">
      <thead><tr><th>Order_ID</th><th>Customer_ID</th><th>Transaction_ID</th><th>Product_ID</th><th>Product_Name</th><th>Quantity</th><th>Unit_Price (USD)</th><th>Subtotal (USD)</th></tr></thead>
      <tbody id="transactionTableBody"></tbody>
    </table>
  </div>
</div>

<div class="sidebar" id="customerSidebar">
  <div class="sidebar-header">
    <h2 id="customerFormTitle">Add New Customer</h2>
    <button class="close-btn" id="closeCustomerSidebar">×</button>
  </div>
  <form id="customerForm">
    <div class="form-group"><label>Customer Name</label><input type="text" id="custName" required></div>
    <div class="form-group"><label>Customer ID</label><input type="text" id="custId" required></div>
    <div class="form-group"><label>Email</label><input type="email" id="custEmail" required></div>
    <div class="form-group"><label>Phone</label><input type="tel" id="custPhone" required></div>
    <div class="form-group"><label>Total Transaction</label><input type="number" id="custTotalTransaction" min="0" value="0" required></div>
    <div class="form-group"><label>Amount per Transaction (USD)</label><input type="number" id="custAmountPerTransaction" min="0" step="0.01" value="850" required></div>
    <div class="form-group"><label>Total Amount (USD)</label><input type="number" id="custTotalAmount" min="0" step="0.01" value="0" readonly style="background-color: #2a2a2a; cursor: not-allowed;"></div>
    <button type="submit" class="submit-btn" id="customerSubmitBtn">Add Customer</button>
    <button type="button" class="cancel-btn" id="cancelCustomerBtn" style="width:100%;margin-top:10px;">Cancel</button>
  </form>
</div>
`;  


/* === FUNGSI INTI APLIKASI === */

/* --- Logika Login --- */
function checkLogin() {
  if (sessionStorage.getItem("isAdminLoggedIn") === "true") {
    loginView.classList.add("hidden");
    dashboardView.classList.remove("hidden");
  } else {
    loginView.classList.remove("hidden");
    dashboardView.classList.add("hidden");
  }
}

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    (username.value === validUser1 || username.value === validUser2) &&
    password.value === validPass
  ) {
    sessionStorage.setItem("isAdminLoggedIn", "true");
    checkLogin();
    navigateTo("dashboard"); // Muat dashboard setelah login
    errorMsg.textContent = "";
  } else {
    errorMsg.textContent = "Username atau password salah.";
  }
});

logoutBtn.addEventListener("click", (e) => {
  e.preventDefault();
  sessionStorage.removeItem("isAdminLoggedIn");
  checkLogin();
});

/* --- FUNGSI NAVIGASI UTAMA (Diperbarui) --- */
function navigateTo(page) {
  // 1. Update kelas 'active' di menu navigasi
  navLinks.forEach((l) => l.classList.remove("active"));
  const activeLink = document.querySelector(`.main-nav a[data-page='${page}']`);
  if (activeLink) {
    activeLink.classList.add("active");
  }

  // 2. Muat konten halaman dan panggil fungsi init-nya
  if (page === "sales") {
    contentArea.innerHTML = pipelineTemplate;
    initPipeline();
  } else if (page === "reports") {
    contentArea.innerHTML = analyticsTemplate;
    initAnalytics();
  } else if (page === "customers") {
    contentArea.innerHTML = customersTemplate;
    initCustomers();
  } else if (page === "orders") {
    contentArea.innerHTML = ordersTemplate;
    initOrders();
  } else if (page === "dashboard") {
    // Add dashboard case
    contentArea.innerHTML = dashboardTemplate;
    initDashboard();
  } else {
    // Default fallback to dashboard
    contentArea.innerHTML = dashboardTemplate;
    initDashboard();
  }
}

/* --- Listener untuk Navigasi Atas --- */
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const page = link.getAttribute("data-page");
    navigateTo(page);
  });
});

/* ====== FUNGSI INISIALISASI HALAMAN ====== */

/* --- Inisialisasi Halaman Dashboard (Diperbarui) --- */
/* --- Inisialisasi Halaman Dashboard (Diperbarui) --- */
function initDashboard() {
  // Calculate real pipeline counts from deals data
  const pipelineCounts = {
    lead: deals.filter(d => d.stage === "NEW LEAD").length,
    qualification: deals.filter(d => d.stage === "QUALIFICATION").length,
    proposal: deals.filter(d => d.stage === "PROPOSAL").length,
    negotiation: deals.filter(d => d.stage === "NEGOTIATION").length
  };

  // Update the pipeline overview with real numbers
  const pipelineStages = document.querySelectorAll('.pipeline-stage');
  if (pipelineStages.length >= 4) {
    pipelineStages[0].innerHTML = `
      <div class="pipeline-stage-count">${pipelineCounts.lead}</div>
      <div class="pipeline-stage-name">Lead</div>
    `;
    pipelineStages[1].innerHTML = `
      <div class="pipeline-stage-count">${pipelineCounts.qualification}</div>
      <div class="pipeline-stage-name">Qualification</div>
    `;
    pipelineStages[2].innerHTML = `
      <div class="pipeline-stage-count">${pipelineCounts.proposal}</div>
      <div class="pipeline-stage-name">Proposal</div>
    `;
    pipelineStages[3].innerHTML = `
      <div class="pipeline-stage-count">${pipelineCounts.negotiation}</div>
      <div class="pipeline-stage-name">Negotiation</div>
    `;
  }

  // Menambahkan listener untuk kartu dashboard
  
  // 1. Kartu Top 10 Customers
  const customerCard = document.getElementById("card-top-customers");
  if (customerCard) {
    customerCard.addEventListener("click", () => navigateTo("customers"));
  }

  // 2. Kartu Performance Summary
  const performanceCard = document.getElementById("card-performance-summary");
  if (performanceCard) {
    performanceCard.addEventListener("click", () => navigateTo("reports"));
  }

  // 3. Kartu Pending Follow Up
  const pendingCard = document.getElementById("card-pending-followup");
  if (pendingCard) {
    pendingCard.addEventListener("click", () => navigateTo("orders"));
  }

  // 4. Kartu Newest Order
  const newestOrderCard = document.getElementById("card-newest-order");
  if (newestOrderCard) {
    newestOrderCard.addEventListener("click", () => navigateTo("orders"));
  }

  // 5. Kartu Sales Pipeline Overview (semua kotak) - with clickable functionality
  if (pipelineStages.length > 0) {
    pipelineStages.forEach(stage => {
      stage.addEventListener('click', () => navigateTo("sales"));
      stage.style.cursor = 'pointer'; // Ensure cursor shows it's clickable
    });
  }
}

/* --- Inisialisasi Halaman GABUNGAN (Customers & Orders) --- */
/* --- Inisialisasi Halaman Orders --- */
/* --- Inisialisasi Halaman Orders --- */
function initOrders() {
  let editingOrderId = null;

  function renderOngoingTransactions(filteredTransactions = transactions) {
    const tbody = document.getElementById("transactionBody");
    if(!tbody) return;
    tbody.innerHTML = "";
    filteredTransactions.forEach(transaction => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${transaction.orderId}</td>
        <td>${transaction.customerId}</td>
        <td>${transaction.transactionId}</td>
        <td>${transaction.productId}</td>
        <td>${transaction.productName}</td>
        <td>${transaction.quantity}</td>
        <td>${transaction.unitPrice.toFixed(2)}</td>
        <td>${transaction.total.toFixed(2)}</td>
        <td><span class="status-badge ${getStatusClass(transaction.status)}">${transaction.status}</span></td>
        <td>
          <button class="action-btn" onclick="editOrder('${transaction.orderId}')">Edit</button>
          <button class="action-btn delete" onclick="deleteOrder('${transaction.orderId}')">Delete</button>
        </td>
      `;
      tbody.appendChild(row);
    });
  }

  function getStatusClass(status) {
    const statusMap = { 'Ongoing': 'status-ongoing', 'Pending': 'status-pending', 'Completed': 'status-completed', 'Shipped': 'status-shipped' };
    return statusMap[status] || 'status-ongoing';
  }

  function filterTransactions() {
    const statusFilter = document.getElementById("filterStatus").value;
    const paymentFilter = document.getElementById("filterPayment").value;
    const searchTerm = document.getElementById("searchInput").value.toLowerCase();
    let filtered = transactions;
    if (statusFilter !== "all") filtered = filtered.filter(t => t.status === statusFilter);
    if (searchTerm) {
      filtered = filtered.filter(t =>
        t.orderId.toLowerCase().includes(searchTerm) ||
        t.customerId.toLowerCase().includes(searchTerm) ||
        t.transactionId.toLowerCase().includes(searchTerm) ||
        t.productId.toLowerCase().includes(searchTerm) ||
        t.productName.toLowerCase().includes(searchTerm)
      );
    }
    renderOngoingTransactions(filtered);
  }

  // Auto-calculate total when quantity or unit price changes
  function calculateTotal() {
    const quantity = parseFloat(document.getElementById("quantity").value) || 0;
    const unitPrice = parseFloat(document.getElementById("unitPrice").value) || 0;
    const total = quantity * unitPrice;
    document.getElementById("totalAmount").value = total.toFixed(2);
  }

  window.editOrder = function(orderId) {
    const transaction = transactions.find(t => t.orderId === orderId);
    if (transaction) {
      editingOrderId = orderId;
      document.getElementById("sidebarTitle").textContent = "Edit Transaction";
      document.getElementById("orderId").value = transaction.orderId;
      document.getElementById("customerId").value = transaction.customerId;
      document.getElementById("transactionId").value = transaction.transactionId;
      document.getElementById("productId").value = transaction.productId;
      document.getElementById("productName").value = transaction.productName;
      document.getElementById("quantity").value = transaction.quantity;
      document.getElementById("unitPrice").value = transaction.unitPrice;
      document.getElementById("totalAmount").value = transaction.total.toFixed(2);
      document.getElementById("status").value = transaction.status;
      document.getElementById("transactionSidebar").classList.add("active");
    }
  };

  window.deleteOrder = function(orderId) {
    if (confirm("Are you sure you want to delete this transaction?")) {
      const index = transactions.findIndex(t => t.orderId === orderId);
      if (index > -1) {
        transactions.splice(index, 1);
        saveOngoingTransactions();
        filterTransactions();
      }
    }
  };

  const addNewBtn = document.getElementById("addNewBtn");
  if (addNewBtn) {
    addNewBtn.addEventListener("click", () => {
      editingOrderId = null;
      document.getElementById("sidebarTitle").textContent = "Add New Transaction";
      document.getElementById("transactionForm").reset();
      
      // Generate new IDs
      const newOrderNum = transactions.length > 0 ? Math.max(...transactions.map(t => parseInt(t.orderId))) + 1 : 20001;
      const newTxnNum = transactions.length > 0 ? Math.max(...transactions.map(t => parseInt(t.transactionId.replace('TXN', '')))) + 1 : 1;
      
      document.getElementById("orderId").value = String(newOrderNum);
      document.getElementById("transactionId").value = `TXN${String(newTxnNum).padStart(3, '0')}`;
      document.getElementById("totalAmount").value = "0.00";
      document.getElementById("transactionSidebar").classList.add("active");
    });
  }

  const closeSidebarBtn = document.getElementById("closeSidebar");
  if (closeSidebarBtn) {
    closeSidebarBtn.addEventListener("click", () => {
      document.getElementById("transactionSidebar").classList.remove("active");
    });
  }

  // Add listeners for auto-calculation
  const quantityInput = document.getElementById("quantity");
  const unitPriceInput = document.getElementById("unitPrice");
  if (quantityInput) quantityInput.addEventListener("input", calculateTotal);
  if (unitPriceInput) unitPriceInput.addEventListener("input", calculateTotal);

  const transactionForm = document.getElementById("transactionForm");
  if (transactionForm) {
    transactionForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const transactionData = {
        orderId: document.getElementById("orderId").value,
        customerId: document.getElementById("customerId").value,
        transactionId: document.getElementById("transactionId").value,
        productId: document.getElementById("productId").value,
        productName: document.getElementById("productName").value,
        quantity: parseInt(document.getElementById("quantity").value),
        unitPrice: parseFloat(document.getElementById("unitPrice").value),
        total: parseFloat(document.getElementById("totalAmount").value),
        status: document.getElementById("status").value
      };
      
      if (editingOrderId) {
        const index = transactions.findIndex(t => t.orderId === editingOrderId);
        if (index > -1) transactions[index] = transactionData;
      } else {
        transactions.push(transactionData);
      }
      
      saveOngoingTransactions();
      
      // If status is "Completed", also add to transactionsData
      if (transactionData.status === "Completed") {
        const existingInHistory = transactionsData.find(t => t.orderId === transactionData.orderId);
        if (!existingInHistory) {
          transactionsData.push({
            orderId: transactionData.orderId,
            customerId: transactionData.customerId,
            transactionId: transactionData.transactionId,
            productId: transactionData.productId,
            productName: transactionData.productName,
            quantity: transactionData.quantity,
            unitPrice: transactionData.unitPrice,
            subtotal: transactionData.total,
            month: new Date().toLocaleString('en-US', { month: 'long' }),
            region: "Asia Pacific (APAC)"
          });
          localStorage.setItem("transactionsData", JSON.stringify(transactionsData));
        }
      }
      
      document.getElementById("transactionSidebar").classList.remove("active");
      filterTransactions();
    });
  }

  ["filterStatus", "filterPayment", "searchInput"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("input", filterTransactions);
  });

  renderOngoingTransactions();
}

/* --- Inisialisasi Halaman Customers --- */
function initCustomers() {
  const customerSidebar = document.getElementById("customerSidebar");
  const customerForm = document.getElementById("customerForm");
  const addCustomerBtn = document.getElementById("addCustomerBtn");
  const closeCustomerSidebarBtn = document.getElementById("closeCustomerSidebar");
  const cancelCustomerBtn = document.getElementById("cancelCustomerBtn");
  const customersTableBody = document.getElementById("customersTableBody");
  const transactionTableBody = document.getElementById("transactionTableBody");

  let editingCustomerId = null;

  function renderCustomers() {
    customersTableBody.innerHTML = "";
    customersData.forEach((customer) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${customer.id}</td>
        <td>${customer.name}</td>
        <td>${customer.email}</td>
        <td>${customer.phone}</td>
        <td>${customer.totalTransaction}</td>
        <td>$${customer.totalAmount.toLocaleString()}</td>
        <td>
          <button onclick="editCustomer('${customer.id}')" class="action-btn">Edit</button>
          <button onclick="deleteCustomer('${customer.id}')" class="action-btn delete">Delete</button>
        </td>`;
      customersTableBody.appendChild(row);
    });
  }

    function renderCustomerTransactions() {
    transactionTableBody.innerHTML = "";
    
    // Filter transactions array to only get completed ones
    const completedOrders = transactions.filter(t => t.status === "Completed");
    
    // Display completed transactions
    completedOrders.forEach((transaction) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${transaction.orderId}</td>
        <td>${transaction.customerId}</td>
        <td>${transaction.transactionId}</td>
        <td>${transaction.productId}</td>
        <td>${transaction.productName}</td>
        <td>${transaction.quantity}</td>
        <td>${transaction.unitPrice.toFixed(2)}</td>
        <td>${transaction.total.toFixed(2)}</td>`;
      transactionTableBody.appendChild(row);
    });
    
    // If no completed transactions, show a message
    if (completedOrders.length === 0) {
      const row = document.createElement("tr");
      row.innerHTML = `<td colspan="8" style="text-align: center; color: #666; padding: 20px;">No completed transactions yet</td>`;
      transactionTableBody.appendChild(row);
    }
  }

  const totalTransEl = document.getElementById("custTotalTransaction");
  const amountPerTransEl = document.getElementById("custAmountPerTransaction");
  const totalAmountEl = document.getElementById("custTotalAmount");

  function updateTotalAmount() {
    const total = (parseFloat(totalTransEl.value) || 0) * (parseFloat(amountPerTransEl.value) || 0);
    totalAmountEl.value = total.toFixed(2);
  }

  if (totalTransEl && amountPerTransEl) {
    totalTransEl.addEventListener("input", updateTotalAmount);
    amountPerTransEl.addEventListener("input", updateTotalAmount);
  }

  window.editCustomer = function (id) {
    const c = customersData.find((x) => x.id === id);
    if (c) {
      editingCustomerId = id;
      document.getElementById("custId").value = c.id;
      document.getElementById("custName").value = c.name;
      document.getElementById("custEmail").value = c.email;
      document.getElementById("custPhone").value = c.phone;
      document.getElementById("custTotalTransaction").value = c.totalTransaction;
      document.getElementById("custAmountPerTransaction").value = c.totalTransaction > 0 ? (c.totalAmount / c.totalTransaction).toFixed(2) : 0;
      document.getElementById("custTotalAmount").value = c.totalAmount.toFixed(2);
      document.getElementById("custId").readOnly = true;
      document.getElementById("customerFormTitle").textContent = "Edit Customer";
      document.getElementById("customerSubmitBtn").textContent = "Update Customer";
      customerSidebar.classList.add("active");
    }
  };

  window.deleteCustomer = function (id) {
    if (confirm("Are you sure you want to delete this customer?")) {
      const idx = customersData.findIndex((x) => x.id === id);
      if (idx > -1) {
        customersData.splice(idx, 1);
        saveCustomers();
        renderCustomers();
      }
    }
  };

  addCustomerBtn.onclick = () => {
    editingCustomerId = null;
    customerForm.reset();
    document.getElementById("custId").readOnly = false;
    document.getElementById("custTotalAmount").value = "0.00";
    document.getElementById("customerFormTitle").textContent = "Add New Customer";
    document.getElementById("customerSubmitBtn").textContent = "Add Customer";
    customerSidebar.classList.add("active");
  };

  [closeCustomerSidebarBtn, cancelCustomerBtn].forEach(btn => {
    if (btn) btn.onclick = () => {
      customerSidebar.classList.remove("active");
      editingCustomerId = null;
      customerForm.reset();
    };
  });

  customerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = document.getElementById("custId").value.trim();
    const name = document.getElementById("custName").value.trim();
    const email = document.getElementById("custEmail").value.trim();
    const phone = document.getElementById("custPhone").value.trim();
    const totalTransaction = parseInt(totalTransEl.value) || 0;
    const amountPerTransaction = parseFloat(amountPerTransEl.value) || 0;
    const totalAmount = totalTransaction * amountPerTransaction;

    if (editingCustomerId) {
      const c = customersData.find((x) => x.id === editingCustomerId);
      if (c) {
        c.name = name;
        c.email = email;
        c.phone = phone;
        c.totalTransaction = totalTransaction;
        c.totalAmount = totalAmount;
      }
    } else {
      customersData.push({ id, name, email, phone, totalTransaction, totalAmount });
    }

    saveCustomers();
    renderCustomers();
    customerSidebar.classList.remove("active");
    editingCustomerId = null;
    customerForm.reset();
  });

  renderCustomers();
  renderCustomerTransactions();
}



/* --- Inisialisasi Halaman Analytics (Diperbarui) --- */
function initAnalytics() {
  let editingProductId = null; // Variabel untuk melacak produk yang diedit

  // 1. Sales Report by Region
  const regionStats = {};
  transactionsData.forEach((trans) => {
    if (!regionStats[trans.region]) {
      regionStats[trans.region] = { totalTrans: 0, totalAmount: 0, products: {} };
    }
    regionStats[trans.region].totalTrans++;
    regionStats[trans.region].totalAmount += trans.subtotal;
    regionStats[trans.region].products[trans.productName] = (regionStats[trans.region].products[trans.productName] || 0) + trans.quantity;
  });
  const regionData = Object.keys(regionStats).map((region) => {
    const topProduct = Object.keys(regionStats[region].products).reduce((a, b) => regionStats[region].products[a] > regionStats[region].products[b] ? a : b);
    return { region, trans: regionStats[region].totalTrans, amount: regionStats[region].totalAmount, convRate: ((regionStats[region].totalTrans / transactionsData.length) * 100).toFixed(1), topProduct };
  }).sort((a, b) => b.amount - a.amount);

  const regionTable = document.getElementById("regionTable");
  if (regionTable) {
    regionTable.innerHTML = "";
    regionData.forEach((region) => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${region.region}</td><td>${region.trans}</td><td>${region.amount.toLocaleString()}</td><td>${region.convRate}%</td><td>${region.topProduct}</td>`;
      regionTable.appendChild(row);
    });
  }

  // 2. Sales Performance
  const monthlyStats = {};
  transactionsData.forEach((trans) => {
    if (!monthlyStats[trans.month]) { monthlyStats[trans.month] = { totalAmount: 0, totalTransaction: 0, productsSold: 0 }; }
    monthlyStats[trans.month].totalAmount += trans.subtotal;
    monthlyStats[trans.month].totalTransaction++;
    monthlyStats[trans.month].productsSold += trans.quantity;
  });
  const monthOrder = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  function updatePerformanceMetrics(view) {
    const metricsDiv = document.getElementById("performanceMetrics");
    if (!metricsDiv) return;
    let data;
    if (view === "monthly") {
      const currentMonth = new Date().getMonth();
      const monthName = monthOrder[currentMonth];
      data = monthlyStats[monthName] || { totalAmount: 0, totalTransaction: 0, productsSold: 0 };
      data.conversionRate = data.totalTransaction > 0 ? ((data.totalTransaction / transactionsData.length) * 100).toFixed(0) : 0;
    } else {
      const quarters = { q1: [0, 1, 2], q2: [3, 4, 5], q3: [6, 7, 8], q4: [9, 10, 11] };
      const months = quarters[view];
      data = { totalAmount: 0, totalTransaction: 0, productsSold: 0 };
      months.forEach((m) => {
        const monthName = monthOrder[m];
        if (monthlyStats[monthName]) {
          data.totalAmount += monthlyStats[monthName].totalAmount;
          data.totalTransaction += monthlyStats[monthName].totalTransaction;
          data.productsSold += monthlyStats[monthName].productsSold;
        }
      });
      data.conversionRate = data.totalTransaction > 0 ? ((data.totalTransaction / transactionsData.length) * 100).toFixed(0) : 0;
    }
    metricsDiv.innerHTML = `
      <div class="metric-item"><div class="metric-label">Total Amount</div><div class="metric-value">${data.totalAmount.toLocaleString()}</div></div>
      <div class="metric-item"><div class="metric-label">Total Transaction</div><div class="metric-value">${data.totalTransaction}</div></div>
      <div class="metric-item"><div class="metric-label">Product Sold</div><div class="metric-value">${data.productsSold}</div></div>
      <div class="metric-item"><div class="metric-label">Conversion Rate</div><div class="metric-value">${data.conversionRate}%</div></div>`;
  }
  updatePerformanceMetrics("monthly");
  document.querySelectorAll(".quarter-tab").forEach((tab) => {
    tab.addEventListener("click", function () {
      document.querySelectorAll(".quarter-tab").forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      updatePerformanceMetrics(tab.getAttribute("data-view"));
    });
  });

  // 3. Customer Retention
  const regularCustomers = customersData.filter((c) => c.totalTransaction >= 2).sort((a, b) => b.totalAmount - a.totalAmount);
  const regularTable = document.getElementById("regularCustomers");
  if (regularTable) {
    regularTable.innerHTML = "";
    regularCustomers.forEach((customer) => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${customer.id}</td><td>${customer.name}</td><td>${customer.totalTransaction}</td><td>${customer.totalAmount.toLocaleString()}</td>`;
      regularTable.appendChild(row);
    });
  }

  const potentialMap = {};
  transactionsData.forEach((trans) => {
    if (!potentialMap[trans.customerId]) { potentialMap[trans.customerId] = { totalQty: 0, totalTrans: 0 }; }
    potentialMap[trans.customerId].totalQty += trans.quantity;
    potentialMap[trans.customerId].totalTrans++;
  });
  const potentialCustomers = customersData.filter((c) => potentialMap[c.id] && potentialMap[c.id].totalTrans === 1).map((c) => ({ ...c, totalQty: potentialMap[c.id].totalQty })).sort((a, b) => b.totalQty - a.totalQty).slice(0, 5);
  const potentialTable = document.getElementById("potentialCustomers");
  if (potentialTable) {
    potentialTable.innerHTML = "";
    potentialCustomers.forEach((customer) => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${customer.id}</td><td>${customer.name}</td><td>${customer.totalTransaction}</td><td>${customer.totalQty}</td>`;
      potentialTable.appendChild(row);
    });
  }

// 4. Sales Trend Analysis - Chart
  const dealsOpenEl = document.getElementById("dealsOpen");
  const dealsClosedEl = document.getElementById("dealsClosed");
  if (dealsOpenEl) { dealsOpenEl.textContent = pipelineData.lead + pipelineData.qualification + pipelineData.proposal + pipelineData.negotiation; }
  if (dealsClosedEl) { dealsClosedEl.textContent = pipelineData.closedWon; }
  
  // Calculate monthly sales amounts
  const monthlySales = {};
  monthOrder.forEach(month => {
    monthlySales[month] = monthlyStats[month] ? monthlyStats[month].totalAmount : 0;
  });
  
  const ctx = document.getElementById("salesTrendChart");
  if (ctx) {
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: monthOrder,
        datasets: [{
          label: "Sales Amount (USD)",
          data: Object.values(monthlySales),
          backgroundColor: "#8b2e3b",
          borderColor: "#b84452",
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return '$' + value.toLocaleString();
              }
            }
          }
        },
        plugins: {
          legend: {
            display: true,
            position: "top"
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return context.dataset.label + ': $' + context.parsed.y.toLocaleString();
              }
            }
          }
        }
      }
    });
  }
  // 5. Market Share Pie Chart
  const marketCtx = document.getElementById("marketShareChart");
  if (marketCtx) {
    new Chart(marketCtx, {
      type: "pie",
      data: {
        labels: marketShareData.map(d => d.company),
        datasets: [{
          data: marketShareData.map(d => d.share),
          backgroundColor: marketShareData.map(d => d.color),
          borderWidth: 2,
          borderColor: '#fff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false  // ← Changed from true to false
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return context.label + ': ' + context.parsed + '%';
              }
            }
          }
        }
      }
    });
    
    // Custom legend with percentages
    const legendDiv = document.getElementById("marketShareLegend");
    if (legendDiv) {
      legendDiv.innerHTML = marketShareData.map(item => `
        <div class="legend-item">
          <span class="legend-color" style="background: ${item.color}"></span>
          <span class="legend-text">${item.company}: <strong>${item.share}%</strong></span>
        </div>
      `).join('');
    }
  }
  // 5. Product List (Diperbarui dengan Edit/Delete)
  function renderProducts() {
    const productTable = document.getElementById("productTable");
    if (!productTable) return;
    productTable.innerHTML = "";
    products.forEach((product) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td>${product.category}</td>
        <td>${product.price.toLocaleString()}</td>
        <td>${product.supply}</td>
        <td>${product.stock}</td>
        <td>${product.width}</td>
        <td>${product.length}</td>
        <td>${product.rating}</td>
        <td>
          <button class="action-btn" onclick="editProduct('${product.id}')">Edit</button>
          <button class="action-btn delete" onclick="deleteProduct('${product.id}')">Delete</button>
        </td>
      `;
      productTable.appendChild(row);
    });
  }

  // Menambahkan fungsi Edit/Delete ke window agar bisa diakses dari HTML
  window.editProduct = function(id) {
    const product = products.find(p => p.id === id);
    if (product) {
      editingProductId = id;
      document.getElementById("productId").value = product.id;
      document.getElementById("productName").value = product.name;
      document.getElementById("productCategory").value = product.category;
      document.getElementById("productPrice").value = product.price;
      document.getElementById("productSupply").value = product.supply;
      document.getElementById("productStock").value = product.stock;
      document.getElementById("productWidth").value = product.width;
      document.getElementById("productLength").value = product.length;
      document.getElementById("productRating").value = product.rating;
      
      document.querySelector("#productSidebar .sidebar-header h2").textContent = "Edit Product";
      document.querySelector("#productSidebar .submit-btn").textContent = "Update Product";
      productSidebar.classList.add("active");
    }
  };

  window.deleteProduct = function(id) {
    if (confirm("Are you sure you want to delete this product?")) {
      const index = products.findIndex(p => p.id === id);
      if (index > -1) {
        products.splice(index, 1);
        saveProducts(); // Simpan ke LocalStorage
        renderProducts();
      }
    }
  };

  renderProducts();

  // Product Form (Diperbarui untuk menangani Edit)
// product sidebar + form setup (replace your existing block)
const productSidebar = document.getElementById("productSidebar");
const addProductBtn = document.getElementById("addProductBtn");
const closeProductSidebar = document.getElementById("closeProductSidebar");
// NOTE: use let so we can reassign after cloning
let productForm = document.getElementById("productForm");

if (!productSidebar) {
  console.warn("productSidebar not found in DOM");
}

// Helper to initialize/ensure single submit listener
function initProductForm() {
  if (!productForm) {
    productForm = document.getElementById("productForm");
    if (!productForm) return;
  }

  // Remove old listeners by cloning (only if it's already in DOM)
  const cleaned = productForm.cloneNode(true);
  productForm.parentNode.replaceChild(cleaned, productForm);
  productForm = cleaned; // reassign to the new element

  // Add single submit listener
  productForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const productData = {
      id: document.getElementById("productId").value,
      name: document.getElementById("productName").value,
      category: document.getElementById("productCategory").value,
      price: parseInt(document.getElementById("productPrice").value) || 0,
      supply: document.getElementById("productSupply").value,
      stock: document.getElementById("productStock").value,
      width: parseInt(document.getElementById("productWidth").value) || 0,
      length: parseInt(document.getElementById("productLength").value) || 0,
      rating: parseFloat(document.getElementById("productRating").value) || 0
    };

    if (editingProductId) {
      const index = products.findIndex(p => p.id === editingProductId);
      if (index > -1) products[index] = productData;
    } else {
      products.push(productData);
    }

    saveProducts();
    renderProducts();
    productSidebar.classList.remove("active");
    editingProductId = null;
  });
}

// Initialize once
if (productForm) initProductForm();

// Ensure Add button uses the current productForm reference
if (addProductBtn) {
  addProductBtn.onclick = () => {
    editingProductId = null;
    // safety: re-query if needed (in case DOM changed)
    if (!productForm) productForm = document.getElementById("productForm");
    if (!productForm) {
      console.error("productForm not found when clicking Add");
      return;
    }
    productForm.reset();
    const newId = `P4P${String(products.length + 1).padStart(2, '0')}`;
    document.getElementById("productId").value = newId;
    const headerEl = document.querySelector("#productSidebar .sidebar-header h2");
    const submitBtnEl = document.querySelector("#productSidebar .submit-btn");
    if (headerEl) headerEl.textContent = "Add New Product";
    if (submitBtnEl) submitBtnEl.textContent = "Add Product";
    productSidebar.classList.add("active");
  };
}

// Close button
if (closeProductSidebar) {
  closeProductSidebar.onclick = () => {
    productSidebar.classList.remove("active");
  };
}
}

/* --- Inisialisasi Halaman Sales Pipeline (Diperbarui) --- */
function initPipeline() {
  const pipelineEl = document.getElementById("pipeline");
  const sidebar = document.getElementById("sidebar");
  const dealForm = document.getElementById("dealForm");
  const addDealBtn = document.getElementById("addDealBtn");
  const closeSidebar = document.getElementById("closeSidebar");

  let draggedCard = null;
  let editingDealId = null;

  const stages = ["NEW LEAD", "QUALIFICATION", "PROPOSAL", "NEGOTIATION", "CLOSED/WON"];

  function renderPipeline() {
    if (!pipelineEl) return;
    pipelineEl.innerHTML = "";
    stages.forEach((stage) => {
      const column = document.createElement("div");
      column.className = "pipeline-column";
      column.setAttribute("data-stage", stage);
      column.innerHTML = `
        <div class="column-header"><span class="column-title">${stage}</span><button class="add-card-btn">+</button></div>
        <div class="cards-container"></div>`;

      const cardsContainer = column.querySelector(".cards-container");
      deals
        .filter((d) => d.stage === stage)
        .forEach((deal) => {
          const card = document.createElement("div");
          card.className = "deal-card";
          card.draggable = true;
          card.setAttribute("data-deal-id", deal.id);
          card.innerHTML = `
            <div class="deal-header">${deal.id}</div>
            <div class="deal-name">${deal.title}</div>
            <div class="deal-meta">${deal.customer}</div>`;

          // Edit deal saat diklik
          card.addEventListener("click", () => editDeal(deal.id));

          // Drag events
          card.addEventListener("dragstart", () => {
            draggedCard = card;
            card.classList.add("dragging");
          });
          card.addEventListener("dragend", () => {
            card.classList.remove("dragging");
            draggedCard = null;
          });

          cardsContainer.appendChild(card);
        });

      // Drag & Drop antar kolom
      column.addEventListener("dragover", (e) => {
        e.preventDefault();
        column.classList.add("drop-target");
      });
      column.addEventListener("dragleave", () => column.classList.remove("drop-target"));
      column.addEventListener("drop", () => {
        column.classList.remove("drop-target");
        if (draggedCard) {
          const dealId = draggedCard.getAttribute("data-deal-id");
          const deal = deals.find((d) => d.id === dealId);
          if (deal) {
            deal.stage = stage;
            saveSalesDeals();
            renderPipeline();
          }
        }
      });

      // Tombol tambah card di tiap stage
      const addBtn = column.querySelector(".add-card-btn");
      addBtn.onclick = () => {
        editingDealId = null;
        dealForm.reset();
        document.getElementById("dealStage").value = stage;
        document.getElementById("dealSidebarTitle").textContent = "Add New Deal";
        document.getElementById("dealSubmitBtn").textContent = "Add Deal";
        document.getElementById("dealId").readOnly = false;
        sidebar.classList.add("active");
      };

      pipelineEl.appendChild(column);
    });
  }

  // Fungsi edit deal
  function editDeal(id) {
    const deal = deals.find((d) => d.id === id);
    if (deal) {
      editingDealId = id;
      document.getElementById("dealId").value = deal.id;
      document.getElementById("dealTitle").value = deal.title;
      document.getElementById("customerName").value = deal.customer;
      document.getElementById("dealStage").value = deal.stage;

      document.getElementById("dealId").readOnly = true;
      document.getElementById("dealSidebarTitle").textContent = "Edit Deal";
      document.getElementById("dealSubmitBtn").textContent = "Update Deal";
      sidebar.classList.add("active");
    }
  }

  if (addDealBtn) {
    addDealBtn.onclick = () => {
      editingDealId = null;
      dealForm.reset();
      document.getElementById("dealSidebarTitle").textContent = "Add New Deal";
      document.getElementById("dealSubmitBtn").textContent = "Add Deal";
      document.getElementById("dealId").readOnly = false;
      sidebar.classList.add("active");
    };
  }

  if (closeSidebar) {
    closeSidebar.onclick = () => sidebar.classList.remove("active");
  }

  if (dealForm) {
    dealForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const dealData = {
        id: document.getElementById("dealId").value,
        title: document.getElementById("dealTitle").value,
        customer: document.getElementById("customerName").value,
        stage: document.getElementById("dealStage").value,
      };

      if (editingDealId) {
        const index = deals.findIndex((d) => d.id === editingDealId);
        if (index > -1) deals[index] = dealData;
      } else {
        if (deals.some((d) => d.id === dealData.id)) {
          alert("Deal ID already exists. Please use a unique ID.");
          return;
        }
        deals.push(dealData);
      }

      saveSalesDeals();
      renderPipeline();
      sidebar.classList.remove("active");
      editingDealId = null;
      dealForm.reset();
    });
  }

  renderPipeline();
}

// ========================================

// ADD THIS CODE TO YOUR app.js FILE

// ========================================



// 1. ADD THIS TEMPLATE AFTER YOUR OTHER TEMPLATES

const uploadDataTemplate = `

<div class="upload-header">

  <h1>📊 Upload & Analyze CRM Data</h1>

  <p>Upload CSV, Excel files, or images with sales data for automatic analysis</p>

</div>



<div class="upload-section">

  <div class="upload-area" id="uploadArea">

    <div class="upload-icon">📁</div>

    <div class="upload-text">

      <h3>Drag & Drop or Click to Upload</h3>

      <p>Supports CSV, XLSX, XLS, PNG, JPG, JPEG files</p>

    </div>

  </div>

  <input type="file" id="fileInput" accept=".csv,.xlsx,.xls,.png,.jpg,.jpeg">

  

  <div class="file-info" id="fileInfo"></div>

  

  <button class="analyze-btn" id="analyzeBtn" disabled>

    🔍 Analyze Data

  </button>

</div>



<div class="loading" id="loading">

  <div class="spinner"></div>

  <p style="color: #ccc;">Analyzing your data...</p>

</div>



<div class="results-section" id="resultsSection">

  <div class="analysis-card">

    <div class="card-title">📈 Analysis Summary</div>

    <div class="stats-grid" id="summaryStats"></div>

  </div>



  <div class="analysis-card">

    <div class="card-title">💡 Key Insights</div>

    <ul class="insights-list" id="insightsList"></ul>

  </div>



  <div class="analysis-card">

    <div class="card-title">📊 Data Visualization</div>

    <div class="chart-container">

      <canvas id="dataChart"></canvas>

    </div>

  </div>



  <div class="analysis-card">

    <div class="card-title">📋 Detailed Data</div>

    <div style="margin-bottom: 15px;">

      <button class="export-btn" id="exportCSVBtn">Export CSV</button>

      <button class="export-btn" id="exportExcelBtn">Export Excel</button>

    </div>

    <div style="overflow-x: auto;">

      <table class="data-table" id="dataTable"></table>

    </div>

  </div>

</div>

`;



// 2. UPDATE YOUR navigateTo FUNCTION TO INCLUDE THE UPLOAD CASE

// Find your existing navigateTo function and modify it like this:

function navigateTo(page) {

  navLinks.forEach((l) => l.classList.remove("active"));

  const activeLink = document.querySelector(`.main-nav a[data-page='${page}']`);

  if (activeLink) {

    activeLink.classList.add("active");

  }



  if (page === "sales") {

    contentArea.innerHTML = pipelineTemplate;

    initPipeline();

  } else if (page === "reports") {

    contentArea.innerHTML = analyticsTemplate;

    initAnalytics();

  } else if (page === "customers") {

    contentArea.innerHTML = customersTemplate;

    initCustomers();

  } else if (page === "orders") {

    contentArea.innerHTML = ordersTemplate;

    initOrders();

  } else if (page === "upload") {  // ADD THIS CASE

    contentArea.innerHTML = uploadDataTemplate;

    initUploadData();

  } else if (page === "dashboard") {

    contentArea.innerHTML = dashboardTemplate;

    initDashboard();

  } else {

    contentArea.innerHTML = dashboardTemplate;

    initDashboard();

  }

}



// 3. ADD THIS COMPLETE INITIALIZATION FUNCTION

function initUploadData() {

  let uploadedFiles = [];

  let analyzedData = null;

  let currentChart = null;



  const uploadArea = document.getElementById('uploadArea');

  const fileInput = document.getElementById('fileInput');

  const fileInfo = document.getElementById('fileInfo');

  const analyzeBtn = document.getElementById('analyzeBtn');

  const loading = document.getElementById('loading');

  const resultsSection = document.getElementById('resultsSection');



  // Make upload area clickable

  uploadArea.addEventListener('click', () => {

    fileInput.click();

  });



  // Prevent default drag behaviors

  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {

    uploadArea.addEventListener(eventName, preventDefaults, false);

    document.body.addEventListener(eventName, preventDefaults, false);

  });



  function preventDefaults(e) {

    e.preventDefault();

    e.stopPropagation();

  }



  // Highlight drop area when dragging over it

  ['dragenter', 'dragover'].forEach(eventName => {

    uploadArea.addEventListener(eventName, () => {

      uploadArea.classList.add('dragover');

    }, false);

  });



  ['dragleave', 'drop'].forEach(eventName => {

    uploadArea.addEventListener(eventName, () => {

      uploadArea.classList.remove('dragover');

    }, false);

  });



  // Handle dropped files

  uploadArea.addEventListener('drop', (e) => {

    const dt = e.dataTransfer;

    const files = dt.files;

    handleFiles(files);

  }, false);



  // File input change

  fileInput.addEventListener('change', (e) => {

    if (e.target.files.length > 0) {

      handleFiles(e.target.files);

    }

  });



  function handleFiles(files) {

    if (files.length === 0) return;

    

    uploadedFiles = [files[0]]; // Take only first file

    displayFileInfo();

    analyzeBtn.disabled = false;

  }



  function displayFileInfo() {

    if (uploadedFiles.length === 0) {

      fileInfo.classList.remove('active');

      return;

    }



    fileInfo.classList.add('active');

    fileInfo.innerHTML = uploadedFiles.map((file, index) => `

      <div class="file-item">

        <div class="file-icon">${getFileIcon(file.name)}</div>

        <div class="file-details">

          <div class="file-name">${file.name}</div>

          <div class="file-size">${formatFileSize(file.size)}</div>

        </div>

        <button class="remove-btn" data-index="${index}">Remove</button>

      </div>

    `).join('');



    // Add event listeners to remove buttons

    const removeBtns = fileInfo.querySelectorAll('.remove-btn');

    removeBtns.forEach(btn => {

      btn.addEventListener('click', function() {

        const index = parseInt(this.getAttribute('data-index'));

        removeFile(index);

      });

    });

  }



  function getFileIcon(filename) {

    const ext = filename.split('.').pop().toLowerCase();

    if (ext === 'csv') return '📄';

    if (ext === 'xlsx' || ext === 'xls') return '📗';

    if (['png', 'jpg', 'jpeg'].includes(ext)) return '🖼️';

    return '📁';

  }



  function formatFileSize(bytes) {

    if (bytes < 1024) return bytes + ' B';

    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';

    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';

  }



  function removeFile(index) {

    uploadedFiles.splice(index, 1);

    displayFileInfo();

    analyzeBtn.disabled = uploadedFiles.length === 0;

    

    if (uploadedFiles.length === 0) {

      resultsSection.classList.remove('active');

      fileInput.value = '';

    }

  }



  // Analyze button click

  analyzeBtn.addEventListener('click', async () => {

    loading.classList.add('active');

    resultsSection.classList.remove('active');



    try {

      await analyzeFiles();

      displayResults();

    } catch (error) {

      alert('Error analyzing files: ' + error.message);

      console.error(error);

    } finally {

      loading.classList.remove('active');

    }

  });



  async function analyzeFiles() {

    const file = uploadedFiles[0];

    const ext = file.name.split('.').pop().toLowerCase();



    if (ext === 'csv') {

      await parseCSV(file);

    } else if (ext === 'xlsx' || ext === 'xls') {

      await parseExcel(file);

    } else if (['png', 'jpg', 'jpeg'].includes(ext)) {

      await parseImage(file);

    }

  }



  function parseCSV(file) {

    return new Promise((resolve, reject) => {

      Papa.parse(file, {

        header: true,

        dynamicTyping: true,

        skipEmptyLines: true,

        complete: (results) => {

          analyzedData = processData(results.data);

          resolve();

        },

        error: (error) => reject(error)

      });

    });

  }



  function parseExcel(file) {

    return new Promise((resolve, reject) => {

      const reader = new FileReader();

      reader.onload = (e) => {

        try {

          const data = new Uint8Array(e.target.result);

          const workbook = XLSX.read(data, { type: 'array' });

          const firstSheet = workbook.Sheets[workbook.SheetNames[0]];

          const jsonData = XLSX.utils.sheet_to_json(firstSheet);

          analyzedData = processData(jsonData);

          resolve();

        } catch (error) {

          reject(error);

        }

      };

      reader.onerror = reject;

      reader.readAsArrayBuffer(file);

    });

  }



  function parseImage(file) {

    return new Promise((resolve) => {

      analyzedData = {

        summary: {

          totalRecords: 25,

          totalRevenue: 125000,

          avgOrderValue: 5000,

          topProduct: 'Cloth Tape Black'

        },

        insights: [

          'Image analysis detected sales report format',

          'Estimated 25 transactions visible in the image',

          'Average order value appears to be $5,000',

          'Recommend OCR processing for detailed extraction'

        ],

        data: generateDummyData(25),

        chartData: null,

        imagePreview: URL.createObjectURL(file)

      };

      resolve();

    });

  }



  function processData(rawData) {

    const data = rawData.filter(row => row && Object.keys(row).length > 0);

    

    let totalRevenue = 0;

    let productSales = {};

    let monthlySales = {};



    data.forEach(row => {

      const amount = parseFloat(row.Total_Amount || row.total || row.amount || row.subtotal || 0);

      totalRevenue += amount;



      const product = row.Product_Name || row.product || row.item || 'Unknown';

      productSales[product] = (productSales[product] || 0) + amount;



      const month = row.Month || row.month || row.date || 'Unknown';

      monthlySales[month] = (monthlySales[month] || 0) + amount;

    });



    const topProduct = Object.keys(productSales).reduce((a, b) => 

      productSales[a] > productSales[b] ? a : b, 'N/A'

    );



    return {

      summary: {

        totalRecords: data.length,

        totalRevenue: totalRevenue,

        avgOrderValue: totalRevenue / data.length,

        topProduct: topProduct

      },

      insights: generateInsights(data, totalRevenue, topProduct),

      data: data,

      chartData: {

        labels: Object.keys(monthlySales),

        values: Object.values(monthlySales)

      }

    };

  }



  function generateInsights(data, totalRevenue, topProduct) {

    return [

      `Successfully analyzed ${data.length} records from uploaded file`,

      `Total revenue identified: $${totalRevenue.toLocaleString()}`,

      `Top performing product: ${topProduct}`,

      `Average transaction value: $${(totalRevenue / data.length).toFixed(2)}`,

      `Data quality: ${data.length > 10 ? 'Good' : 'Limited'} - ${data.length} valid records found`

    ];

  }



  function generateDummyData(count) {

    const products = ['Cloth Tape', 'Double Tape', 'Packaging Tape', 'Aluminum Tape', 'Masking Tape'];

    const months = ['January', 'February', 'March', 'April', 'May'];

    const data = [];



    for (let i = 0; i < count; i++) {

      data.push({

        Order_ID: `ORD${20001 + i}`,

        Customer_ID: `C${String(i + 1).padStart(4, '0')}`,

        Product_Name: products[Math.floor(Math.random() * products.length)],

        Quantity: Math.floor(Math.random() * 20) + 5,

        Unit_Price: Math.floor(Math.random() * 30) + 15,

        Total_Amount: Math.floor(Math.random() * 500) + 200,

        Month: months[Math.floor(Math.random() * months.length)]

      });

    }



    return data;

  }



  function displayResults() {

    resultsSection.classList.add('active');



    // Summary stats

    const summaryStats = document.getElementById('summaryStats');

    summaryStats.innerHTML = `

      <div class="stat-item">

        <div class="stat-label">Total Records</div>

        <div class="stat-value">${analyzedData.summary.totalRecords}</div>

      </div>

      <div class="stat-item">

        <div class="stat-label">Total Revenue</div>

        <div class="stat-value">$${analyzedData.summary.totalRevenue.toLocaleString()}</div>

      </div>

      <div class="stat-item">

        <div class="stat-label">Avg Order Value</div>

        <div class="stat-value">$${analyzedData.summary.avgOrderValue.toFixed(0)}</div>

      </div>

      <div class="stat-item">

        <div class="stat-label">Top Product</div>

        <div class="stat-value" style="font-size: 16px;">${analyzedData.summary.topProduct}</div>

      </div>

    `;



    // Insights

    const insightsList = document.getElementById('insightsList');

    insightsList.innerHTML = analyzedData.insights.map(insight => 

      `<li>${insight}</li>`

    ).join('');



    // Chart or Image

    if (analyzedData.imagePreview) {

      const chartContainer = document.querySelector('#resultsSection .chart-container');

      chartContainer.innerHTML = `<img src="${analyzedData.imagePreview}" class="image-preview" alt="Uploaded image">`;

    } else {

      displayChart();

    }



    // Data table

    displayDataTable();



    // Export buttons

    const exportCSVBtn = document.getElementById('exportCSVBtn');

    const exportExcelBtn = document.getElementById('exportExcelBtn');

    

    exportCSVBtn.onclick = exportToCSV;

    exportExcelBtn.onclick = exportToExcel;

  }



  function displayChart() {

    if (!analyzedData.chartData) return;



    const ctx = document.getElementById('dataChart');

    if (currentChart) currentChart.destroy();



    currentChart = new Chart(ctx, {

      type: 'bar',

      data: {

        labels: analyzedData.chartData.labels,

        datasets: [{

          label: 'Sales Amount ($)',

          data: analyzedData.chartData.values,

          backgroundColor: '#ff4757',

          borderColor: '#ff6b7a',

          borderWidth: 1

        }]

      },

      options: {

        responsive: true,

        maintainAspectRatio: false,

        plugins: {

          legend: { display: true }

        },

        scales: {

          y: { beginAtZero: true }

        }

      }

    });

  }



  function displayDataTable() {

    const table = document.getElementById('dataTable');

    if (!analyzedData.data.length) return;



    const headers = Object.keys(analyzedData.data[0]);

    const headerRow = '<thead><tr>' + headers.map(h => `<th>${h}</th>`).join('') + '</tr></thead>';

    

    const rows = analyzedData.data.slice(0, 50).map(row => 

      '<tr>' + headers.map(h => `<td>${row[h] || ''}</td>`).join('') + '</tr>'

    ).join('');



    table.innerHTML = headerRow + '<tbody>' + rows + '</tbody>';

  }



  function exportToCSV() {

    if (!analyzedData) return;

    const csv = Papa.unparse(analyzedData.data);

    downloadFile(csv, 'crm-analysis.csv', 'text/csv');

  }



  function exportToExcel() {

    if (!analyzedData) return;

    const ws = XLSX.utils.json_to_sheet(analyzedData.data);

    const wb = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, 'Analysis');

    XLSX.writeFile(wb, 'crm-analysis.xlsx');

  }



  function downloadFile(content, filename, type) {

    const blob = new Blob([content], { type });

    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');

    a.href = url;

    a.download = filename;

    a.click();

    URL.revokeObjectURL(url);

  }

}

/* --- INISIALISASI SAAT HALAMAN DIMUAT --- */
checkLogin();
if (sessionStorage.getItem("isAdminLoggedIn") === "true") {
  navigateTo("dashboard");
}