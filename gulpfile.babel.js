import gulp from 'gulp';
import webpack from 'webpack';
import path from 'path';
import rename from 'gulp-rename';
import template from 'gulp-template';
import change from 'gulp-change';
import yargs from 'yargs';
import _ from 'lodash';
import fs from 'fs';
import gutil from 'gulp-util';
import serve from 'browser-sync';
import del from 'del';
import webpackDevMiddelware from 'webpack-dev-middleware';
import webpachHotMiddelware from 'webpack-hot-middleware';
import colorsSupported from 'supports-color';
import historyApiFallback from 'connect-history-api-fallback';

process.noDeprecation = true;
//source code folder
const root = 'client';
const Environments = fs.readdirSync('./config')
const getConfig = override => override
  ? override
  : process.env.NODE_ENV || (Environments.indexOf('local.js') !== -1 ? 'local' : 'development');

// helper methods for resolving paths
const pathTypes = {
  app: 'app',
  components: 'app/components',
  constants: 'app/constants',
  factories: 'app/factories',
  routes: 'app/routes',
  services: 'app/services'
};
const resolvePath = (type, glob = '') => path.join(root, pathTypes[type], glob);
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);

// map of all paths
const paths = {
  js: resolvePath('components', '**/*!(.spec.js).js'),
  styl: resolvePath('app', '**/*.scss'),
  html: [
    resolvePath('app', '**/*.html'),
    path.join(root, 'index.html')
  ],
  entry: [
    'babel-polyfill',
    path.join(__dirname, root, 'app/app.js')
  ],
  output: root,
  blank: type => path.join(__dirname, 'generator', `${type}/**/*.**`)
};

//Generate path for scss files
const getRootLevel = string => _.times(string.split('/').length - 1, '').join('../');

//create imports for generated modules
const modulize = (content, moduleGroup, module) => {

  const s = content.indexOf('//IMPORTS') + '//IMPORTS'.length;
  const e = content.indexOf(']);');
  const start = content.substr(0, s);
  const end = content.substring(e);
  const previous = content.substring(s, e);

  const imports = `\nimport './${yargs.argv.name}${module ? '/' + module : ''}';`;
  const moduleDef = `  'app.${moduleGroup}.${module || yargs.argv.name}',`;

  return `${start + imports + previous + moduleDef}\n${end}`;
};

//creates gulp task
const generator = type => () => {
  const proto = yargs.argv.name.split('/');
  const name = _.last(proto);
  const typed = type !== 'factory' ? `${type}s` : 'factories';
  const destPath = path.join(resolvePath(typed), yargs.argv.name);
  const scssPath = getRootLevel(resolvePath(typed) + `/${proto.join('/')}`);

  gulp.src(path.join(resolvePath(typed), 'index.js'), {base: './'})
    .pipe(change(content => modulize(content, typed, name)))
    .pipe(gulp.dest('./'));

  return gulp.src(paths.blank(type))
    .pipe(template({
      name: name,
      nameCamelCase: _.camelCase(name),
      scssPath: scssPath,
      APP: `app.${typed}`,
      upCaseName: cap(name)
    }))
    .pipe(rename(path => {
      path.basename = path.basename.replace('temp', name);
    }))
    .pipe(gulp.dest(destPath));
};

//use webpack.config.js to build modules
gulp.task('build', cb => {
  const config = require('./webpack.dist.config');
  config.entry.app = paths.entry;

  webpack(config, (err, stats) => {
    if(err) {
      throw new gutil.PluginError('webpack', err);
    }
    gutil.log('[webpack]', stats.toString({
      colors: colorsSupported,
      chunks: false,
      errorDetails: false
    }));

    cb();
  });
});

gulp.task('serve', () => {
  const config = require('./webpack.dev.config');
  config.entry.app = [
    'webpack-hot-middleware/client',
  ].concat(paths.entry);

  const compiler = webpack(config);

  serve({
    port: process.env.PORT || 4000,
    open: false,
    server: {baseDir: root},
    middleware: [
      historyApiFallback(),
      webpackDevMiddelware(compiler, {
        stats: {
          colors: colorsSupported,
          chunks: false,
          modules: false
        },
        publicPath: config.output.publicPath
      }),
      webpachHotMiddelware(compiler)
    ]
  });
});

gulp.task('component', generator('component'));
gulp.task('route', generator('route'));
gulp.task('service', generator('service'));
gulp.task('factory', generator('factory'));
gulp.task('constant', generator('constant'));

gulp.task('clean', (cb) => {
  del([paths.dest]).then(function (paths) {
    gutil.log("[clean]", paths);
    cb();
  });
});

gulp.task('default', ['serve']);
