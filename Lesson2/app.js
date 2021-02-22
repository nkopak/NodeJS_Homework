const express = require('express');
const expressHbs = require('express-handlebars');
const path = require('path');
const fs = require('fs');
const app = express();
const usersDir = path.join(__dirname, 'users');
const usersFile = require(path.join(__dirname, 'users', 'users.js'));
const users = usersFile.users;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({
    defaultLayout: false
}));
app.set('views', path.join(__dirname, 'static'));

//-------------------------All users -------------------------
app.get('/users', ((req, res) => {
    res.render('users', {users});
}))

//-------------------------Registration-------------------------
app.get('/register', (req, res) => {
    res.render('register')
})
app.post('/register', ((req, res) => {
    const registeredUser = users.find(item => item.email === req.body.email)
    if (registeredUser) {
        res.redirect('/error')
        return
    }
    users.push(req.body)
    res.redirect('/users')
    // console.log(users);
    // console.log(registeredUser);
    // console.log(req.body);
}))

//-------------------------Login -------------------------
app.get('/login', (req, res) => {
    res.render('login')
})
app.post('/login', (req, res) => {
    const userId = users.findIndex(item => {

        return (item.email === req.body.email && item.password === req.body.password)
    })
    // console.log(userId);
    if (userId >= 0) {
        res.redirect(`users/${userId}`)
        return
    }
    res.redirect('/error')
})


//-------------------------Full user info -------------------------
app.get('/users/:userId', (req, res) => {
    const {userId} = req.params;
    res.render('fullUserInfo', {userInfo: users[userId]});
})


//-------------------------Error page -------------------------
app.get('/error', ((req, res) => {
    res.render('errorPage')
}))

app.listen(5000, () => {
    console.log('App running on port 5000');
    // console.log(users[users.length - 1]);
    // console.log(users);
})













