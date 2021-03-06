const fs = require('fs')
const http = require('http')

module.exports.loadFromFile = filePath => {
    return new Promise(resolve => {
        return resolve(JSON.parse(fs.readFileSync(process.cwd() + '/' + filePath, 'utf8')))
    })
}

module.exports.saveToFile = (filePath, jsonData) => fs.writeFileSync(filePath, JSON.stringify(jsonData))

module.exports.loadFromUrl = url => {

    const SUBMITTER_API_KEY = new Buffer(` :${process.env.SUBMITTER_API_KEY}`).toString('base64')
    const options = {
        headers: {
            'Authorization': `Basic ${SUBMITTER_API_KEY}`
        }
    }
    return new Promise((resolve, reject) => {
        http.get(url, options, (res) => {

            let body = ''

            res.on('data', (chunk) => {
                body += chunk
            });

            res.on('end', () => {
                resolve(JSON.parse(body))
            })
        }).on('error', (e) => {
            console.log(`${url}: error`, e)
            reject(e)
        })
    })
}
