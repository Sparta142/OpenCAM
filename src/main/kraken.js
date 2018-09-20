import { EventEmitter } from 'events';
import { findByIds } from 'usb';

export default class Kraken extends EventEmitter {
    constructor(vendorId = 0x2433, productId = 0xb200) {
        super();

        this.device = findByIds(vendorId, productId);
        this.deviceInterface = null;

        this.pumpSetpoint = 100;
        this.fanSetpoint = 100;

        this.intervalId = null;
    }

    get inEndpoint() {
        return this.deviceInterface.endpoint(0x82);
    }

    get outEndpoint() {
        return this.deviceInterface.endpoint(0x2);
    }

    connect() {
        this.device.open(true);
        this.deviceInterface = this.device.interface(0);
        this.deviceInterface.claim();

        // Initialization
        this.device.controlTransfer(0x40, 2, 0x0002, 0, Buffer.alloc(0));

        // Update the device settings once per second
        this.intervalId = setInterval(this.communicate.bind(this), 1000);
    }

    disconnect() {
        // Stop updating the device settings.
        clearInterval(this.interval);
        this.interval = null;

        // Release and close the USB device.
        this.deviceInterface.release(true, () => {
            this.device.close();

            this.deviceInterface = null;
            this.device = null;
        });

        this.emit('disconnect');
    }

    // https://github.com/jaksi/leviathan/blob/master/PROTOCOL.md#communication
    communicate() {
        this.device.controlTransfer(0x40, 2, 0x0001, 0, Buffer.alloc(0));

        this.outEndpoint.transfer(Buffer.from([0x13, this.pumpSetpoint]));
        this.outEndpoint.transfer(Buffer.from([0x12, this.fanSetpoint]));

        this.inEndpoint.transfer(64, (_inEndpoint, data, error) => {
            if (error) {
                return; // TODO
            }

            this.emit('data', {
                pumpSpeed: (256 * data[8]) + data[9],
                fanSpeed: (256 * data[0]) + data[1],
                liquidTemp: data[10],
            });
        });
    }
}
