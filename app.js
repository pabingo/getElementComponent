const fs = require("fs");
const path = require("path");
let projectPath = path.resolve("/web/src");
let elHtml = [];
const getFileName = (projectPath) => {
  let pathArr = fs.readdirSync(projectPath, (err, files) => {
    if (err) {
      console.log(err);
    } else {
      // console.log(files); 返回的文件是个数组,可以用forEach循环输出文件名
    }
  });

  pathArr.forEach((item) => {
    let newPath = path.resolve(projectPath, item);
    if (item.includes(".vue")) {
      getVueContent(newPath);
    } else if (item.includes(".")) {
      return;
    } else {
      // 读文件夹
      getFileName(newPath);
    }
    // console.log(path.resolve(projectPath,item));
  });
};
const getVueContent = (vuePath) => {
  // 读取vue文件

  let buffer = fs.readFileSync(vuePath, (err, buffer) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  if (buffer.toString().includes("<el-")) {
    let arr = buffer.toString().match(/<el-[a-z]+-[a-z]+|<el-[a-z]+/g);
    elHtml.push(...arr);
  }
};
getFileName(projectPath);
  let arrSet = new Set(elHtml);
  let list = [...arrSet];
  let newlist = list.map((item) => {
    let str = item.replace("<el", "");
    let newStr = "";
    for (let i = 0; i < str.length; i++) {
      if (str[i] == "-") {
        newStr += str[i + 1].toUpperCase();
        i++;
      } else {
        newStr += str[i];
      }
    }
    return newStr;
  });

  console.log(`import {${newlist.join(",")}} from 'element-ui'`);
  newlist.forEach(item=>{
    console.log(`Vue.use(${item})`)
  })
