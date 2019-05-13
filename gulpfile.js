const gulp = require("gulp") //gulp
const path = require("path") //path模块
const connect = require("gulp-connect") // 启动本地服务器
const babel = require("gulp-babel") //babel
const sourcemaps = require("gulp-sourcemaps") //生成sourcemaps
const rename = require("gulp-rename") //rename
const uglify = require("gulp-uglify") //压缩js
const less = require("gulp-less") //处理less
const cleanCss = require("gulp-clean-css") //处理css压缩
const autoprefixer = require("autoprefixer") //增加css前缀
const postCss = require("gulp-postcss") //增加postcss
const proxy = require("http-proxy-middleware") //添加http中间件
const gulpIf = require("gulp-if") //使用gulpif 判断
const ts = require("gulp-typescript") //编译typescript
const imagemin = require("gulp-imagemin") //图片压缩
const pngquant = require("imagemin-pngquant") //png图片深度压缩

const env = process.env.NODE_ENV //获取当前环境
console.info("当前环境是:" + env)
//判断条件环境
let condition = file => {
	if (env === "dev") {
		return true
	} else {
		return false
	}
}

//判断文件路径
let fileCondition = file => {
	let filePath = String(file.path)
	return /^.+\.(ts|tsx)$/g.test(filePath)
}
// 起服务
gulp.task("connect", () => 
	 connect.server({
		root: "dist",
		livereload: true,
		port: 9000,
		middleware: (connect, opt) =>[
				proxy("/gt", {
					target: "http://127.0.0.1",
					changeOrigin: true
				})
			]
		
	})
)

// html文件
gulp.task("html", () => gulp
		.src("./src/*.html")
		.pipe(gulpIf(condition, connect.reload()))
		.pipe(gulp.dest("./dist"))
)

// css文件
gulp.task(
	"less",
	gulp.series(() => gulp
			.src("./src/css/*.less")
			.pipe(less())
			.pipe(postCss([autoprefixer({ browsers: ["last 2 versions"] })]))
			.pipe(gulp.dest("./dist/css"))
			.pipe(cleanCss())
			.pipe(rename({ extname: ".min.css" }))
			.pipe(gulpIf(condition, connect.reload()))
			.pipe(gulp.dest("./dist/css/min"))
)
)

//js文件
gulp.task(
	"js",
	gulp.series(() =>
		gulp
			.src(["./src/js/*.js", "./src/js/*.ts"])
			.pipe(gulpIf(fileCondition, ts()))
			.pipe(sourcemaps.init())
			.pipe(babel())
			.pipe(gulp.dest("./dist/js"))
			.pipe(uglify())
			.pipe(rename({ extname: ".min.js" }))
			.pipe(gulpIf(condition, sourcemaps.write()))
			.pipe(gulpIf(condition, connect.reload()))
			.pipe(gulp.dest("./dist/js/min"))
	)
)

// 图片
gulp.task("img", ()=>
	gulp
		.src(["src/images/*.*", "src/images/*", "src/images/*/*"])
		.pipe(
			imagemin({
				optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
				progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
				interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
				multipass: true, //类型：Boolean 默认：false 多次优化svg直到完全优化
				svgoPlugins: [{ removeViewBox: false }], //不要移除svg的viewbox属性
				use: [pngquant()] //使用pngquant深度压缩png图片的imagemin插件
			})
		)
		.pipe(gulpIf(condition, connect.reload()))
		.pipe(gulp.dest("./dist/images/"))
)

// 监控
gulp.task("watch", ()=> {
	gulp.watch(["./src/*.html"], gulp.series("html"))
	gulp.watch(["./src/js/*.js", "./src/js/*.ts"], gulp.series("js"))
	gulp.watch(["./src/css/*.less"], gulp.series("less"))
	gulp.watch(["./src/images/*.(jpg|png|svg|gif)"], gulp.series("img"))
})

// 默认任务
exports.default = gulp.parallel("connect", "watch")
//prod任务
exports.build = gulp.series("html", "less", "js", "img")
//dev任务
exports.dev = gulp.parallel(
	"connect",
	gulp.series("html", "less", "js", "img"),
	"watch"
)
