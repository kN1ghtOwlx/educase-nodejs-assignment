

const addSchool = async (req, res) => {
    try {
        res.send("Api running successfully");

    } catch (error) {
        res.status(500).json({message: error.message});
        console.log("Error in addSchool:", error.message)
    }
}

export {addSchool};