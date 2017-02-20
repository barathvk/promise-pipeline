'use strict';

var Promise = require('bluebird')

class Pipeline {
    constructor(handlers) {
        if (!handlers)
            this.handlers = []
        else
            this.handlers = handlers
    }

    use(handler){
        this.handlers.push(handler)
        return this
    }

    start(input, output){
        if (!output)
            output = {}

        return new Promise((resolve, reject) => {
            var index = 0

            var next = function(err){
                if (index == this.handlers.length)
                    resolve(output)
                else if (err) {
                    reject(err)
                }
                else {
                    let h = this.handlers[index++]
                    h(input, output, next)
                }
            }.bind(this)

            next()
        })
    }
}

module.exports = Pipeline
