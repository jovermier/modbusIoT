// create an empty modbus client
//var ModbusRTU = require("modbus-serial");
var ModbusRTU = require("../index");
var client = new ModbusRTU();

// open connection to a tcp line
client.connectTCP("10.11.18.155");

/* read 10 registers every one second 
 * 1 - The Slave Address.
 * 0 - The Data Address of the first register.
 * 10 - Number of registers to read.
 */
setInterval(function() {
    client.readHoldingRegisters(139, 19, function(err, data) {
        console.log(data.data);
    });
}, 1000);
