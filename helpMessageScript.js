const helpMessage = `
    \x1b[33mbuild\x1b[0m - transpiles and builds project files and outputs them to the top-level build directory, \n
    \x1b[33mbuild:watch\x1b[0m - as above but additionally also watches for changes in the files and rebuilds as needed, \n
    \x1b[33mlint\x1b[0m - runs ESlint on all the files and outputs any warnings and errors to the console, \n
    \x1b[33mtest\x1b[0m - runs all the tests in watch mode. \n
`

console.log(helpMessage)
