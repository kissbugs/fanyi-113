usage likes:
 > npm i install fanyi-113
 or
 > npm i -g install fanyi-113

terminal input:
  > fy hello => 你好
  > fy 你好 => Hello

If you have the following problems during install:

 > npm WARN checkPermissions Missing write access to /usr/local/lib/node_modules
 > npm ERR! path /usr/local/lib/node_modules
 > npm ERR! code EACCES
 > npm ERR! errno -13

you can try:
  > sudo chown -R $USER /usr/local/lib/node_modules

and then reinstall