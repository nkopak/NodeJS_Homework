const bcrypt = require('bcrypt');

module.exports = {
    hash: (VIN) => bcrypt.hash(VIN, 10),
    compare: async (VIN, hashVIN) => {
        const isVINEquals = await bcrypt.compare(VIN, hashVIN);

        if (!isVINEquals) {
            throw new Error('Wrong licence plate number or VIN');
        }
    }
};
