const SOCKET_EVENT_ORDER_ADDED = 'order-added';
const asyncLocalStorage = require('./als.service');
const logger = require('./logger.service');

var gIo = null

function connectSockets(http, session) {
    gIo = require('socket.io')(http, {
        cors: {
            origin: '*',
        }
    })
    gIo.on('connection', socket => {
        console.log('New socket', socket.id)
        socket.on('disconnect', socket => {
        })
        socket.on(SOCKET_EVENT_ORDER_ADDED, addedOrder => {
                emitToUser('new order', addedOrder, addedOrder.sellerId)
        })
        socket.on('set-user-socket', userId => {
            logger.debug(`Setting (${socket.id}) socket.userId = ${userId}`)
            console.log(`Setting (${socket.id}) socket.userId = ${userId}`);
            socket.userId = userId
        })
        socket.on('unset-user-socket', () => {
            delete socket.userId
        })

    })
}

function newOrderAdded(addedOrder){
    emitToUser('new order', {type: 'toSeller', order: addedOrder, txt:`New order from: ${addedOrder.buyer}`}, addedOrder.sellerId)
}

function emitTo({ type, data, label }) {
    if (label) gIo.to('watching:' + label).emit(type, data)
    else gIo.emit(type, data)
}
// use for private messages
async function emitToUser( type, data, userId ) {
    logger.debug('Emiting to user socket: ' + userId)
    console.log('Emiting to user socket: ',  userId);
    const socket = await _getUserSocket(userId)
    // console.log('socket: ',socket);
    if (socket) socket.emit(type, data)
    else {
        console.log('User socket not found');
    }
}

async function _getUserSocket(userId) {
    const sockets = await _getAllSockets();
    const socket = sockets.find(s => s.userId == userId)
    // console.log('user socket: ',socket);
    return socket;
}
async function _getAllSockets() {
    // return all Socket instances
    const sockets = await gIo.fetchSockets();
    // console.log('All sockets:', sockets );
    return sockets;
}

module.exports = {
    connectSockets,
    emitTo,
    emitToUser,
    newOrderAdded
}



