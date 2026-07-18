const path = require('path');
const moment = require('moment-timezone');
const fs = require('fs');

const DTime = {
    now: () => moment.tz('Asia/Rangoon').format('YYYY-MM-DD'),
    timeStamp: () => moment.tz('Asia/Rangoon').unix(),
    dateTime: () => moment.tz('Asia/Rangoon').format('YYYY-MM-DD HH:mm:ss'),
};

const errorFile = {
    write: (data) => {
        const fileName = DTime.now() + '_' + DTime.timeStamp() + '.txt';
        const dirPath = path.join(__dirname, '../errors');

        // Create errors directory if it doesn't exist
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }

        const filePath = path.join(dirPath, fileName);
        const logData = {
            timestamp: DTime.dateTime(),
            data: data,
        };
        fs.writeFileSync(filePath, JSON.stringify(logData, null, 2), 'utf-8');
    },
    read: (fileName) => {
        const filePath = path.join(__dirname, '../errors/' + fileName + '.txt');
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, { encoding: 'utf-8' });
            return JSON.parse(data);
        }
        return null;
    },
    list: () => {
        const dirPath = path.join(__dirname, '../errors');
        if (!fs.existsSync(dirPath)) {
            return [];
        }
        return fs.readdirSync(dirPath);
    },
};

module.exports = {
    DTime,
    errorFile,
};