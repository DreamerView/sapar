const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const pngToIco = require('png-to-ico');
const icongen = require('icon-gen');

const input = path.join(__dirname, "public", 'icons', 'logo.png'); // PNG 1024x1024
const tempDir = path.join(__dirname, "public", 'icons', 'win-icons');
const outputDir = path.join(__dirname, "public", "icons");

// Создаём временную папку
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
}

// размеры для ICO
const sizes = [256, 128, 64, 48, 32, 16];

// функция для удаления папки рекурсивно
function deleteFolderRecursive(folderPath) {
    if (fs.existsSync(folderPath)) {
        fs.readdirSync(folderPath).forEach(file => {
            const curPath = path.join(folderPath, file);
            if (fs.lstatSync(curPath).isDirectory()) {
                deleteFolderRecursive(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(folderPath);
    }
}

(async () => {
    try {
        console.log('📦 Генерация PNG разных размеров...');
        const resizedPaths = [];

        for (const size of sizes) {
            const outPath = path.join(tempDir, `icon-${size}.png`);
            await sharp(input)
                .resize(size, size)
                .toFile(outPath);
            resizedPaths.push(outPath);
        }

        console.log('🎯 Генерация ICO...');
        const icoBuffer = await pngToIco(resizedPaths);
        fs.writeFileSync(path.join(outputDir, 'win-icons.ico'), icoBuffer);

        console.log('🍏 Генерация ICNS...');
        await icongen(input, outputDir, {
            report: true,
            icns: { name: 'mac-icon' },
            modes: ['icns']
        });

        // Удаляем временные PNG
        console.log('🧹 Очистка временных файлов...');
        deleteFolderRecursive(tempDir);

        console.log('✅ Готово! Созданы win-icons.ico и mac-icon.icns.');
    } catch (err) {
        console.error('❌ Ошибка:', err);
    }
})();
