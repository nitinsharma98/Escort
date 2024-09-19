const mongoose = require("mongoose");                    // same errr
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wonderlust";

main()
.then ( () =>{
    console.log("connected to DB");
}).catch(err =>{
    console.log( err );
});

async function main() {
    await mongoose.connect(MONGO_URL);
}  

const initDB = async() => {
    
    try {
        await Listing.deleteMany({});
        initData.data = initData.data.map((obj) => ({...obj, owner:"66e526226a3b759620a1c7ed"}));
        await Listing.insertMany(initData.data);
        console.log("data was initialized successfully");
    } catch (error) {
        console.log(error);
    }
};

initDB();