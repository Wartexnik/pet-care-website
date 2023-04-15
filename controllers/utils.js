const fs = require('fs');

const getRandomAnimals = async function() {
    let randomAnimals = []
    const files = await fs.promises.readdir('./static/resources/random-animals')
    randomAnimals = files.map((file) => {
        return `/resources/random-animals/${file}`
    })
    return randomAnimals
}

module.exports = {
    getRandomAnimals
};