const bonjour = require('bonjour')();

bonjour.find({ type: 'http' }, service => {
    console.log('✅ Нашли наш сервис:', service.name);
});