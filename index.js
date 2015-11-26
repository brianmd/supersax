'use strict';
require('use-strict');

const Sax = require('node-expat');

class SuperSax {
  constructor(options) {
    this.parser = new Sax.Parser('UTF-8')
    if (options) {
      for (var key in options) {
        this[key] = options[key];
      }
    }
  }

  on(tagType, func) { this.parser.on(tagType, func) }
  onStartElement(func) { this.parser.on('startElement', func) } // name,attrs
  onEndElement(func) { this.parser.on('endElement', func) }    // name
  onStartCdata(func) { this.parser.on('startCdata', func) }
  onEndCdata(func) { this.parser.on('endCdata', func) }
  onText(func) { this.parser.on('text', func) }                 // text
  onComment(func) { this.parser.on('comment', func) }           // comment
  onProcessingInstruction(func) { this.parser.on('processingInstruction', func) } // target,data
  onXmlDecl(func) { this.parser.on('xmlDecl', func) } // version,encoding,standalone
  onEntityDecl(func) { this.parser.on('entityDecl', func) } // entityName, isParameterEntity, value, base, systemId, publicId, nonationName
  onError(func) { this.parser.on('error', func) }               // error

  stop() { this.parser.stop() }
  resume() { this.parser.resume() }

  write(str) { this.parser.write(str); }
}

module.exports = SuperSax

