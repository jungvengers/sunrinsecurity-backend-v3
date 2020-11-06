const config = {
    "DB_URI": process.env.DB_URI || "mongodb://localhost:27017/database",
    "JWT_SECRET": process.env.JWT_SECRET || "apple",
}

export default config
