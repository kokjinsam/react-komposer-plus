echo "> Start transpiling ES2015"
echo ""
rm -rf ./lib
babel --plugins "transform-runtime" src --ignore __tests__ --out-dir ./lib
cd lib
browserify --debug --ignore-missing -t [ exposify --expose [ --react React ] ] ./window_bind.js > ./browser.js
cat ./browser.js | uglifyjs -c > ./browser.min.js
echo ""
echo "> Complete transpiling ES2015"
