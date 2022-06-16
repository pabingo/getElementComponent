## 获取项目中elementui用到的组件
因为有些时候我们需要把elementui库引入从全部引入转变为按需加载<br />
所以写了个小工具，读取vue项目文件下所有的内容然后对字符串进行匹配<br />

```
let projectPath = path.resolve("/web/src");
// 需要寻找的文件夹路径
```

## 使用方法

```
node app.js
```
