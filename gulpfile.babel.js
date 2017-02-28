import gulp from 'gulp';
import webpack from 'webpack';
import path from 'path';
import rename from 'gulp-rename';
import template from 'gulp-template';
import change from 'gulp-change';
import yargs from 'yargs';
import _ from 'lodash';
import gutil from 'gulp-util';
import serve from 'browser-sync';
import del from 'del';
import webpackDevMiddelware from 'webpack-dev-middleware';
import webpachHotMiddelware from 'webpack-hot-middleware';
import colorsSupported from 'supports-color';
import historyApiFallback from 'connect-history-api-fallback';


const root = 'client';

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
  js: resolvePath('components', '**/*!(.spec.js).js'), // exclude spec files
  styl: resolvePath('app', '**/*.scss'), // stylesheets
  html: [
    resolvePath('app', '**/*.html'),
    path.join(root, 'index.html')
  ],
  entry: [
    'babel-polyfill',
    path.join(__dirname, root, 'app/app.js')
  ],
  output: root,
  blankComponent: path.join(__dirname, 'generator', 'component/**/*.**'),
  blankConstant: path.join(__dirname, 'generator', 'constant/**/*.**'),
  blankRoute: path.join(__dirname, 'generator', 'route/**/*.**'),
  blankFactory: path.join(__dirname, 'generator', 'factory/**/*.**'),
  blankService: path.join(__dirname, 'generator', 'service/**/*.**'),
  dest: path.join(__dirname, 'dist')
};

// use webpack.config.js to build modules
gulp.task('build', ['clean'], cb => {
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
    'webpack-hot-middleware/client?reload=true',
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

gulp.task('watch', ['serve']);

// Generate path for scss files
const getRootLevel = (string) => _.times(string.split('/').length - 1, '').join('../');

//auto-create imports for generated modules
const modulize = (content, module) => {

  const s = content.indexOf('//IMPORTS') + '//IMPORTS'.length;
  const e = content.indexOf(']);');
  const start = content.substr(0, s);
  const end = content.substring(e);
  const previous = content.substring(s, e);

  const imports = `\nimport './${yargs.argv.name}${module ? '/' + module : ''}';`;
  const moduleDef = `  'app.${module || yargs.argv.name}',`;

  return `${start + imports + previous + moduleDef}\n${end}`;
};

gulp.task('component', () => {
  const proto = yargs.argv.name.split('/');
  const name = _.last(proto);
  const destPath = path.join(resolvePath('components'), yargs.argv.name);
  const scssPath = getRootLevel(resolvePath('components') + '/' + proto.join('/'));

  gulp.src(path.join(resolvePath('components'), 'index.js'), {base: './'})
    .pipe(change((content) => {
        return modulize(content, name);
    }))
    .pipe(gulp.dest('./'));


  return gulp.src(paths.blankComponent)
    .pipe(template({
      name: name,
      nameCamelCase: _.camelCase(name),
      scssPath: scssPath,
      APP: 'app',
      upCaseName: cap(name)
    }))
    .pipe(rename(path => {
      path.basename = path.basename.replace('temp', name);
    }))
    .pipe(gulp.dest(destPath));
});

gulp.task('route', () => {
  const proto = yargs.argv.name.split('/');
  const name = _.last(proto);
  const destPath = path.join(resolvePath('routes'), yargs.argv.name);
  const scssPath = getRootLevel(resolvePath('routes') + '/' + proto.join('/'));

  gulp.src(path.join(resolvePath('routes'), 'index.js'), {base: './'})
    .pipe(change((content) => {
        return modulize(content, name);
    }))
    .pipe(gulp.dest('./'));


  return gulp.src(paths.blankRoute)
    .pipe(template({
      name: name,
      APP: 'app',
      scssPath: scssPath,
      nameCamelCase: _.camelCase(name),
      upCaseName: cap(name)
    }))
    .pipe(rename(path => {
      path.basename = path.basename.replace('temp', name);
    }))
    .pipe(gulp.dest(destPath));

});

gulp.task('service', () => {
  const name = yargs.argv.name;
  const destPath = resolvePath('services');

  gulp.src(path.join(resolvePath('services'), 'index.js'), {base: './'})
    .pipe(change((content) => modulize(content)))
    .pipe(gulp.dest('./'));

  return gulp.src(paths.blankService)
    .pipe(template({
      name: name,
      APP: 'app',
      upCaseName: cap(name)
    }))
    .pipe(rename(path => {
      path.basename = path.basename.replace('temp', name);
    }))
    .pipe(gulp.dest(destPath));
});

gulp.task('factory', () => {
  const name = yargs.argv.name;
  const destPath = resolvePath('factories');

  gulp.src(path.join(resolvePath('factories'), 'index.js'), {base: './'})
    .pipe(change((content) => modulize(content)))
    .pipe(gulp.dest('./'));

  return gulp.src(paths.blankFactory)
    .pipe(template({
      name: name,
      APP: 'app',
      upCaseName: cap(name)
    }))
    .pipe(rename((path) => {
      path.basename = path.basename.replace('temp', name);
    }))
    .pipe(gulp.dest(destPath));
});

gulp.task('constant', () => {
  const name = yargs.argv.name;
  const destPath = resolvePath('constants');

  gulp.src(path.join(resolvePath('constants'), 'index.js'), {base: './'})
    .pipe(change((content) => modulize(content)))
    .pipe(gulp.dest('./'));

  return gulp.src(paths.blankConstant)
    .pipe(template({
      name: name,
      APP: 'app',
      upCaseName: cap(name)
    }))
    .pipe(rename((path) => {
      path.basename = path.basename.replace('temp', name);
    }))
    .pipe(gulp.dest(destPath));
});

gulp.task('clean', (cb) => {
  del([paths.dest]).then(function (paths) {
    gutil.log("[clean]", paths);
    cb();
  });
});

gulp.task('default', ['watch']);
