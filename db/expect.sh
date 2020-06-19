#!/usr/bin/expect -f
 
set timeout -1
 
spawn db/createTables.sh
 
expect "Password\r"
 
send -- "1234\r"

expect eof