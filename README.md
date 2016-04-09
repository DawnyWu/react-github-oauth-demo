### 教程：如何使用react实现Github Oauth验证

在线demo: [http://103.253.146.179:3007/](http://103.253.146.179:3007/)

源码: [https://github.com/DawnyWu/react-github-oauth-demo](https://github.com/DawnyWu/react-github-oauth-demo)

首先到github注册自己的应用，得到client_id 和 client_secret

#### Github Oauth认证的简单过程为

1. 用自己的client_id创建链接，用户访问链接，来到Github认证页面，在认证成功后的重定向链接中获得code参数
2. 用步骤1中的code参数加上client_id，client_secret，请求Github,获得access_token
3. 得到access_token，便可请求其它Github api,获得用户信息

#### 实现细节

由于是单页应用，github认证页面我们选择在新的浏览器window中显示

创建一个按钮，用户点击后弹出新window，window访问Github认证链接
```javascript
 <div className='btn btn-default' onClick={this.githubLogin.bind(this)}>Github</div>
```
```javascript
// 打开新窗口，访问的链接中需要填入你的`client_id`
let popWin = window.open(`https://github.com/login/oauth/authorize?client_id=${client_id}`,
                 null, "width=600,height=400")
```

查看返回的链接中是否有code参数，如果有就关闭窗口，触发code事件
```javascript
let intervalId = setInterval(checkCode, 1000);

let checkCode = () => {
  try { 
    let query = popWin.location.search.substring(1)

    code = querystring.parse(query).code

    if((typeof code)!=='undefined'){
      clearInterval(intervalId)
      popWin.close()
      eventEmitter.emit('code', code);
    }
  } catch (err){}
}

```

我们得到了code,下面要进行步骤2，获得access_token,但是这里有一个问题:

通过POST来获得access_token的链接[https://github.com/login/oauth/access_token](https://github.com/login/oauth/access_token)是不支持CORS的。这是出于安全方面的考虑。如果你在浏览器中请求它会报错误，详情和具体原因在[这里](https://github.com/isaacs/github/issues/330)有所阐述。


这个问题的解决问题的办法是client通过访问后台接口来获得access_token,向Github请求access_token的工作由server完成

```javascript
router.get('/githubToken', function (req, res) {
  var client_id = client_id // 你的client_id
  var client_secret = client_secret // 你的client_secret
  var code = req.query.code

  var access_token
  axios.post('https://github.com/login/oauth/access_token',
    {code: code, client_id: client_id, client_secret: client_secret})
  .then(function (response) {
    access_token = querystring.parse(response.data).access_token
    res.json({
      access_token: access_token
    })
  })
})
```
得到access_token,便可以访问Github api，获得用户信息了
```
 GET https://api.github.com/user?access_token=XXXXXXXXXXXXXXXX
```
```json
{
"login":"DawnyWu",
"id":949508,
"avatar_url":"https://avatars.githubusercontent.com/u/949508?v=3",
"gravatar_id":"",
"url":"https://api.github.com/users/DawnyWu",
"html_url":"https://github.com/DawnyWu",
...
}
```

更多实现细节请查看源码

源码地址:[https://github.com/DawnyWu/react-github-oauth-demo](https://github.com/DawnyWu/react-github-oauth-demo)

在线demo: [http://103.253.146.179:3007/](http://103.253.146.179:3007/)


