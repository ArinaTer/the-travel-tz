import dartSass from "sass";
import gulpSass from "gulp-sass";
import rename from "gulp-rename";
import csso from "gulp-csso";
import autoprefixer from "gulp-autoprefixer";
import gcmq from "gulp-group-css-media-queries";

const sass = gulpSass(dartSass);

export const scss = () => {
    return (
        app.gulp
            .src(app.path.src.scss, { sourcemaps: app.isDev })
            .pipe(
                app.plugins.plumber({
                    errorHandler: app.plugins.notify.onError("Error: <%= error.message %>"),
                })
            )
            .pipe(
                sass({
                    outputStyle: "expanded",
                    includePaths: ["node_modules"],
                })
            )
            .pipe(autoprefixer({ grid: true, overrideBrowserslist: ["last 3 versions"], cascade: true }))
            .pipe(gcmq())
            .pipe(app.gulp.dest(app.path.build.css))
            .pipe(csso())
            .pipe(rename({ extname: ".min.css" }))
            .pipe(app.gulp.dest(app.path.build.css))
            .pipe(app.plugins.browsersync.stream())
    );
};
