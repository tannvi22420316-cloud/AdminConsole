// seed.js — run once: node seed.js
// Place this in your backend root folder

require("dotenv").config();
const mongoose    = require("mongoose");
const Inventory   = require("./models/Inventory");
const Transaction = require("./models/Transaction");
const Message     = require("./models/Message");
const Event       = require("./models/Event");
const Report      = require("./models/Report");

mongoose.connect(process.env.MONGO_URI).then(() => console.log("Connected to MongoDB"));

const seed = async () => {
    await Inventory.deleteMany();
    await Transaction.deleteMany();
    await Message.deleteMany();
    await Event.deleteMany();
    await Report.deleteMany();

    // ---- INVENTORY ----
    await Inventory.insertMany([
        { name: "AirPods Pro Max", sku: "ELEC-001", category: "Electronics", stock: 142, minStock: 20, price: 549, cost: 380, supplier: "Apple Inc.", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=60&h=60&fit=crop", location: "Shelf A1" },
        { name: "Running Shoes X9", sku: "SPRT-001", category: "Sports", stock: 56, minStock: 15, price: 129, cost: 72, supplier: "Nike Corp.", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=60&h=60&fit=crop", location: "Shelf B3" },
        { name: "Minimal Desk Lamp", sku: "HOME-001", category: "Home", stock: 8, minStock: 10, price: 89, cost: 42, supplier: "IKEA", image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=60&h=60&fit=crop", location: "Shelf C2" },
        { name: "Linen Blazer", sku: "CLTH-001", category: "Clothing", stock: 0, minStock: 12, price: 199, cost: 98, supplier: "Zara", image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=60&h=60&fit=crop", location: "Shelf D1" },
        { name: "Smart Watch Series 9", sku: "ELEC-002", category: "Electronics", stock: 74, minStock: 20, price: 399, cost: 260, supplier: "Apple Inc.", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=60&h=60&fit=crop", location: "Shelf A2" },
        { name: "Hydration Face Serum", sku: "BEAU-001", category: "Beauty", stock: 5, minStock: 20, price: 64, cost: 28, supplier: "L'Oreal", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=60&h=60&fit=crop", location: "Shelf E1" },
        { name: "Yoga Mat Pro", sku: "SPRT-002", category: "Sports", stock: 230, minStock: 30, price: 49, cost: 22, supplier: "Decathlon", image: "https://images.unsplash.com/photo-1601925228100-4e82e36a54a1?w=60&h=60&fit=crop", location: "Shelf B1" },
        { name: "Ceramic Coffee Mug", sku: "HOME-002", category: "Home", stock: 412, minStock: 50, price: 28, cost: 11, supplier: "Local Crafts", image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=60&h=60&fit=crop", location: "Shelf C3" },
    ]);

    // ---- TRANSACTIONS ----
    const txnData = [
        { transactionId: "TXN-10021", customer: "Emma Wilson",  email: "emma@email.com",  avatar: "https://i.pravatar.cc/40?img=9",  type: "credit",     amount: 549,  status: "completed", method: "card",   category: "Electronics", description: "AirPods Pro Max purchase",   date: new Date("2024-12-12") },
        { transactionId: "TXN-10020", customer: "John Doe",     email: "john@email.com",  avatar: "https://i.pravatar.cc/40?img=1",  type: "credit",     amount: 399,  status: "completed", method: "paypal", category: "Electronics", description: "Smart Watch purchase",       date: new Date("2024-12-12") },
        { transactionId: "TXN-10019", customer: "Sarah Smith",  email: "sarah@email.com", avatar: "https://i.pravatar.cc/40?img=5",  type: "credit",     amount: 129,  status: "pending",   method: "card",   category: "Sports",      description: "Running Shoes X9",           date: new Date("2024-12-11") },
        { transactionId: "TXN-10018", customer: "Mike Brown",   email: "mike@email.com",  avatar: "https://i.pravatar.cc/40?img=3",  type: "refund",     amount: 89,   status: "refunded",  method: "bank",   category: "Home",        description: "Desk Lamp refund",           date: new Date("2024-12-11") },
        { transactionId: "TXN-10017", customer: "Chris Lee",    email: "chris@email.com", avatar: "https://i.pravatar.cc/40?img=7",  type: "debit",      amount: 199,  status: "failed",    method: "card",   category: "Clothing",    description: "Linen Blazer - failed",      date: new Date("2024-12-10") },
        { transactionId: "TXN-10016", customer: "Olivia Park",  email: "olivia@email.com",avatar: "https://i.pravatar.cc/40?img=47", type: "credit",     amount: 49,   status: "completed", method: "wallet", category: "Sports",      description: "Yoga Mat Pro",               date: new Date("2024-12-10") },
        { transactionId: "TXN-10015", customer: "Ryan Chen",    email: "ryan@email.com",  avatar: "https://i.pravatar.cc/40?img=12", type: "credit",     amount: 28,   status: "completed", method: "card",   category: "Home",        description: "Ceramic Coffee Mug",         date: new Date("2024-12-09") },
        { transactionId: "TXN-10014", customer: "Ava Johnson",  email: "ava@email.com",   avatar: "https://i.pravatar.cc/40?img=44", type: "withdrawal", amount: 1200, status: "completed", method: "bank",   category: "Withdrawal",  description: "Monthly payout",             date: new Date("2024-12-09") },
    ];
    await Transaction.insertMany(txnData);

    // ---- MESSAGES ----
    await Message.insertMany([
        { sender: "John Doe",     avatar: "https://i.pravatar.cc/40?img=1",  email: "john@email.com",   subject: "Order #8821 issue",          body: "Hi, I have an issue with my recent order. The product arrived damaged and I would like a replacement or refund.", read: false, starred: true,  tag: "inbox",  priority: "high",   date: new Date("2024-12-12T10:30:00") },
        { sender: "Sarah Smith",  avatar: "https://i.pravatar.cc/40?img=5",  email: "sarah@email.com",  subject: "Partnership Proposal",        body: "Hello, I wanted to reach out regarding a potential partnership opportunity between our companies.", read: false, starred: false, tag: "inbox",  priority: "medium", date: new Date("2024-12-12T09:15:00") },
        { sender: "Mike Brown",   avatar: "https://i.pravatar.cc/40?img=3",  email: "mike@email.com",   subject: "Invoice for December",        body: "Please find attached the invoice for services rendered in December 2024.", read: true,  starred: false, tag: "inbox",  priority: "low",    date: new Date("2024-12-11T14:20:00") },
        { sender: "Emma Wilson",  avatar: "https://i.pravatar.cc/40?img=9",  email: "emma@email.com",   subject: "VIP Customer Feedback",       body: "I absolutely love the new product line! The quality has improved significantly.", read: true,  starred: true,  tag: "inbox",  priority: "medium", date: new Date("2024-12-11T11:05:00") },
        { sender: "Chris Lee",    avatar: "https://i.pravatar.cc/40?img=7",  email: "chris@email.com",  subject: "Bulk Order Request",          body: "We are interested in placing a bulk order of 500 units. Can you provide pricing?", read: false, starred: false, tag: "inbox",  priority: "high",   date: new Date("2024-12-10T16:45:00") },
        { sender: "Olivia Park",  avatar: "https://i.pravatar.cc/40?img=47", email: "olivia@email.com", subject: "Shipping Delay Complaint",    body: "My order was supposed to arrive 3 days ago. What is happening with the delivery?", read: false, starred: false, tag: "inbox",  priority: "high",   date: new Date("2024-12-10T08:30:00") },
        { sender: "System",       avatar: "",                                email: "system@admin.com", subject: "Server Load Warning",        body: "CPU usage has exceeded 85% for the past 10 minutes. Please investigate.", read: true,  starred: false, tag: "inbox",  priority: "high",   date: new Date("2024-12-09T22:00:00") },
        { sender: "Ryan Chen",    avatar: "https://i.pravatar.cc/40?img=12", email: "ryan@email.com",   subject: "Product Review Submission",  body: "I wanted to share my review for the Ceramic Coffee Mug I recently purchased.", read: true,  starred: false, tag: "inbox",  priority: "low",    date: new Date("2024-12-09T13:10:00") },
    ]);

    // ---- EVENTS ----
    const now = new Date();
    await Event.insertMany([
        { title: "Q4 Revenue Review",      description: "End of quarter financial review with stakeholders", start: new Date(now.getFullYear(), now.getMonth(), 5,  10, 0), end: new Date(now.getFullYear(), now.getMonth(), 5,  11, 30), color: "blue",   category: "meeting",   attendees: ["Tannvi", "John", "Sarah"], location: "Board Room A" },
        { title: "Product Launch - WatchX",description: "New product launch event for Smart Watch X series", start: new Date(now.getFullYear(), now.getMonth(), 10, 14, 0), end: new Date(now.getFullYear(), now.getMonth(), 10, 17, 0),  color: "purple", category: "event",     attendees: ["All Team"], location: "Main Hall" },
        { title: "Inventory Audit",        description: "Monthly inventory count and reconciliation",        start: new Date(now.getFullYear(), now.getMonth(), 15, 9,  0), end: new Date(now.getFullYear(), now.getMonth(), 15, 12, 0),  color: "orange", category: "deadline",  attendees: ["Warehouse Team"], location: "Warehouse" },
        { title: "Team Standup",           description: "Daily morning standup",                             start: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 0), end: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 30), color: "green", category: "meeting", attendees: ["All"], location: "Zoom" },
        { title: "Black Friday Planning",  description: "Planning for Black Friday sale campaigns",          start: new Date(now.getFullYear(), now.getMonth(), 20, 13, 0), end: new Date(now.getFullYear(), now.getMonth(), 20, 15, 0),  color: "pink",   category: "meeting",   attendees: ["Marketing", "Sales"], location: "Room B2" },
        { title: "Tax Filing Deadline",    description: "Q4 tax filing deadline",                            start: new Date(now.getFullYear(), now.getMonth(), 28, 0,  0), end: new Date(now.getFullYear(), now.getMonth(), 28, 23, 59), color: "red",    category: "deadline",  allDay: true },
        { title: "Christmas Holiday",      description: "Office closed for Christmas",                       start: new Date(now.getFullYear(), now.getMonth(), 25, 0,  0), end: new Date(now.getFullYear(), now.getMonth(), 25, 23, 59), color: "teal",   category: "holiday",   allDay: true },
    ]);

    // ---- REPORTS ----
    await Report.insertMany([
        { title: "Monthly Revenue Report",    type: "revenue",   status: "ready",      generatedBy: "Tannvi Kamble", size: "2.4 MB", dateRange: { from: new Date("2024-12-01"), to: new Date("2024-12-31") }, createdAt: new Date("2024-12-01") },
        { title: "User Acquisition Report",   type: "users",     status: "ready",      generatedBy: "Tannvi Kamble", size: "1.8 MB", dateRange: { from: new Date("2024-12-01"), to: new Date("2024-12-31") }, createdAt: new Date("2024-12-01") },
        { title: "Inventory Valuation",       type: "inventory", status: "ready",      generatedBy: "Tannvi Kamble", size: "3.1 MB", dateRange: { from: new Date("2024-11-01"), to: new Date("2024-11-30") }, createdAt: new Date("2024-11-28") },
        { title: "Q4 Sales Summary",          type: "sales",     status: "processing", generatedBy: "Tannvi Kamble", size: null,      dateRange: { from: new Date("2024-10-01"), to: new Date("2024-12-31") }, createdAt: new Date("2024-12-12") },
        { title: "Customer Retention Report", type: "users",     status: "ready",      generatedBy: "Tannvi Kamble", size: "1.2 MB", dateRange: { from: new Date("2024-11-01"), to: new Date("2024-11-30") }, createdAt: new Date("2024-11-20") },
    ]);

    console.log("Seed complete!");
    mongoose.disconnect();
};

seed().catch((err) => { console.error(err); mongoose.disconnect(); });
