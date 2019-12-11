const fs = require('fs')
const http = require('http')
 
module.exports.loadFromFile = filePath => {
    return new Promise((resolve,reject) => {
        return resolve(JSON.parse(fs.readFileSync(filePath, 'utf8')))
    })
}

module.exports.saveToFile = (filePath, jsonData) => fs.writeFileSync(filePath, JSON.stringify(jsonData))

module.exports.loadFromUrl = url => {
    return new Promise((resolve,reject) => {
    http.get(url, (res) => {
        let body = ''
    
        res.on('data', (chunk) => {
            body += chunk
        });
    
        res.on('end', () => {
            resolve(JSON.parse(body))
        })
    }).on('error', (e) => {
        reject(e)
    })
})
}