import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'admin',
        email: 'admin@example.com',
        password: bcrypt.hashSync('admin123', 10),
        isAdmin: true
    },
    {
        name: 'Tom',
        email: 'tom@example.com',
        password: bcrypt.hashSync('111111', 10),
    },
    {
        name: 'Jerry',
        email: 'jerry@example.com',
        password: bcrypt.hashSync('222222', 10),
    },
]

export default users