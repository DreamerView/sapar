const { opendir } = require('fs').promises;
const path = require('path');


class StreamSearcher {
    constructor(rootDir) {
        this.rootDir = rootDir;
    }


    // Ленивый генератор поиска
    async *search(dir = this.rootDir, queryLC) {
        const it = await opendir(dir);
        for await (const dirent of it) {
            const full = path.join(dir, dirent.name);
            const nameLC = dirent.name.toLowerCase();
            if (dirent.isDirectory()) {
                if (nameLC.toLowerCase().includes(queryLC.toLowerCase())) yield full;
                yield* this.search(full, queryLC);

            } else {
                if (dirent.name.toLowerCase().includes(queryLC.toLowerCase())) yield full;
            }
        }
    }

    // Новый метод: собирает все результаты в массив
    async searchAll(query) {
        const results = [];
        for await (const filePath of this.search(this.rootDir, query)) {
            results.push(filePath);
        }
        return results;
    }
}

// Пример использования:
(async () => {
    const s = new StreamSearcher('C:/Users/User/Documents/SaparMini/uploads');
    console.log(s);
    const matches = await s.searchAll('Сертифи');
    console.log(matches); // это уже массив всех путей, в которых встречается "pic"
})();
