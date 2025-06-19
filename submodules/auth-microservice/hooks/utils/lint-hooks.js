import shell from "shelljs"
import chalk from "chalk"

export function lintCheck() {
  const lint = shell.exec("npm run lint").code
  if(lint != 0) {
    const errorMsg = ` - Linting checks failed. \n - Please address above errors before committing.`
    console.log(chalk.bgRgb(75, 0, 0).white.bold(errorMsg))
    process.exit(1)
  } else {
    const successMsg = ` - Linting checks successful.`
    console.log(chalk.bgRgb(0, 75, 0).white.bold(successMsg))
  }
}