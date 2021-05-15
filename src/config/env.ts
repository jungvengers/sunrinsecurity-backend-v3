const config = {
    DB_URI: process.env.DB_URI || "mongodb://localhost:27017/database",
    JWT_SECRET: process.env.JWT_SECRET || "apple",
    REGISTRATION_SECRET: process.env.REGISTRATION_SECRET || "default_key",
    NCP_SECRET_KEY: process.env.NCP_SECRET_KEY,
    NCP_ACCESS_KEY: process.env.NCP_ACCESS_KEY
}

export default config
