import { Socket } from 'net';

export default function connect(port, callback) {
    const socket = new Socket();

    socket.on('data', (buf) => {
        const lines = buf.toString().split('\r\n');
        const lastLine = lines[lines.length - 2];
        const data = JSON.parse(lastLine);

        callback(data);
    });

    socket.connect(port);
    return socket;
}
