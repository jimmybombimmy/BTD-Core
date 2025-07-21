# !/bin/bash

# READ BEFORE USING THIS SCRIPT!

# This script commits your all code for all of your submodules provided that they are on the same branch.
# If a submodule is found to not on the same branch as BTD-core - the script will immediately stop.

# It takes two arguments:
# - $1 is -m
# - $2 is your commit message. E.g. "My commit message"


bold="$(tput bold)"
blue="$(tput setaf 14)"
green="$(tput setaf 2)"
red="$(tput setaf 1)"
normal="$(tput sgr 0)"

branch=$(git rev-parse --abbrev-ref HEAD)

if [[ $1 != "-m" ]]; then 
  echo This script has to take two arguments to commit BTD-Core and all of its submodules:
  echo - the first is "-m" 
  echo - the second is your commit message.
  exit 1
fi

echo "${bold}Committing and pushing all changes to \"$branch\" branch in $dir submodule \n${normal}"
sleep 1 

git add .
git commit $1 "$2"
git push origin $branch


if [[ "$PWD" =~ BTD-core$ ]]; then 
  cd "./submodules"

  for dir in */; 
    do 

      branch_check=$(git rev-parse --abbrev-ref HEAD)

      if [[ $branch_check != $branch ]]; then
        echo ${red}ERROR: Branch name in \"$dir\": \"$branch_check\" is not the same as BTD-core: \"$branch\"
        echo ${normal}Exiting script
        sleep 1
        exit 1
      fi
        echo "${green}Directory \"$dir\" has same branch name as BTD-core \"$branch\" - GOOD!${normal} \n"
        sleep 1

      echo "${bold}Committing and Pushing all changes to \"$branch\" branch in $dir submodule \n${normal}"
      sleep 1


      git add .
      git commit $1 "$2"
      git push origin $branch

      cd ..
    done
  cd .. 
fi
