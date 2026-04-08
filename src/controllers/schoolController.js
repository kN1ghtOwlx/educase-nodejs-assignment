import db from "../config/db.js"

const isLatitue = (value) => {
    return typeof value === "number" && value >= -90 && value <= 90;
};

const isLogitute = (value) =>{
    return typeof value === "number" && value >= -180 && value <= 180;
};

const addSchool = async (req, res) => {
    try {
        // res.send("Api running successfully");
        const {name, address, latitude, longitude} = req.body;
        if(!name || !address || latitude === undefined || longitude === undefined){
            return res.status(400).json({
                message: "All fields are required!!",
                name: "String",
                address: "String",
                latitude: "-90 <= number >= 90",
                longitude: "-180 <= number => 180"
            })
        };

        const lat = Number(latitude);
        const lon = Number(longitude);

        if(typeof name !== "string" || typeof address !== "string" || !name.trim() || !address.trim() || Number.isNaN(lat) || Number.isNaN(lon) || !isLatitue(lat) || !isLogitute(lon)){
            return res.status(400).json({
                message: "Invalid Fields!!",
                name: "String",
                address: "String",
                latitude: "-90 <= number >= 90",
                longitude: "-180 <= number => 180"
            })
        };

        const [newSchool] = await db.execute("Insert into schools (name, address, latitude, logitude) values (?, ?, ?, ?)", [name.trim(), address.trim(), lat, lon]);

        const [newSchoolData] = await db.execute("Select * from schools where id = ?", [newSchool.insertId]);
        
        return res.status(201).json({
            message: "School added successfully!!",
            school: newSchoolData
        })

    } catch (error) {
        res.status(500).json({message: error.message});
        console.log("Error in addSchool:", error.message)
    }
}

export {addSchool};