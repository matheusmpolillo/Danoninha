#!/bin/bash

export $(egrep -v '^#' .env | xargs)

if [ $1 == "maintenance" ]
then
	if [ $2 == "status" ]
	then
		heroku maintenance -a $APPLICATION
		heroku ps -a $APPLICATION
	fi
	if [ $2 == "on" ]
	then
		heroku maintenance:on -a $APPLICATION
		heroku ps:scale worker=0 -a $APPLICATION
	fi
	if [ $2 == "off" ]
	then
		heroku maintenance:off -a $APPLICATION
		heroku ps:scale worker=1 -a $APPLICATION
	fi
fi
if [ $1 == "run" ]
then
	npx micro-bot -t $BOT_TOKEN
fi