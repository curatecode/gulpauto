# GulpAuto
An automated gulpjs task to create a landing page. I created this to ease up the development process.

### Getting Started
> If this is your first time using Gulp, please follow the instruction on installing Gulp from their official [website](https://gulpjs.com/).

From your terminal, run:
```
npm install    
```

Once all the packages has been installed, run:
```
gulp
```

For final build, run:
```
gulp build
```
What this does is basically it will remove everything from the `build` folder and re-run the whole tasks. This to ensure any files removed earlier from the `source` folder is also removed from the final build.

### Creating sub pages
Simply create a new folder inside `views` folder. Name the folder to what ever the sub page is going to be (e.g. *contact-us*) and then create an `index.pug` file inside it. 

### What is included
These are the most commonly used plugins:
* [gulp](https://www.npmjs.com/package/gulp)
* [browser-sync](https://www.npmjs.com/package/browser-sync)
* [del](https://www.npmjs.com/package/del)
* [gulp-pug](https://www.npmjs.com/package/gulp-pug)
* [css-mqpacker](https://www.npmjs.com/package/css-mqpacker)
* [gulp-postcss](https://www.npmjs.com/package/gulp-postcss)
* [cssnano](https://www.npmjs.com/package/cssnano)
* [gulp-sass](https://www.npmjs.com/package/gulp-sass)
* [postcss-assets](https://www.npmjs.com/package/postcss-assets)
* [autoprefixer](https://www.npmjs.com/package/autoprefixer)
* [gulp-strip-debug](https://www.npmjs.com/package/gulp-strip-debug)
* [gulp-uglify](https://www.npmjs.com/package/gulp-uglify)
* [gulp-concat](https://www.npmjs.com/package/gulp-concat)
* [gulp-deporder](https://www.npmjs.com/package/gulp-deporder)
* [gulp-htmlclean](https://www.npmjs.com/package/gulp-htmlclean)
* [gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin)
* [gulp-newer](https://www.npmjs.com/package/gulp-newer)
* [gulp-rename](https://www.npmjs.com/package/gulp-rename)
* [bootstrap](https://www.npmjs.com/package/bootstrap) *(optional)*
* [jquery](https://www.npmjs.com/package/jquery) *(optional)*
* [popper.js](https://www.npmjs.com/package/popper.js) *(optional)*
