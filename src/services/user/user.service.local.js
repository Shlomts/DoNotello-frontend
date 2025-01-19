import { storageService } from '../async-storage.service'
import { saveToStorage, loadFromStorage } from '../util.service'
import { makeId } from '../util.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
const STORAGE_KEY = 'userDB'

_createUsers()

export const userService = {
    login,
    logout,
    signup,
    getUsers,
    getById,
    remove,
    update,
    getLoggedinUser,
    saveLoggedinUser,
}

async function getUsers() {
    const users = await storageService.query(STORAGE_KEY)
    return users.map(user => {
        delete user.password
        return user
    })
}

async function getById(userId) {
    return await storageService.get('user', userId)
}

function remove(userId) {
    return storageService.remove('user', userId)
}

async function update({ _id, score }) {
    const user = await storageService.get('user', _id)
    user.score = score
    await storageService.put('user', user)

    // When admin updates other user's details, do not update loggedinUser
    const loggedinUser = getLoggedinUser()
    if (loggedinUser._id === user._id) saveLoggedinUser(user)

    return user
}

async function login(userCred) {
    const users = await storageService.query('user')
    const user = users.find(user => user.username === userCred.username)

    if (user) return saveLoggedinUser(user)
}

async function signup(userCred) {
    if (!userCred.imgUrl) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
    userCred.score = 10000

    const user = await storageService.post('user', userCred)
    return saveLoggedinUser(user)
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function saveLoggedinUser(user) {
    user = {
        _id: user._id,
        fullname: user.fullname,
        imgUrl: user.imgUrl,
        score: user.score,
        isAdmin: user.isAdmin
    }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

// To quickly create an admin user, uncomment the next line
// _createAdmin()
async function _createAdmin() {
    const user = {
        username: 'admin',
        password: 'admin',
        fullname: 'Mustafa Adminsky',
        imgUrl: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png',
        score: 10000,
    }

    const newUser = await storageService.post('user', userCred)
    console.log('newUser: ', newUser)
}


// for DEV 

function _createUsers() {
    let users = loadFromStorage(STORAGE_KEY)

    if (!users || !users.length) {
        users = [
            _createUser('C101', 'Chen Levavi', 'chen.levavi@example.com', 'https://res.cloudinary.com/dtyqjifzy/image/upload/v1736784587/chen_fwdvsr.jpg'),
            _createUser('S101', 'Shlomit Horn', 'shlomit.horn@example.com', 'https://res.cloudinary.com/dtyqjifzy/image/upload/v1736784587/shlomit_ggjyyr.png'),
            _createUser('K101', 'Keren Vasserman', 'keren.vasserman@example.com', 'https://res.cloudinary.com/dtyqjifzy/image/upload/v1736784587/keren_vw7vmq.png'),
            _createUser('B101', 'Beyonce Knowles', 'beyonce.knowles@example.com', 'https://res.cloudinary.com/dtyqjifzy/image/upload/v1736784864/beyonce_spjmuf.webp'),
            _createUser('BA101', 'Batel Katiei', 'Batel.Katiei@example.com', 'https://res.cloudinary.com/dtyqjifzy/image/upload/v1737323551/batel_nxojap.jpg'),
            _createUser('L101', 'Lord Vold', 'lord.vold@example.com',),
        ]
        saveToStorage(STORAGE_KEY, users)
    }
}

function _createUser(id, fullname, email, imgUrl) {
    const username = '@' + email.split('@')[0].replace(/\./g, '')
    return {
        id,
        fullname,
        username,
        // password,
        imgUrl,
        // mentions: []
    }
}
