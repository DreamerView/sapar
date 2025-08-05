const bonjour = require('bonjour')();

bonjour.publish({ name: 'Test Service', type: 'http', port: 3000 });

console.log('Published service as "Test Service" on port 3000');
