# surver-system

> a surver system project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run e2e tests
npm run e2e

# run all tests
npm test
```

#### 一：介绍

这是一个基于node+vue+mongodb的小型问卷调查系统。

首先进入项目目录输入npm run dev 开启8080端口进行访问
然后进去server目录运行node-dev index.js 开启后台服务8088端口，最后开启mongodb服务即可访问

#### 二：使用到的模块

![](C:\Users\w\Desktop\毕设截图\1.png)



#### 三：实现的功能和截图

#### 1)功能流程图

![](C:\Users\w\Desktop\毕设截图\liucheng.png)

#### 2）实现截图和说明

![](C:\Users\w\Desktop\毕设截图\adminLogin.png)

​	登录截图，包含有数据的校验和错误提示，用户登录类似，不重复展示





![](C:\Users\w\Desktop\毕设截图\allSurver.png)

​	登录后的默认界面，可以看到功能nav菜单和对问卷的操作



![](C:\Users\w\Desktop\毕设截图\editSurver.png)

​	编辑问卷功能，新建问卷重用这个template



![](C:\Users\w\Desktop\毕设截图\surverAnswer.png)

​	问卷结果查看，图形是用v-chart实现的。

​	发布和删除功能不贴具体的截图了



![](C:\Users\w\Desktop\毕设截图\userInformation.png)

​	查看用户信息，能删除用户，重置密码

![](C:\Users\w\Desktop\毕设截图\addUser.png)

​	添加用户包含基本的校验



![](C:\Users\w\Desktop\毕设截图\addReleaseSurver.png)

​	用户登录后的默认界面，登录实现和管理员登录一样，图就不贴了，用户能进行的操作有参加问卷，修改信息，退出登录

![](C:\Users\w\Desktop\毕设截图\answerSurver.png)

![](C:\Users\w\Desktop\毕设截图\usereditInformation.png)