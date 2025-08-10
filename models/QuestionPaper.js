const mongoose = require("mongoose");

const QuestionPaperSchema = new mongoose.Schema({
    name: { type: String, required: true },          
    semester: { type: Number, required: true },      
    year: { type: Number, required: true },         
    department: { type: String, required: true },    
    type: { type: String, enum: ["ESE", "MSE", "Backlog", "Makeup"], required: true },
    fileId: { type: String },       
    driveLink: { type: String, required: true },     
    uploadedBy: { type: String, default: "Admin" }, 
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("QuestionPaper", QuestionPaperSchema);
