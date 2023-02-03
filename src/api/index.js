/*
与后台交互模块
 */
import ajax from './ajax'

// 获取地址信息(根据经纬度串)
// export const reqAddress = geohash => ajax('/api/position/' + geohash)
export const reqAddress = geohash => ajax(`/api/position/${geohash}`)
// 获取msite页面食品分类列表
export const reqCategorys = () => ajax('/api/index_category')
// 获取msite商铺列表(根据经纬度)
// export const reqShops = ({a, b}) => ajax('/api/shops', {latitude:a, longitude:b})
export const reqShops = ({latitude, longitude}) => ajax('/api/shops', {latitude, longitude})
// 获取图片验证码
export const reqCaptchas = (time) => ajax('/api/captchas?time='+time)
// 账号密码登录
export const accountLogin = (name, pwd, captcha) => ajax('/api/login_pwd', {name, pwd, captcha}, 'POST')
// 获取短信验证码
export const mobileCode = phone => ajax('/api/sendcode', {phone})
// 手机号验证码登录
export const phoneLogin = (mobile, checkCode) => ajax('/api/app/banggo/loginByMobile', {mobile, checkCode,appId:'2'}, 'POST')
// 获取用户信息(根据会话)
export const reqUser = () => ajax('/api/user/banggo/getUserInfo',{},'POST')


export const testApi = () => ajax('/qianzui/proxy/factorybybrand',{brandid:15,state:'0x001C',typeid:0})
export const myReqAddress = () => ajax('https://api.uixsj.cn/hitokoto/get?type=social')

