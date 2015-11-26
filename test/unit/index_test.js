'use strict';

const expect = require('chai').expect;

const SuperSax = require('../../index');

console.log("\n\n\n", new Date());
console.log('index_test');
console.log(SuperSax);

describe('SuperSax', () => {
  beforeEach(function() {
    return {
      sax: new SuperSax(),
      items: []
    }
  })

  describe('emulates expat by delegation', () => {
    it('when no errors', () => {
      const str = '<html><head><!-- this is a comment--><title>Hello World</title></head><body><p style="width: 3px">Foobar</p></body></html>';
      const sax = new SuperSax();
      const items = [];
      function select(tagType) {
        return items.filter((arr) => arr[0]===tagType)
      }

      expect([1,2,3].indexOf(5)).to.equal(-1);
      sax.on('startElement', (name, attrs) => { items.push(["on", name, attrs]) });
      sax.onStartElement((name, attrs) => { items.push(["start", name, attrs]) });
      sax.onEndElement((name, attrs) => { items.push(["end", name]) });
      sax.onText((text) => { items.push(["text", text]) });
      sax.onComment((comment) => { items.push(["comment", comment]) });
      sax.onError((error) => { items.push(["error", error]) });
      sax.write(str);
      console.log(items);

      expect(select('on')).to.have.length(5);
      expect(select('start')).to.have.length(5);
      expect(select('end')).to.have.length(5);
      expect(select('text')).to.have.length(2);
      expect(select('comment')).to.have.length(1);
    });

    it ('captures errors', () => {
      const sax = new SuperSax();
      const items = [];
      const str = '<html><body><p style>Foobar</p></body></html>';
      function select(tagType) {
        return items.filter((arr) => arr[0]===tagType)
      }

      sax.onError((error) => { items.push(["error", error]) });
      sax.onStartElement((name, attrs) => { items.push(["start", name, attrs]) });
      sax.onEndElement((name, attrs) => { items.push(["end", name]) });
      sax.write(str);
      console.log(items);
      expect(select('start')).to.have.length(2);
      expect(select('error')).to.have.length(1);
      expect(select('end')).to.have.length(0);
    });
  });
});

