const fs = require('fs');
const path = require('path');

const dirName18 = path.join(__dirname, 'Users_18_00');
const dirName20 = path.join(__dirname, 'Users_20_00');

//Females to 20:00
fs.readdir(dirName18, (err, files) => {
        if (err) {
            console.log(err);
            return
        }
        files.forEach(fileName => {
            fs.stat(path.join(dirName18, fileName), (err1, stats) => {
                if (err1) {
                    console.log(err1)
                    return
                }
                const person = require(path.join(dirName18, fileName));
                if (person.gender === 'female') {
                    fs.rename(path.join(dirName18, fileName), path.join(dirName20, fileName), err2 => {
                        if (err2) {
                            console.log(err2);
                            return
                        }
                    })
                }
            })
        })
    }
)
//Males to 18:00
fs.readdir(dirName20, (err, files) => {
    if (err) {
        console.log(err);
        return
    }
    files.forEach(fileName => {
        fs.stat(path.join(dirName20, fileName), (err1, stats) => {
            if (err1) {
                console.log(err1);
                return
            }
            const person = require(path.join(dirName20, fileName))
            if (person.gender === 'male') {
                fs.rename(path.join(dirName20, fileName), path.join(dirName18, fileName), err2 => {
                    if (err2) {
                        console.log(err2);
                    }
                })
            }
        })
    })
})

