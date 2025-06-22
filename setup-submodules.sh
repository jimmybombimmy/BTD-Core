#!/bin/bash

bold="$(tput bold)"
blue="$(tput setaf 14)"
green="$(tput setaf 2)"
red="${tput setaf 1}"
normal=$(tput sgr0)


if [[ "$PWD" =~ BTD-core$ ]]; then 
  cd "./submodules"

  for dir in */; 
    do 
      cd "./$dir"
      echo "\n${bold}${blue}Pulling from main branch on ./$dir folder\n${normal}"
      sleep 0.1
      git pull origin main
      
      echo "\n${bold}${blue}Running npm install on ./$dir folder\n${normal}"
      sleep 0.1
      git submodule update --init --recursive
      npm install
      cd ..
      echo "\n\n------------------------------------------\n"
    done
    echo "\n${bold}${green}Installed and updated all submodules${normal}\n"
  else
    echo "\n${bold}${red}Failed to install and update all submodules\n"
fi
