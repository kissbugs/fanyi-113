usage likes:
 > npm i install fanyi-113

 or

 > npm i -g install fanyi-113

terminal input:
  1. english to chinese
  > fy hello => 你好

  2. chinese to english
  > fy 你好 => Hello

If you have the following problems during install:

 - npm WARN checkPermissions Missing write access to /usr/local/lib/node_modules
 - npm ERR! path /usr/local/lib/node_modules
 - npm ERR! code EACCES
 - npm ERR! errno -13

you can try:
  > sudo chown -R $USER /usr/local/lib/node_modules

and then reinstall

----

if you input: fy hello
termial show: service close. 
I have been disabled for access， Temporarily unavailable
