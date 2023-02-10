import { EggPlugin } from 'egg';
exports.sqlite3 = {
  enable: true,
  package: 'egg-sqlite3',
};

const plugin: EggPlugin = {
  
  // static: true,
  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks',
  // },
};

export default plugin;
