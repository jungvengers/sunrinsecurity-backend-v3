import env from "dotenv"
env.config()

import { NodeSSH } from "node-ssh"

const ssh = new NodeSSH()
const deploy = async () => {
    await ssh.connect({
        host: process.env.HOST,
        username: process.env.ID,
        password: process.env.PW,
        port: process.env.PORT || 22
    })

    await ssh.execCommand(`
        cd backend &&
        git pull &&
        yarn build &&
        pm2 delete all &&
        yarn production - start
    `)

    process.exit(0)
}

deploy()