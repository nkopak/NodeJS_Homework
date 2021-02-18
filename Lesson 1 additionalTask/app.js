const fs = require('fs');


const filePath = `${__dirname}/old-Directory/asdasd.js`;
const oldDirName = __dirname + '/old-Directory';
const newDirName = __dirname + '/new-Directory';


fs.readdir(oldDirName, (err, files) => {
    if(err){
        console.log(err);
        return
    }

    files.forEach(fileName=>{
        fs.stat(oldDirName + `/${fileName}`, (err1, stats) => {
            if(!stats.isDirectory()){
                fs.rename(`${oldDirName}/${fileName}`,`${newDirName}/${fileName}` , err2 => {
                    if(err2){
                        console.log(err2);
                    }
                })
            } else if(stats.isDirectory()){
                fs.rename(`${oldDirName}/${fileName}`,`${newDirName}/${fileName}` , err2 => {
                    if(err2){
                        console.log(err2);
                    }
                })
            }
        })
    })
})
