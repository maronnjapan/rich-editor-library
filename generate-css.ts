import * as fs from "fs";
import { globSync } from 'glob'
import * as path from 'path'

const pathes = globSync('./src/**/style-for-gen.css')

function generateHash(str: string) {
    // 単純なハッシュ関数の例（実際の用途に応じて別のハッシュ関数を使用可能）
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash).toString(16).substring(0, 6);
}

function processCSS(cssString: string) {
    // クラスセレクターを抽出する正規表現
    const classRegex = /\.([a-zA-Z0-9-_]+)(?=[\s{,:}])/g;

    // ユニークなクラス名を格納
    const uniqueClasses = new Set<string>();
    let match;

    // すべてのクラス名を収集
    while ((match = classRegex.exec(cssString)) !== null) {
        uniqueClasses.add(match[1]);
    }

    // クラス名とハッシュ化されたクラス名のマッピングを作成
    const classMapping: Record<string, string> = {};
    uniqueClasses.forEach(className => {
        const hash = generateHash(className);
        classMapping[className] = `${className}-${hash}`;
    });

    // CSSの内容を置換
    let processedCSS = cssString;
    Object.entries(classMapping).forEach(([originalClass, hashedClass]) => {
        const regex = new RegExp(`\\.${originalClass}(?=[\\s{,:}])`, 'g');
        processedCSS = processedCSS.replace(regex, `.${hashedClass}`);
    });

    return {
        classMapping,
        processedCSS
    };
}


const styles: string[] = []
pathes.forEach(absoletePath => {
    const readFile = fs.readFileSync(absoletePath)

    const { classMapping, processedCSS } = processCSS(readFile.toString())

    fs.writeFileSync(path.join(path.dirname(absoletePath), 'styles.ts'), `export const styles = ${JSON.stringify(classMapping)}`)
    styles.push(processedCSS)
})
fs.writeFileSync(path.join(process.cwd(), 'src/global-style.css'), `@import url(https://fonts.googleapis.com/css?family=Noto+Sans+JP);\n${styles.join(' ')}`)



