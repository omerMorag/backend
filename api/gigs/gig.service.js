const fs = require('fs')
const gGigs = require('../../data/cinco.json')


const query=(filterBy=null)=> {
        let gigs = gGigs.gig;
        if (filterBy)
        gigs = gigs.filter(gig => gig.tags.containe(filterBy));
       return Promise.resolve(gigs);
}

function getById(gigId) {
    const gig =gGigs.gig.find(gig => gig._id === gigId)
    return Promise.resolve(gig)
}


// function remove(carId, username) {
//     const idx = gCars.findIndex(car => car._id === carId && car.owner.username === username)
//     if (idx === -1) {
//         return Promise.reject('Cannot remove Car')
//     }
//     gCars.splice(idx, 1)
//     return _saveCarsToFile()
// }


// function save(car) {
//     if (car._id) {
//         const idx = gCars.findIndex(currCar => currCar._id === car._id)
//         gCars[idx] = car;
//     } else {
//         car._id = _makeId()
//         gCars.push(car)
//     }
//     return _saveCarsToFile()
//         .then(() => {
//             return car;
//         })
// }


// module.exports = {
//     query,
//     getById,
//     remove,
//     save
// }

// function _makeId(length = 5) {
//     var txt = '';
//     var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     for (let i = 0; i < length; i++) {
//         txt += possible.charAt(Math.floor(Math.random() * possible.length));
//     }
//     return txt;
// }

// function _saveCarsToFile() {
//     return new Promise((resolve, reject) => {
//         fs.writeFile('data/car.json', JSON.stringify(gCars, null, 2), (err) => {
//             if (err) return reject(err)
//             resolve();
//         })
//     })
// }

module.exports = {
    query,
    getById
}