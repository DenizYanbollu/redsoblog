function parseRedis(data) {
    const userObj = {} 
    let aL = data.length

    while(aL) {
        aL % 2 && (userObj[data[aL-1]] = data[aL])
        aL--
    }

    return userObj
}

module.exports = parseRedis