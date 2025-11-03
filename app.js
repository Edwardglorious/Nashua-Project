const loginView = document.getElementById("login-view");
const dashboardView = document.getElementById("dashboard-view");
const loginForm = document.getElementById("login-form");
const username = document.getElementById("username");
const password = document.getElementById("password");
const errorMsg = document.getElementById("error-message");
const logoutBtn = document.getElementById("logout-link");
const navLinks = document.querySelectorAll(".main-nav a");
const contentArea = document.querySelector(".content-area");

const validUser1 = "admin@gmail.com";
const validUser2 = "admin1";
const validPass = "admin123";

// Sample data - Customers
const customersData = [
  { id: "C0001", name: "Alex Tan", email: "alex@company.com", phone: "+62-811-1111", totalTransaction: 15, totalAmount: 9500 },
  { id: "C0002", name: "Benjamin Lee", email: "ben@company.com", phone: "+62-811-2222", totalTransaction: 12, totalAmount: 8200 },
  { id: "C0003", name: "Catherine Wong", email: "cat@company.com", phone: "+62-811-3333", totalTransaction: 10, totalAmount: 7800 },
  { id: "C0004", name: "David Chen", email: "david@company.com", phone: "+62-811-4444", totalTransaction: 9, totalAmount: 6900 },
  { id: "C0005", name: "Emily Zhang", email: "emily@company.com", phone: "+62-811-5555", totalTransaction: 8, totalAmount: 6450 },
  { id: "C0006", name: "Frank Yusuf", email: "frank@company.com", phone: "+62-811-6666", totalTransaction: 22, totalAmount: 15600 },
  { id: "C0007", name: "Grace Kim", email: "grace@company.com", phone: "+62-811-7777", totalTransaction: 18, totalAmount: 12300 },
  { id: "C0008", name: "Henry Gunawan", email: "henry@company.com", phone: "+62-811-8888", totalTransaction: 14, totalAmount: 9800 },
  { id: "C0009", name: "Irene Susilo", email: "irene@company.com", phone: "+62-811-9999", totalTransaction: 11, totalAmount: 7500 },
  { id: "C0010", name: "Jason Hartono", email: "jason@company.com", phone: "+62-811-0000", totalTransaction: 25, totalAmount: 18900 },
  { id: "C0011", name: "Karen Lim", email: "karen@company.com", phone: "+62-811-1212", totalTransaction: 3, totalAmount: 4200 },
  { id: "C0012", name: "Leo Tan", email: "leo@company.com", phone: "+62-811-1313", totalTransaction: 1, totalAmount: 850 },
];

// Sample data - Transactions
const transactionsData = [
  { orderId: "20001", customerId: "C0001", transactionId: "TXN001", productId: "P4P02", productName: "Masking 2\" Tape", quantity: 5, unitPrice: 45, subtotal: 225, month: "January", region: "Asia Pacific (APAC)" },
  { orderId: "20002", customerId: "C0001", transactionId: "TXN001", productId: "P4P03", productName: "EcoSeal Tape", quantity: 3, unitPrice: 60, subtotal: 180, month: "January", region: "Asia Pacific (APAC)" },
  { orderId: "20003", customerId: "C0002", transactionId: "TXN002", productId: "P4P04", productName: "Masking 2\" Tape", quantity: 10, unitPrice: 45, subtotal: 450, month: "February", region: "Asia Pacific (APAC)" },
  { orderId: "20004", customerId: "C0002", transactionId: "TXN002", productId: "P4P05", productName: "EcoSeal Tape", quantity: 2, unitPrice: 60, subtotal: 120, month: "February", region: "North America" },
  { orderId: "20005", customerId: "C0003", transactionId: "TXN003", productId: "P4P06", productName: "PowerBond Hitam", quantity: 8, unitPrice: 55, subtotal: 440, month: "March", region: "Europe" },
  { orderId: "20006", customerId: "C0004", transactionId: "TXN004", productId: "P4P07", productName: "Masking 2\" Tape", quantity: 15, unitPrice: 45, subtotal: 675, month: "April", region: "Asia Pacific (APAC)" },
  { orderId: "20007", customerId: "C0004", transactionId: "TXN004", productId: "P4P08", productName: "EcoSeal Tape", quantity: 4, unitPrice: 60, subtotal: 240, month: "April", region: "Latin America (LATAM)" },
  { orderId: "20008", customerId: "C0005", transactionId: "TXN005", productId: "P4P09", productName: "PowerBond Hitam", quantity: 6, unitPrice: 55, subtotal: 330, month: "May", region: "North America" },
  { orderId: "20009", customerId: "C0006", transactionId: "TXN006", productId: "P4P01", productName: "UltraGrip 2 Tape", quantity: 20, unitPrice: 70, subtotal: 1400, month: "May", region: "North America" },
  { orderId: "20010", customerId: "C0007", transactionId: "TXN007", productId: "P4P02", productName: "PowerBond Heavy Duty", quantity: 12, unitPrice: 80, subtotal: 960, month: "June", region: "Europe" },
  { orderId: "20011", customerId: "C0008", transactionId: "TXN008", productId: "P4P03", productName: "Clear Tape Pro", quantity: 18, unitPrice: 35, subtotal: 630, month: "July", region: "Asia Pacific (APAC)" },
  { orderId: "20012", customerId: "C0009", transactionId: "TXN009", productId: "P4P04", productName: "Double Sided Premium", quantity: 7, unitPrice: 65, subtotal: 455, month: "August", region: "North America" },
  { orderId: "20013", customerId: "C0010", transactionId: "TXN010", productId: "P4P05", productName: "Foam Tape XL", quantity: 25, unitPrice: 75, subtotal: 1875, month: "September", region: "Latin America (LATAM)" },
  { orderId: "20014", customerId: "C0011", transactionId: "TXN011", productId: "P4P06", productName: "Aluminum Reflective", quantity: 9, unitPrice: 90, subtotal: 810, month: "October", region: "Europe" },
  { orderId: "20015", customerId: "C0012", transactionId: "TXN012", productId: "P4P07", productName: "Warning Stripe Tape", quantity: 14, unitPrice: 40, subtotal: 560, month: "November", region: "Asia Pacific (APAC)" },
];

// Pipeline data
const pipelineData = {
  lead: 99,
  qualification: 40,
  proposal: 15,
  negotiation: 8,
  closedWon: 62,
};

// Products data
let products = [
  { id: "P4P01", name: "Nashua Top1 Cloth Tape Black (25 mm x 5 y)", category: "Cloth Tape", price: 26000, supply: "Active", stock: "Active", width: 25, length: 5, rating: 4.8 },
  { id: "P4P02", name: "Nashua Top1 Double Tape", category: "Double Tape", price: 24000, supply: "Active", stock: "Active", width: 24, length: 5, rating: 4.6 },
  { id: "P4P03", name: "Nashua Top1 Clear Tape", category: "Clear Tape", price: 18000, supply: "Active", stock: "Active", width: 48, length: 90, rating: 4.7 },
  { id: "P4P04", name: "Nashua Top1 Latkain Coklat", category: "Packaging Tape", price: 19000, supply: "Active", stock: "Active", width: 48, length: 90, rating: 4.5 },
  { id: "P4P05", name: "Nashua Top1 Aluminum Tape (40mm x 30y)", category: "Aluminum Tape", price: 35000, supply: "Active", stock: "Active", width: 40, length: 30, rating: 4.8 },
  { id: "P4P06", name: "Nashua Top1 Masking Tape Kuning", category: "Masking Tape", price: 22000, supply: "Active", stock: "Active", width: 48, length: 18, rating: 4.4 },
  { id: "P4P07", name: "Nashua Top1 Double Foam Tape", category: "Foam Tape", price: 27000, supply: "Active", stock: "Active", width: 24, length: 5, rating: 4.7 },
  { id: "P4P08", name: "Nashua Top1 3/4 Isolasi Tape Clear", category: "Clear Tape", price: 17000, supply: "Active", stock: "Active", width: 19, length: 8, rating: 4.6 },
  { id: "P4P09", name: "Nashua Top1 Warning Tape", category: "Warning Tape", price: 15000, supply: "Active", stock: "Active", width: 48, length: 100, rating: 4.3 },
  { id: "P4P10", name: "Nashua Top1 Latkain Blue Kuning OPP", category: "Packaging Tape", price: 20000, supply: "Active", stock: "Active", width: 48, length: 90, rating: 4.5 },
  { id: "P4P11", name: "Nashua Top1 Fragile Tape (48mm x 66m)", category: "Warning Tape", price: 22000, supply: "Active", stock: "Active", width: 48, length: 66, rating: 4.8 },
];

/* ===== HTML TEMPLATES FOR DYNAMIC CONTENT ===== */

const dashboardTemplate = `
<div class="analytics-dashboard">
  <div class="card">
    <div class="card-header">Top 10 Customers</div>
    <table class="customers-table">
      <thead>
        <tr>
          <th>Customer_ID</th>
          <th>Customer</th>
          <th>Total_Transaction</th>
          <th>Total_Amount (USD)</th>
        </tr>
      </thead>
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

  <div class="card">
    <div class="card-header">Performance Summary</div>
    <div class="performance-grid">
      <div class="performance-card">
        <div class="performance-title">Monthly Total Sales</div>
        <div class="performance-value">$285k</div>
      </div>
      <div class="performance-card">
        <div class="performance-title">Lead Conversion Rate</div>
        <div class="performance-value">68%</div>
      </div>
      <div class="performance-card">
        <div class="performance-title">Monthly Deal Closed</div>
        <div class="performance-value">47</div>
      </div>
      <div class="performance-card">
        <div class="performance-title">Qualified Leads</div>
        <div class="performance-value">156</div>
      </div>
      <div class="performance-card">
        <div class="performance-title">Sales Closed</div>
        <div class="performance-value">234</div>
      </div>
      <div class="performance-card">
        <div class="performance-title">Monthly sold units</div>
        <div class="performance-value">1,847</div>
      </div>
    </div>
  </div>

  <div class="card">
    <div class="card-header">Pending Follow Up</div>
    <table class="followup-table">
      <thead>
        <tr>
          <th>Transaction_ID</th>
          <th>Customer_ID</th>
          <th>Transaction_Date</th>
          <th>Payment_Method</th>
          <th>Est_Amount (USD)</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>TXN045</td><td>C1205</td><td>2025-11-05</td><td>Bank Transfer</td><td>5,200</td><td>Pending</td></tr>
        <tr><td>TXN046</td><td>C1208</td><td>2025-11-06</td><td>Credit Card</td><td>3,800</td><td>Pending</td></tr>
        <tr><td>TXN047</td><td>C1212</td><td>2025-11-08</td><td>PayPal</td><td>4,500</td><td>Pending</td></tr>
      </tbody>
    </table>
  </div>

  <div class="card">
    <div class="card-header">Newest Order</div>
    <table class="order-table">
      <thead>
        <tr>
          <th>Order_ID</th>
          <th>Customer_ID</th>
          <th>Transaction_ID</th>
          <th>Product_Name</th>
          <th>Quantity</th>
          <th>Total_Price</th>
          <th>Date</th>
        </tr>
      </thead>
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
        <div class="pipeline-stage-name">Lead</div>
      </div>
      <div class="pipeline-stage">
        <div class="pipeline-stage-name">Qualification</div>
      </div>
      <div class="pipeline-stage">
        <div class="pipeline-stage-name">Proposal</div>
      </div>
      <div class="pipeline-stage">
        <div class="pipeline-stage-name">Negotiation</div>
      </div>
    </div>
  </div>
</div>
`;

const customersTemplate = `
<div class="customers-wrapper">
  <div class="section">
    <div class="section-header">
      <h2 class="section-title">Customer Lists</h2>
      <button class="add-btn" id="addCustomerBtn" style="float:none;">+ Add New</button>
    </div>
    <div id="customersList" style="min-height:250px;">
      <table class="customers-table">
        <thead>
          <tr>
            <th>Customer_ID</th>
            <th>Customer</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Total_Transaction</th>
            <th>Total_Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
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
        <thead>
          <tr>
            <th>Order_ID</th>
            <th>Customer_ID</th>
            <th>Transaction_ID</th>
            <th>Product_ID</th>
            <th>Product_Name</th>
            <th>Quantity</th>
            <th>Unit_Price (USD)</th>
            <th>Subtotal (USD)</th>
          </tr>
        </thead>
        <tbody id="transactionTableBody"></tbody>
      </table>
    </div>
  </div>
</div>

<div class="sidebar" id="customerSidebar">
  <div class="sidebar-header">
    <h2 id="customerFormTitle">Add New Customer</h2>
    <button class="close-btn" id="closeCustomerSidebar">×</button>
  </div>
  <form id="customerForm">
    <div class="form-group">
      <label>Customer Name</label>
      <input type="text" id="custName" required>
    </div>
    <div class="form-group">
      <label>Customer ID</label>
      <input type="text" id="custId" required>
    </div>
    <div class="form-group">
      <label>Email</label>
      <input type="email" id="custEmail" required>
    </div>
    <div class="form-group">
      <label>Phone</label>
      <input type="tel" id="custPhone" required>
    </div>
    <button type="submit" class="submit-btn" id="customerSubmitBtn">Add Customer</button>
    <button type="button" class="cancel-btn" id="cancelCustomerBtn" style="width:100%;margin-top:10px;">Cancel</button>
  </form>
</div>
`;

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
    <h2>Add New Deal</h2>
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
    <button type="submit" class="submit-btn">Add Deal</button>
  </form>
</div>
`;

const analyticsTemplate = `
<div class="analytics-grid">
  <div class="analytics-card">
    <h3>Sales Report by Region</h3>
    <table class="analytics-table">
      <thead>
        <tr>
          <th>Region_Name</th>
          <th>Total_Transaction</th>
          <th>Total_Amount (USD)</th>
          <th>Conv_Rate (%)</th>
          <th>Top_Selling_Product</th>
        </tr>
      </thead>
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
        <thead>
          <tr>
            <th>Customer_ID</th>
            <th>Customer_Name</th>
            <th>Total_Trans</th>
            <th>Total_Amount</th>
          </tr>
        </thead>
        <tbody id="regularCustomers"></tbody>
      </table>
    </div>
    <div>
      <h4 style="margin: 0 0 10px 0; font-size: 14px; opacity: 0.9;">Potential Customers (Highest Qty)</h4>
      <table class="analytics-table">
        <thead>
          <tr>
            <th>Customer_ID</th>
            <th>Customer_Name</th>
            <th>Total_Trans</th>
            <th>Total_Qty</th>
          </tr>
        </thead>
        <tbody id="potentialCustomers"></tbody>
      </table>
    </div>
  </div>

  <div class="analytics-card">
    <h3>Sales Trend Analysis</h3>
    <div class="deals-info">
      <div class="deals-info-item">
        <div class="deals-label">Deals Open</div>
        <div class="deals-value" id="dealsOpen">0</div>
      </div>
      <div class="deals-info-item">
        <div class="deals-label">Deals Closed</div>
        <div class="deals-value" id="dealsClosed">0</div>
      </div>
    </div>
    <div class="chart-container">
      <canvas id="salesTrendChart"></canvas>
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
        </tr>
      </thead>
      <tbody id="productTable"></tbody>
    </table>
  </div>
</div>
`;

// --- Template untuk Halaman Orders & Invoices (Recent Invoices Dihapus) ---
const ordersTemplate = `
<div class="summary-cards">
  <div class="summary-card">
    <div class="summary-label">Total Orders</div>
    <div class="summary-value" id="totalOrders">0</div>
  </div>
  <div class="summary-card">
    <div class="summary-label">Ongoing</div>
    <div class="summary-value" id="ongoingOrders">0</div>
  </div>
  <div class="summary-card">
    <div class="summary-label">Pending</div>
    <div class="summary-value" id="pendingOrders">0</div>
  </div>
  <div class="summary-card">
    <div class="summary-label">Completed</div>
    <div class="summary-value" id="completedOrders">0</div>
  </div>
  <div class="summary-card">
    <div class="summary-label">Total Revenue</div>
    <div class="summary-value" id="totalRevenue">$0</div>
  </div>
</div>

<div class="section">
  <div class="section-header">
    <h2 class="section-title">Ongoing Transaction</h2>
    <button class="add-btn" id="addNewBtn" style="float:none;">+ Add New</button>
  </div>

  <div class="filters">
    <div class="filter-group">
      <label>Status</label>
      <select id="filterStatus">
        <option value="all">All Status</option>
        <option value="Ongoing">Ongoing</option>
        <option value="Pending">Pending</option>
        <option value="Shipped">Shipped</option>
        <option value="Completed">Completed</option>
      </select>
    </div>
    <div class="filter-group">
      <label>Payment Method</label>
      <select id="filterPayment">
        <option value="all">All Methods</option>
        <option value="Bank Transfer">Bank Transfer</option>
        <option value="Credit Card">Credit Card</option>
        <option value="PayPal">PayPal</option>
        <option value="Cash">Cash</option>
      </select>
    </div>
    <div class="filter-group">
      <label>Search</label>
      <input type="text" id="searchInput" placeholder="Search by Transaction ID...">
    </div>
  </div>

  <table class="data-table" id="transactionTable">
    <thead>
      <tr>
        <th>Transaction_ID</th>
        <th>Customer</th>
        <th>Product_Name</th>
        <th>Transaction_Date</th>
        <th>Payment_Method</th>
        <th>Total_Amount (USD)</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody id="transactionBody">
    </tbody>
  </table>
</div>

<div class="sidebar" id="transactionSidebar">
  <div class="sidebar-header">
    <h2 id="sidebarTitle">Add New Transaction</h2>
    <button class="close-btn" id="closeSidebar">×</button>
  </div>
  <form id="transactionForm">
    <div class="form-group">
      <label>Transaction ID</label>
      <input type="text" id="transactionId" readonly>
    </div>
    <div class="form-group">
      <label>Customer Name</label>
      <input type="text" id="customerName" required>
    </div>
    <div class="form-group">
      <label>Product Name</label>
      <input type="text" id="productName" required>
    </div>
    <div class="form-group">
      <label>Transaction Date</label>
      <input type="date" id="transactionDate" required>
    </div>
    <div class="form-group">
      <label>Payment Method</label>
      <select id="paymentMethod" required>
        <option value="">Select Method</option>
        <option value="Bank Transfer">Bank Transfer</option>
        <option value="Credit Card">Credit Card</option>
        <option value="PayPal">PayPal</option>
        <option value="Cash">Cash</option>
      </select>
    </div>
    <div class="form-group">
      <label>Total Amount (USD)</label>
      <input type="number" id="totalAmount" step="0.01" required>
    </div>
    <div class="form-group">
      <label>Status</label>
      <select id="status" required>
        <option value="Ongoing">Ongoing</option>
        <option value="Pending">Pending</option>
        <option value="Shipped">Shipped</option>
        <option value="Completed">Completed</option>
      </select>
    </div>
    <button type="submit" class="submit-btn">Save Transaction</button>
  </form>
</div>
`;

/* === LOGIN LOGIC === */
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
    // Load default dashboard content on login
    contentArea.innerHTML = dashboardTemplate;
    initDashboard();
    document.querySelector(".main-nav a.active").classList.remove("active");
    document.querySelector(".main-nav a[data-page='dashboard']").classList.add("active");
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

/* === NAVIGATION === */
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    navLinks.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");

    const page = link.getAttribute("data-page");

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
      // --- BARU: Menambahkan case untuk 'orders' ---
      contentArea.innerHTML = ordersTemplate;
      initOrders();
    } else {
      contentArea.innerHTML = dashboardTemplate;
      initDashboard();
    }
  });
});

/* ====== DASHBOARD LOGIC ====== */
function initDashboard() {
  const perfCards = document.querySelectorAll(".performance-card");
  if (perfCards.length > 0) {
    perfCards.forEach((card) => {
      card.addEventListener("click", function () {
        const title = this.querySelector(".performance-title").textContent;
        const value = this.querySelector(".performance-value").textContent;
        alert(title + ": " + value);
      });
    });
  }

  const pipelineStages = document.querySelectorAll(".pipeline-stage");
  if (pipelineStages.length > 0) {
    pipelineStages.forEach((stage) => {
      stage.addEventListener("click", function () {
        const name = this.querySelector(".pipeline-stage-name").textContent;
        alert(name + " Stage clicked");
      });
    });
  }
}

/* ====== CUSTOMERS LOGIC ====== */
function initCustomers() {
  const sidebar = document.getElementById("customerSidebar");
  const customerForm = document.getElementById("customerForm");
  const addBtn = document.getElementById("addCustomerBtn");
  const closeBtn = document.getElementById("closeCustomerSidebar");
  const cancelBtn = document.getElementById("cancelCustomerBtn");
  const tableBody = document.getElementById("customersTableBody");
  const transactionBody = document.getElementById("transactionTableBody");

  let editingCustomerId = null;

  function renderCustomers() {
    tableBody.innerHTML = "";
    customersData.forEach((customer) => {
      const row = document.createElement("tr");
      row.innerHTML = `
      <td>${customer.id}</td>
      <td>${customer.name}</td>
      <td>${customer.email}</td>
      <td>${customer.phone}</td>
      <td>${customer.totalTransaction}</td>
      <td>${customer.totalAmount.toLocaleString()}</td>
      <td>
        <button onclick="editCustomer('${customer.id}')" style="background:#007bff;color:#fff;border:none;padding:5px 10px;border-radius:4px;cursor:pointer;margin-right:5px;font-size:11px;">Edit</button>
        <button onclick="deleteCustomer('${customer.id}')" style="background:#dc3545;color:#fff;border:none;padding:5px 10px;border-radius:4px;cursor:pointer;font-size:11px;">Delete</button>
      </td>
    `;
      tableBody.appendChild(row);
    });
  }

  function renderTransactions() {
    transactionBody.innerHTML = "";
    transactionsData.forEach((transaction) => {
      const row = document.createElement("tr");
      row.innerHTML = `
      <td>${transaction.orderId}</td>
      <td>${transaction.customerId}</td>
      <td>${transaction.transactionId}</td>
      <td>${transaction.productId}</td>
      <td>${transaction.productName}</td>
      <td>${transaction.quantity}</td>
      <td>${transaction.unitPrice.toFixed(2)}</td>
      <td>${transaction.subtotal.toFixed(2)}</td>
    `;
      transactionBody.appendChild(row);
    });
  }

  window.editCustomer = function (id) {
    const customer = customersData.find((c) => c.id === id);
    if (customer) {
      editingCustomerId = id;
      document.getElementById("custId").value = customer.id;
      document.getElementById("custName").value = customer.name;
      document.getElementById("custEmail").value = customer.email;
      document.getElementById("custPhone").value = customer.phone;
      document.getElementById("custId").readOnly = true;
      document.getElementById("customerFormTitle").textContent = "Edit Customer";
      document.getElementById("customerSubmitBtn").textContent = "Update Customer";
      sidebar.classList.add("active");
    }
  };

  window.deleteCustomer = function (id) {
    if (confirm("Are you sure you want to delete this customer?")) {
      const index = customersData.findIndex((c) => c.id === id);
      if (index > -1) {
        customersData.splice(index, 1);
        renderCustomers();
      }
    }
  };

  addBtn.onclick = () => {
    editingCustomerId = null;
    customerForm.reset();
    document.getElementById("custId").readOnly = false;
    document.getElementById("customerFormTitle").textContent = "Add New Customer";
    document.getElementById("customerSubmitBtn").textContent = "Add Customer";
    sidebar.classList.add("active");
  };

  closeBtn.onclick = () => {
    sidebar.classList.remove("active");
    editingCustomerId = null;
    customerForm.reset();
  };

  cancelBtn.onclick = () => {
    sidebar.classList.remove("active");
    editingCustomerId = null;
    customerForm.reset();
  };

  customerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = document.getElementById("custId").value;
    const name = document.getElementById("custName").value;
    const email = document.getElementById("custEmail").value;
    const phone = document.getElementById("custPhone").value;

    if (editingCustomerId) {
      const customer = customersData.find(
        (c) => c.id === editingCustomerId
      );
      if (customer) {
        customer.name = name;
        customer.email = email;
        customer.phone = phone;
      }
    } else {
      customersData.push({
        id,
        name,
        email,
        phone,
        totalTransaction: 0,
        totalAmount: 0,
      });
    }

    renderCustomers();
    sidebar.classList.remove("active");
    editingCustomerId = null;
    customerForm.reset();
  });

  renderCustomers();
  renderTransactions();
}

/* ====== ANALYTICS LOGIC ====== */
function initAnalytics() {
  // 1. Sales Report by Region - Get data from transactions
  const regionStats = {};
  transactionsData.forEach((trans) => {
    if (!regionStats[trans.region]) {
      regionStats[trans.region] = {
        totalTrans: 0,
        totalAmount: 0,
        products: {},
      };
    }
    regionStats[trans.region].totalTrans++;
    regionStats[trans.region].totalAmount += trans.subtotal;
    regionStats[trans.region].products[trans.productName] =
      (regionStats[trans.region].products[trans.productName] || 0) +
      trans.quantity;
  });

  const regionData = Object.keys(regionStats)
    .map((region) => {
      const topProduct = Object.keys(
        regionStats[region].products
      ).reduce((a, b) =>
        regionStats[region].products[a] >
        regionStats[region].products[b] ?
        a :
        b
      );
      return {
        region,
        trans: regionStats[region].totalTrans,
        amount: regionStats[region].totalAmount,
        convRate: (
          (regionStats[region].totalTrans / transactionsData.length) *
          100
        ).toFixed(1),
        topProduct,
      };
    })
    .sort((a, b) => b.amount - a.amount);

  const regionTable = document.getElementById("regionTable");
  regionTable.innerHTML = "";
  regionData.forEach((region) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${region.region}</td>
      <td>${region.trans}</td>
      <td>${region.amount.toLocaleString()}</td>
      <td>${region.convRate}%</td>
      <td>${region.topProduct}</td>
    `;
    regionTable.appendChild(row);
  });

  // 2. Sales Performance - Monthly and Quarterly
  const monthlyStats = {};
  transactionsData.forEach((trans) => {
    if (!monthlyStats[trans.month]) {
      monthlyStats[trans.month] = {
        totalAmount: 0,
        totalTransaction: 0,
        productsSold: 0,
      };
    }
    monthlyStats[trans.month].totalAmount += trans.subtotal;
    monthlyStats[trans.month].totalTransaction++;
    monthlyStats[trans.month].productsSold += trans.quantity;
  });

  const monthOrder = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  function updatePerformanceMetrics(view) {
    const metricsDiv = document.getElementById("performanceMetrics");
    let data;

    if (view === "monthly") {
      const currentMonth = new Date().getMonth();
      const monthName = monthOrder[currentMonth];
      data = monthlyStats[monthName] || {
        totalAmount: 0,
        totalTransaction: 0,
        productsSold: 0,
      };
      data.conversionRate =
        data.totalTransaction > 0 ?
        (
          (data.totalTransaction / transactionsData.length) *
          100
        ).toFixed(0) :
        0;
    } else {
      const quarters = {
        q1: [0, 1, 2],
        q2: [3, 4, 5],
        q3: [6, 7, 8],
        q4: [9, 10, 11],
      };
      const months = quarters[view];
      data = {
        totalAmount: 0,
        totalTransaction: 0,
        productsSold: 0,
      };
      months.forEach((m) => {
        const monthName = monthOrder[m];
        if (monthlyStats[monthName]) {
          data.totalAmount += monthlyStats[monthName].totalAmount;
          data.totalTransaction +=
            monthlyStats[monthName].totalTransaction;
          data.productsSold += monthlyStats[monthName].productsSold;
        }
      });
      data.conversionRate =
        data.totalTransaction > 0 ?
        (
          (data.totalTransaction / transactionsData.length) *
          100
        ).toFixed(0) :
        0;
    }

    metricsDiv.innerHTML = `
      <div class="metric-item">
        <div class="metric-label">Total Amount</div>
        <div class="metric-value">${data.totalAmount.toLocaleString()}</div>
      </div>
      <div class="metric-item">
        <div class="metric-label">Total Transaction</div>
        <div class="metric-value">${data.totalTransaction}</div>
      </div>
      <div class="metric-item">
        <div class="metric-label">Product Sold</div>
        <div class="metric-value">${data.productsSold}</div>
      </div>
      <div class="metric-item">
        <div class="metric-label">Conversion Rate</div>
        <div class="metric-value">${data.conversionRate}%</div>
      </div>
    `;
  }

  updatePerformanceMetrics("monthly");

  document.querySelectorAll(".quarter-tab").forEach((tab) => {
    tab.addEventListener("click", function () {
      document
        .querySelectorAll(".quarter-tab")
        .forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      const view = tab.getAttribute("data-view");
      updatePerformanceMetrics(view);
    });
  });

  // 3. Customer Retention
  const regularCustomers = customersData
    .filter((c) => c.totalTransaction >= 2)
    .sort((a, b) => b.totalAmount - a.totalAmount);

  const regularTable = document.getElementById("regularCustomers");
  regularTable.innerHTML = "";
  regularCustomers.forEach((customer) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${customer.id}</td>
      <td>${customer.name}</td>
      <td>${customer.totalTransaction}</td>
      <td>${customer.totalAmount.toLocaleString()}</td>
    `;
    regularTable.appendChild(row);
  });

  // Potential customers - 1 transaction with highest quantity
  const potentialMap = {};
  transactionsData.forEach((trans) => {
    if (!potentialMap[trans.customerId]) {
      potentialMap[trans.customerId] = {
        totalQty: 0,
        totalTrans: 0,
      };
    }
    potentialMap[trans.customerId].totalQty += trans.quantity;
    potentialMap[trans.customerId].totalTrans++;
  });

  const potentialCustomers = customersData
    .filter(
      (c) => potentialMap[c.id] && potentialMap[c.id].totalTrans === 1
    )
    .map((c) => ({
      ...c,
      totalQty: potentialMap[c.id].totalQty,
    }))
    .sort((a, b) => b.totalQty - a.totalQty)
    .slice(0, 5);

  const potentialTable = document.getElementById("potentialCustomers");
  potentialTable.innerHTML = "";
  potentialCustomers.forEach((customer) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${customer.id}</td>
      <td>${customer.name}</td>
      <td>${customer.totalTransaction}</td>
      <td>${customer.totalQty}</td>
    `;
    potentialTable.appendChild(row);
  });

  // 4. Sales Trend Analysis - Chart
  document.getElementById("dealsOpen").textContent =
    pipelineData.lead +
    pipelineData.qualification +
    pipelineData.proposal +
    pipelineData.negotiation;
  document.getElementById("dealsClosed").textContent =
    pipelineData.closedWon;

  const ctx = document.getElementById("salesTrendChart");
  if (ctx) {
    new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Closed Won", "In Progress"],
        datasets: [{
          data: [
            pipelineData.closedWon,
            pipelineData.lead +
            pipelineData.qualification +
            pipelineData.proposal +
            pipelineData.negotiation,
          ],
          backgroundColor: ["#4CAF50", "#2196F3"],
          borderWidth: 0,
        }, ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "right",
          },
        },
      },
    });
  }

  // 5. Product List
  function renderProducts() {
    const productTable = document.getElementById("productTable");
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
      `;
      productTable.appendChild(row);
    });
  }

  renderProducts();

  // Product Form
  const productSidebar = document.getElementById("productSidebar");
  const addProductBtn = document.getElementById("addProductBtn");
  const closeProductSidebar = document.getElementById(
    "closeProductSidebar"
  );
  const productForm = document.getElementById("productForm");

  if (addProductBtn) {
    addProductBtn.onclick = () => {
      productForm.reset();
      const newId = `P4P${String(products.length + 0).padStart(1, "1")}`;
      document.getElementById("productId").value = newId;
      productSidebar.classList.add("active");
    };
  }

  if (closeProductSidebar) {
    closeProductSidebar.onclick = () => {
      productSidebar.classList.remove("active");
    };
  }

  if (productForm) {
    productForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const newProduct = {
        id: document.getElementById("productId").value,
        name: document.getElementById("productName").value,
        category: document.getElementById("productCategory").value,
        price: parseInt(document.getElementById("productPrice").value),
        supply: document.getElementById("productSupply").value,
        stock: document.getElementById("productStock").value,
        width: parseInt(document.getElementById("productWidth").value),
        length: parseInt(document.getElementById("productLength").value),
        rating: parseFloat(
          document.getElementById("productRating").value
        ),
      };
      products.push(newProduct);
      renderProducts();
      productSidebar.classList.remove("active");
    });
  }
}

/* ====== PIPELINE LOGIC ====== */
function initPipeline() {
  const pipelineEl = document.getElementById("pipeline");
  const sidebar = document.getElementById("sidebar");
  const dealForm = document.getElementById("dealForm");
  const addDealBtn = document.getElementById("addDealBtn");
  const closeSidebar = document.getElementById("closeSidebar");

  let draggedCard = null;
  let deals = [{
    id: "D001",
    title: "Bulk Order - Manufacturing",
    customer: "PT Maju Jaya",
    stage: "NEW LEAD",
  }, {
    id: "D002",
    title: "Partnership Deal",
    customer: "CV Sentosa",
    stage: "QUALIFICATION",
  }, {
    id: "D003",
    title: "Retail Distribution",
    customer: "Toko Sejahtera",
    stage: "PROPOSAL",
  }, {
    id: "D004",
    title: "Long-term Contract",
    customer: "PT Indah Karya",
    stage: "NEGOTIATION",
  }, {
    id: "D005",
    title: "Export Deal",
    customer: "Global Traders Inc",
    stage: "CLOSED/WON",
  }, ];

  const stages = [
    "NEW LEAD",
    "QUALIFICATION",
    "PROPOSAL",
    "NEGOTIATION",
    "CLOSED/WON",
  ];

  function renderPipeline() {
    pipelineEl.innerHTML = "";
    stages.forEach((stage) => {
      const column = document.createElement("div");
      column.className = "pipeline-column";
      column.setAttribute("data-stage", stage);

      column.innerHTML = `
      <div class="column-header">
        <span class="column-title">${stage}</span>
        <button class="add-card-btn">+</button>
      </div>
      <div class="cards-container"></div>
    `;

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
          <div class="deal-meta">${deal.customer}</div>
        `;

          card.addEventListener("dragstart", (e) => {
            draggedCard = card;
            card.classList.add("dragging");
          });

          card.addEventListener("dragend", () => {
            card.classList.remove("dragging");
            draggedCard = null;
          });

          cardsContainer.appendChild(card);
        });

      column.addEventListener("dragover", (e) => {
        e.preventDefault();
        column.classList.add("drop-target");
      });

      column.addEventListener("dragleave", () => {
        column.classList.remove("drop-target");
      });

      column.addEventListener("drop", (e) => {
        e.preventDefault();
        column.classList.remove("drop-target");
        if (draggedCard) {
          const dealId = draggedCard.getAttribute("data-deal-id");
          const deal = deals.find((d) => d.id === dealId);
          if (deal) {
            deal.stage = stage;
            renderPipeline();
          }
        }
      });

      const addBtn = column.querySelector(".add-card-btn");
      addBtn.onclick = () => {
        document.getElementById("dealStage").value = stage;
        sidebar.classList.add("active");
      };

      pipelineEl.appendChild(column);
    });
  }

  addDealBtn.onclick = () => {
    sidebar.classList.add("active");
  };

  closeSidebar.onclick = () => {
    sidebar.classList.remove("active");
  };

  dealForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newDeal = {
      id: `D${String(deals.length + 1).padStart(3, "0")}`,
      title: document.getElementById("dealTitle").value,
      customer: document.getElementById("customerName").value,
      stage: document.getElementById("dealStage").value,
    };
    deals.push(newDeal);
    renderPipeline();
    sidebar.classList.remove("active");
    dealForm.reset();
  });

  renderPipeline();
}

// --- Fungsi untuk Halaman Orders & Invoices ---
function initOrders() {
  let transactions = [
    { id: "TXN001", customer: "Alex Tan", product: "Cloth Tape Black", date: "2025-10-15", payment: "Bank Transfer", amount: 1250, status: "Ongoing" },
    { id: "TXN002", customer: "Benjamin Lee", product: "Double Tape", date: "2025-10-16", payment: "Credit Card", amount: 890, status: "Ongoing" },
    { id: "TXN003", customer: "Catherine Wong", product: "Clear Tape", date: "2025-10-18", payment: "PayPal", amount: 1540, status: "Pending" },
    { id: "TXN004", customer: "David Chen", product: "Packaging Tape", date: "2025-10-20", payment: "Bank Transfer", amount: 2100, status: "Ongoing" },
    { id: "TXN005", customer: "Emily Zhang", product: "Aluminum Tape", date: "2025-10-22", payment: "Credit Card", amount: 1820, status: "Shipped" },
    { id: "TXN006", customer: "Frank Yusuf", product: "Masking Tape", date: "2025-10-25", payment: "Cash", amount: 950, status: "Pending" },
    { id: "TXN007", customer: "Grace Kim", product: "Foam Tape", date: "2025-10-28", payment: "Bank Transfer", amount: 1670, status: "Completed" },
    { id: "TXN008", customer: "Henry Gunawan", product: "Clear Tape Pro", date: "2025-10-30", payment: "PayPal", amount: 1340, status: "Completed" }
  ];

  let editingTransactionId = null;

  function updateSummary() {
    const total = transactions.length;
    const ongoing = transactions.filter(t => t.status === "Ongoing").length;
    const pending = transactions.filter(t => t.status === "Pending").length;
    const completed = transactions.filter(t => t.status === "Completed").length;
    const revenue = transactions.reduce((sum, t) => sum + t.amount, 0);

    document.getElementById("totalOrders").textContent = total;
    document.getElementById("ongoingOrders").textContent = ongoing;
    document.getElementById("pendingOrders").textContent = pending;
    document.getElementById("completedOrders").textContent = completed;
    document.getElementById("totalRevenue").textContent = `$${revenue.toLocaleString()}`;
  }

  function getStatusClass(status) {
    const statusMap = {
      'Ongoing': 'status-ongoing',
      'Pending': 'status-pending',
      'Completed': 'status-completed',
      'Shipped': 'status-shipped'
    };
    return statusMap[status] || 'status-ongoing';
  }

  function renderTransactions(filteredTransactions = transactions) {
    const tbody = document.getElementById("transactionBody");
    tbody.innerHTML = "";

    filteredTransactions.forEach(transaction => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${transaction.id}</td>
        <td>${transaction.customer}</td>
        <td>${transaction.product}</td>
        <td>${transaction.date}</td>
        <td>${transaction.payment}</td>
        <td>$${transaction.amount.toLocaleString()}</td>
        <td><span class="status-badge ${getStatusClass(transaction.status)}">${transaction.status}</span></td>
        <td>
          <button class="action-btn" onclick="editTransaction('${transaction.id}')">Edit</button>
          <button class="action-btn delete" onclick="deleteTransaction('${transaction.id}')">Delete</button>
        </td>
      `;
      tbody.appendChild(row);
    });

    updateSummary();
  }

  function filterTransactions() {
    const statusFilter = document.getElementById("filterStatus").value;
    const paymentFilter = document.getElementById("filterPayment").value;
    const searchTerm = document.getElementById("searchInput").value.toLowerCase();

    let filtered = transactions;

    if (statusFilter !== "all") {
      filtered = filtered.filter(t => t.status === statusFilter);
    }

    if (paymentFilter !== "all") {
      filtered = filtered.filter(t => t.payment === paymentFilter);
    }

    if (searchTerm) {
      filtered = filtered.filter(t =>
        t.id.toLowerCase().includes(searchTerm) ||
        t.customer.toLowerCase().includes(searchTerm) ||
        t.product.toLowerCase().includes(searchTerm)
      );
    }

    renderTransactions(filtered);
  }

  window.editTransaction = function(id) {
    const transaction = transactions.find(t => t.id === id);
    if (transaction) {
      editingTransactionId = id;
      document.getElementById("sidebarTitle").textContent = "Edit Transaction";
      document.getElementById("transactionId").value = transaction.id;
      document.getElementById("customerName").value = transaction.customer;
      document.getElementById("productName").value = transaction.product;
      document.getElementById("transactionDate").value = transaction.date;
      document.getElementById("paymentMethod").value = transaction.payment;
      document.getElementById("totalAmount").value = transaction.amount;
      document.getElementById("status").value = transaction.status;
      document.getElementById("transactionSidebar").classList.add("active");
    }
  };

  window.deleteTransaction = function(id) {
    if (confirm("Are you sure you want to delete this transaction?")) {
      const index = transactions.findIndex(t => t.id === id);
      if (index > -1) {
        transactions.splice(index, 1);
        filterTransactions();
      }
    }
  };

  document.getElementById("addNewBtn").addEventListener("click", () => {
    editingTransactionId = null;
    document.getElementById("sidebarTitle").textContent = "Add New Transaction";
    document.getElementById("transactionForm").reset();
    const newId = `TXN${String(transactions.length + 1).padStart(3, '0')}`;
    document.getElementById("transactionId").value = newId;
    const today = new Date().toISOString().split('T')[0];
    document.getElementById("transactionDate").value = today;
    document.getElementById("transactionSidebar").classList.add("active");
  });

  document.getElementById("closeSidebar").addEventListener("click", () => {
    document.getElementById("transactionSidebar").classList.remove("active");
  });

  document.getElementById("transactionForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const transactionData = {
      id: document.getElementById("transactionId").value,
      customer: document.getElementById("customerName").value,
      product: document.getElementById("productName").value,
      date: document.getElementById("transactionDate").value,
      payment: document.getElementById("paymentMethod").value,
      amount: parseFloat(document.getElementById("totalAmount").value),
      status: document.getElementById("status").value
    };

    if (editingTransactionId) {
      const index = transactions.findIndex(t => t.id === editingTransactionId);
      if (index > -1) {
        transactions[index] = transactionData;
      }
    } else {
      transactions.push(transactionData);
    }

    document.getElementById("transactionSidebar").classList.remove("active");
    filterTransactions();
  });

  document.getElementById("filterStatus").addEventListener("change", filterTransactions);
  document.getElementById("filterPayment").addEventListener("change", filterTransactions);
  document.getElementById("searchInput").addEventListener("input", filterTransactions);

  renderTransactions();
}

// Initial check on page load
checkLogin();
// Load default dashboard content if logged in, otherwise login page shows
if (sessionStorage.getItem("isAdminLoggedIn") === "true") {
  contentArea.innerHTML = dashboardTemplate;
  initDashboard();
}