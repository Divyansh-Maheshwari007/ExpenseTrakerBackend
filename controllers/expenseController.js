
const xlsx = require('xlsx');
const Expense = require("../models/Expense");

//  Add Expense Source  
exports.addExpense = async (req, res) => {
    const userId = req.user.id;

    try{
        const { icon, category, amount,date } = req.body;
        
        // Validation: check for missing fields

        if(!category || !amount || !date){
            return res.status(400).json({message: "All fielfds are requried"})
        }

        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date: new Date(date)
        });

        await newExpense.save();
        res.status(200).json(newExpense);
    }catch(error){
        console.error("Add Income Error:", error);
        res.status(200).json({message : "Server Error expense "}) }
    
}
// Get All Expense Source
exports.getAllExpense = async (req, res) => {
    const userId = req.user.id;
    try{
        const expense = await Expense.find({ userId}).sort({date:-1});
        res.json(expense);

    }catch(error){
        res.status(500).json({message: "Server Error"});
    }
}

// Delete Expense Source
exports.deleteExpense = async (req, res) => {
    try{
        await Expense.findByIdAndDelete(req.params.id);
        res.json({message : "Expense deleted successfully"});
    } catch(error){
        res.status(500).json({message : "Server Error "})
    }
}


exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id;

    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 });

        // Prepare data for Excel
        const data = expense.map((item) => ({
            category: item.category,
            Amount: item.amount,
            Date: item.date.toISOString().split("T")[0], // clean date
        }));

        // Create workbook and worksheet
        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);

        xlsx.utils.book_append_sheet(wb, ws, "expense");

        const filePath = "expense_details.xlsx";
        xlsx.writeFile(wb, filePath); // ✅ FIXED: Pass workbook first

        // Download the file
        res.download(filePath, (err) => {
            if (err) {
                console.error("Download error:", err);
                return res.status(500).json({ message: "Download failed" });
            }
        });
    } catch (error) {
        console.error("Add expense Error:", error);
        res.status(500).json({ message: "Server Error in excel" });
    }
};
