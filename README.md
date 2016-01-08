promise pipeline
========

Node.js module for execute a sequencing a number of dependent functions and return a promise when the operation is done

# Install
```
npm install promise-pipeline
```

# How to use it
This is the generic way to initialize a Pipeline object

``` javascript
var Pipeline = require('promise-pipeline')

var pipeline = new Pipeline()
    .use(func1)
    .use(func2)
    .use(function(input, output, next) {
        console.log(output)
        next()
    })

var input = {
    data: 'some initial value'
}

var output = {}

pipeline.start(input, output)
    .then(o => {
        //Do something whit the final output
    })
```

# Pipeline functions
Each function of the pipeline receives 3 parameters: input, output, next

``` javascript
function func1(input, output, next){
    output.data = input.data
    //Do something great here, next call the next function
    next()
}

function func2(input, output, next){
    db.insert(output).then(o => {
        next()
    })
}
```
