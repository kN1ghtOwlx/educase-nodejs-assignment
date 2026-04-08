import db from "../config/db.js"

const isLatitue = (value) => {
    return typeof value === "number" && value >= -90 && value <= 90;
};

const isLogitute = (value) =>{
    return typeof value === "number" && value >= -180 && value <= 180;
};

// used ai for this calculation
const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
  
    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;
  
    return 2 * R * Math.asin(Math.sqrt(a));
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

const listSchool = async (req, res) => {
    try {
        // res.send("Api working successfully!")
        const {latitude, longitude} = req.body;
        if(latitude === undefined || longitude === undefined){
            return res.status(400).json({
                message: "All fields are requires!",
                latitude: "-90 <= number >= 90",
                longitude: "-180 <= number => 180"
            })
        };

        const lat = Number(latitude);
        const lon = Number(longitude);

        if(Number.isNaN(lat) || Number.isNaN(lon) || !isLatitue(lat) || !isLogitute(lon)){
            return res.status(400).json({
                message: "Invalid Fields!!",
                latitude: "-90 <= number >= 90",
                longitude: "-180 <= number => 180"
            })
        };

        const [totalSchool] = await db.execute("Select * from schools");

        const sortSchool = totalSchool.map((school) => ({
            ...school,
            distanceInKM: Number(haversineDistance(lat, lon, Number(school.latitude), Number(school.logitude)).toFixed(2))
        })).sort((a, b) => a.distanceInKM - b.distanceInKM);

        return res.status(200).json({
            message: "Schools found sccessfully!",
            totalSchools: totalSchool.length,
            schools: sortSchool
        })

    } catch (error) {
        res.status(500).json({message: error.message});
        console.log("Error in listSchool:", error.message)
    }
}

export {addSchool, listSchool};