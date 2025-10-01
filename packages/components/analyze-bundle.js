const fs = require("fs");
const path = require("path");

// 计算文件大小（KB）
function getFileSizeInKB(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return (stats.size / 1024).toFixed(2);
  } catch (error) {
    return "0";
  }
}

// 递归获取目录下所有文件
function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllFiles(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  });
  return fileList;
}

console.log("📦 构建产物分析\n");
console.log("=".repeat(80));

const libDir = path.join(__dirname, "lib");

if (!fs.existsSync(libDir)) {
  console.log("❌ 构建产物不存在，请先运行 pnpm run build");
  process.exit(1);
}

// 分析主入口
console.log("\n🎯 全量引入（不推荐）");
console.log("-".repeat(80));
const mainIndex = path.join(libDir, "index.js");
const mainStyle = path.join(libDir, "style.css");
const mainSize =
  parseFloat(getFileSizeInKB(mainIndex)) +
  parseFloat(getFileSizeInKB(mainStyle));
console.log(`主入口文件: ${getFileSizeInKB(mainIndex)} KB`);
console.log(`全局样式:   ${getFileSizeInKB(mainStyle)} KB`);
console.log(`总计:       ${mainSize.toFixed(2)} KB`);

// 分析各个组件
console.log("\n🎯 按需引入（推荐）");
console.log("-".repeat(80));

const components = fs
  .readdirSync(libDir)
  .filter((file) => fs.statSync(path.join(libDir, file)).isDirectory());

let totalComponentSize = 0;
const componentSizes = [];

components.forEach((component) => {
  const componentDir = path.join(libDir, component);
  const jsFile = path.join(componentDir, "index.js");
  const cssFile = path.join(componentDir, "style.css");

  const jsSize = parseFloat(getFileSizeInKB(jsFile));
  const cssSize = parseFloat(getFileSizeInKB(cssFile));
  const totalSize = jsSize + cssSize;

  componentSizes.push({
    name: component,
    jsSize,
    cssSize,
    totalSize,
  });

  console.log(`\n📦 ${component.charAt(0).toUpperCase() + component.slice(1)}`);
  console.log(`   JS:    ${jsSize.toFixed(2)} KB`);
  console.log(`   CSS:   ${cssSize.toFixed(2)} KB`);
  console.log(`   总计:  ${totalSize.toFixed(2)} KB`);

  totalComponentSize += totalSize;
});

// 对比分析
console.log("\n\n📊 体积对比分析");
console.log("=".repeat(80));

console.log("\n场景 1: 只使用 Button 组件");
console.log("-".repeat(80));
const buttonSize =
  componentSizes.find((c) => c.name === "button")?.totalSize || 0;
console.log(`按需引入: ${buttonSize.toFixed(2)} KB`);
console.log(`全量引入: ${mainSize.toFixed(2)} KB`);
const saving1 = ((1 - buttonSize / mainSize) * 100).toFixed(1);
console.log(`节省体积: ${saving1}% 📉`);

console.log("\n场景 2: 使用 Button + Dialog 组件");
console.log("-".repeat(80));
const dialogSize =
  componentSizes.find((c) => c.name === "dialog")?.totalSize || 0;
const twoComponentsSize = buttonSize + dialogSize;
console.log(`按需引入: ${twoComponentsSize.toFixed(2)} KB`);
console.log(`全量引入: ${mainSize.toFixed(2)} KB`);
const saving2 = ((1 - twoComponentsSize / mainSize) * 100).toFixed(1);
if (saving2 > 0) {
  console.log(`节省体积: ${saving2}% 📉`);
} else {
  console.log(`增加体积: ${Math.abs(saving2)}% (因为组件较少)`);
}

console.log("\n场景 3: 使用所有组件");
console.log("-".repeat(80));
console.log(`按需引入: ${totalComponentSize.toFixed(2)} KB`);
console.log(`全量引入: ${mainSize.toFixed(2)} KB`);
const diff = totalComponentSize - mainSize;
if (diff > 0) {
  console.log(`说明: 按需引入会比全量引入多 ${diff.toFixed(2)} KB`);
  console.log(`原因: 每个组件独立打包会有少量重复代码`);
  console.log(`建议: 使用所有组件时，推荐全量引入`);
} else {
  console.log(
    `节省体积: ${((1 - totalComponentSize / mainSize) * 100).toFixed(1)}% 📉`
  );
}

// 推荐方案
console.log("\n\n💡 推荐方案");
console.log("=".repeat(80));
console.log("\n✅ 使用 1-2 个组件:");
console.log("   推荐按需引入，可以节省 " + saving1 + "% 以上的体积");
console.log("\n✅ 使用 3+ 个组件:");
console.log("   根据实际情况选择，或配置 babel-plugin-import");
console.log("\n✅ 使用所有组件:");
console.log("   推荐全量引入 Vue.use(MyComponents)");

// 文件清单
console.log("\n\n📋 完整文件清单");
console.log("=".repeat(80));
const allFiles = getAllFiles(libDir);
console.log(`\n共 ${allFiles.length} 个文件:\n`);
allFiles.forEach((file) => {
  const relativePath = path.relative(libDir, file);
  const size = getFileSizeInKB(file);
  console.log(`  ${relativePath.padEnd(40)} ${size.padStart(8)} KB`);
});

console.log("\n" + "=".repeat(80));
console.log("✨ 分析完成！");
console.log("=".repeat(80) + "\n");



