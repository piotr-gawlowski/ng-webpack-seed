'use strict';

import gulp       from 'gulp';
import webpack    from 'webpack';
import path       from 'path';
import sync       from 'run-sequence';
import rename     from 'gulp-rename';
import template   from 'gulp-template';
import change     from 'gulp-change';
import fs         from 'fs';
import yargs      from 'yargs';
import _          from 'lodash';
import gutil      from 'gulp-util';
import serve      from 'browser-sync';
import del        from 'del';
import changeCase from 'change-case';
import webpackDevMiddelware from 'webpack-dev-middleware';
import webpachHotMiddelware from 'webpack-hot-middleware';
import colorsSupported      from 'supports-color';
import historyApiFallback   from 'connect-history-api-fallback';


let root = 'client';

// helper methods for resolving paths
const resolveToApp = (glob = '') => {
  return path.join(root, 'app', glob); // app/{glob}
};

const resolveToRoutes = (glob = '') => {
  return path.join(root, 'app/routes', glob); // app/routes/{glob}
};

const resolveToComponents = (glob = '') => {
  return path.join(root, 'app/components', glob); // app/components/{glob}
};
const resolveToServices = (glob = '') => {
  return path.join(root, 'app/services', glob); // app/services/{glob}
};

const cap = (val) => {
  return val.charAt(0).toUpperCase() + val.slice(1);
};

// map of all paths
let paths = {
  js: resolveToComponents('**/*!(.spec.js).js'), // exclude spec files
  styl: resolveToApp('**/*.scss'), // stylesheets
  html: [
    resolveToApp('**/*.html'),
    path.join(root, 'index.html')
  ],
  entry: [
    'babel-polyfill',
    path.join(__dirname, root, 'app/app.js')
  ],
  output: root,
  blankComponent: path.join(__dirname, 'generator', 'component/**/*.**'),
  blankService: path.join(__dirname, 'generator', 'service/**/*.**'),
  dest: path.join(__dirname, 'dist')
};

// use webpack.config.js to build modules
gulp.task('build', ['clean'], (cb) => {
  const config = require('./webpack.dist.config');
  config.entry.app = paths.entry;

  webpack(config, (err, stats) => {
    if(err)  {
      throw new gutil.PluginError("webpack", err);
    }

    gutil.log("[webpack]", stats.toString({
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
    // this modules required to make HRM working
    // it responsible for all this webpack magic
    'webpack-hot-middleware/client?reload=true',
    // application entry point
  ].concat(paths.entry);

  var compiler = webpack(config);

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


//auto-create imports for generated modules
const modulize = (content, module) => {

  let s = content.indexOf('//IMPORTS') + '//IMPORTS'.length;
  let e = content.indexOf(']);');
  const start = content.substr(0, s);
  const end = content.substring(e);
  const previous = content.substring(s, e)

  const imports = `\nimport './${yargs.argv.name}/${module}';`;
  const moduleDef = `  'app.${module}',`;

  return start + imports + previous + moduleDef +  '\n' + end;
};

gulp.task('component', () => {
  let proto = yargs.argv.name.split('/');
  const name = _.last(proto);
  const destPath = path.join(resolveToComponents(), yargs.argv.name);

  gulp.src(path.join(resolveToComponents(), 'index.js'), {base: './'})
    .pipe(change((content) => {
        return modulize(content, name);
    }))
    .pipe(gulp.dest('./'));


  return gulp.src(paths.blankComponent)
    .pipe(template({
      name: name,
      nameCamelCase: changeCase.camel(name),
      APP: 'app',
      upCaseName: cap(name)
    }))
    .pipe(rename((path) => {
      path.basename = path.basename.replace('temp', name);
    }))
    .pipe(gulp.dest(destPath));

});

gulp.task('route', () => {
  let proto = yargs.argv.name.split('/');
  const name = _.last(proto);
  const destPath = path.join(resolveToRoutes(), yargs.argv.name);

  gulp.src(path.join(resolveToRoutes(), 'index.js'), {base: './'})
    .pipe(change((content) => {
        return modulize(content, name);
    }))
    .pipe(gulp.dest('./'));


  return gulp.src(paths.blankComponent)
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

gulp.task('service', () => {
  const name = yargs.argv.name;
  const destPath = resolveToServices();

    gulp.src(path.join(resolveToServices(), 'index.js'), {base: './'})
    .pipe(change((content) => {
        return modulize(content, name);
    }))
    .pipe(gulp.dest('./'));

  return gulp.src(paths.blankService)
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
  })
});

gulp.task('default', ['watch']);
