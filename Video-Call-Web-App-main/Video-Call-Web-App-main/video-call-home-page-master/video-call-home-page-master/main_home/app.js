const express = require('express')
const app = express()
const port = 443

app.use(express.static('public'))

app.use('/css', express.static(__dirname + 'public'))


app.set('views', './views')
app.set('view engine', 'ejs')



//home page
app.get('', (req, res) => {
    res.render('index')
})

//fun page
app.get('/fun', (req, res) => {
    res.render('fun')
})

//game page
app.get('/game', (req, res) => {
    res.render('game')
})



// listen to port
app.listen(process.env.PORT || 3000)