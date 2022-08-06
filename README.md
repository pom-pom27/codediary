https://user-images.githubusercontent.com/40870452/173328954-3539c79c-60cd-49e6-a7b8-0fdc9d1695ed.mp4

# CodeDiary

This is an interactive coding environment. You can write javascript, see it excecuted and write comprehensive documention using markdown.
-  You can create multiple Text and Code cell.
-  The code in each code editor is joined together into one file. if you define a variable in code cell #1, you can refer to it in any following cell.\n- You can show any react component, string, number or anything else by calling `render` function. This is a function built into this enviroment. Call render multiple time to show multiple values.
-  Re-order or delete cells using the button on the top right.
-  Add new cell by hovering on the divider between each cell. All of your changes get saved to the file you named with or the default codenote1.js. You can change the file name by `run npx codediary serve filename.js`. 
-  The file are saved in your machine.
-  Can mostly import anything from npm using unpkg APi

## Built With
- React
- Lerna, for managing and publishing multiple JavaScript/TypeScript packages from the same repository. 
- esbuild-wasm as a bundler and typescript parser in the browseer
- monaco-editor 
- axios
- React Redux
- localForage
- Commander, for creating node js CLI




## Run
```
npx -y codediary serve
```

Or install globally

```
npm i -g codediary 
```

Then run

```
codediary serve
```


## Usage

```
    $ npx -y codediary serve <filename>
    $ npx -y codediary serve --port <port>
    (filename is optional, default codenote1.js)
  Args
    --port, -p    Use another port, default 4005.
  Examples
    $ npx -y codediary serve code1.js
    $ npx -y codediary serve --port 3009
    $ npx -y codediary serve code1.js -p 3007
    $ npx -y codediary serve -p 3007
```
