import shell from "shelljs"
import chalk from "chalk"

const branchName = shell.exec("git rev-parse --abbrev-ref HEAD", {silent: true}).stdout.slice(0, -1)

export function branchNameCheck() {
  if(!/^BTD-[0-9]+$/.test(branchName)) {
    const errorMsg = ` - Branch name does adhere to BTD ticket.\n - Your branch name is "${branchName}"\nThe branch name must be in the following format: "BTD-[NUMBER]".`
    console.log(chalk.bgRgb(75, 0, 0).white.bold(errorMsg))
    process.exit(1)
  }
  else {
    const successMsg = ` - Branch name adheres to repo policy.`
    console.log(chalk.bgRgb(0, 75, 0).white.bold(successMsg))
  }
}

export function commitMsgCheck(message) {
  message = message.replace(/\s+/g, '')
  const branchNameRegExp = new RegExp(`^${branchName.toLowerCase()}:`)


  if(!branchNameRegExp.test(message.toLowerCase())) {
    const errorMsg = ` - Please start your commit messages with the branch name followed by a colon.\n - Example: '${branchName}: [commit-message]'`
    console.log(chalk.bgRgb(75, 0, 0).white.bold(errorMsg))
    process.exit(1)
  }
  else {
    const successMsg = ` - Thank you for including the branch name in your commit. :)`
    console.log(chalk.bgRgb(0, 75, 0).white.bold(successMsg))
  }
  // const fuck = shell.exec("cat commit-msg-linter.js | node --input-type=commonjs")
}