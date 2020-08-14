const mongoose = require('mongoose');

const dbUrl = 'mongodb://' +
    'Beom%20Seok:Kang5700!!@' +
    'localhost' +
    ':27017' +
    '/admin';

const connect = () => {
    if (process.env.NODE_ENV !== 'production') {
        mongoose.set('debug', true);
    }
    mongoose.connect(dbUrl, {
        dbName: 'nodejs',
        useNewUrlParser: true,
        useCreateIndex: true,
    }, (err) => {
        if (err) {
            console.error('몽고디비 연결 에러', err);
        } else {
            console.log('몽고디비 연결 성공');
        }
    });
};
mongoose.connection.on('error', (err) => {
    console.error('몽고디비 연결 에러', err);
});
mongoose.connection.on('disconnected', () => {
    console.error('몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.');
    connect();
});

module.exports = connect;