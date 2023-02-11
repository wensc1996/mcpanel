import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1675842863228_1921';

  // add your egg config in here
  config.middleware = [];

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };
  
  // 注意，开启此模式后，应用就默认自己处于反向代理之后，
  // 会支持通过解析约定的请求头来获取用户真实的 IP，协议和域名。
  // 如果你的服务未部署在反向代理之后，请不要开启此配置，以防被恶意用户伪造请求 IP 等信息。
  config.proxy = true;

  const security = {
    csrf: {
      enable: false,
      // 判断是否需要 ignore 的方法，请求上下文 context 作为第一个参数
      // ignore: (ctx) => isInnerIp(ctx.ip),
      // ignore: false
    },
  }

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
    security
  };
};
