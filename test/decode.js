var assert = require('assert');

var Parser = require('../');


describe('decode', function() {

  it('should decode entities', function() {

    var parser = new Parser();

    parser.ns();

    var counter = 0;

    parser.on('openTag', function(el, getAttrs, decodeEntities) {
      counter++;

      var attrs = getAttrs();

      assert.equal(decodeEntities(attrs.encoded), '&\'><""\'&{İ&raquo;&constructor;&#NaN;');
    });

    var specialChars = [
      '&amp;',
      '&apos;',
      '&gt;',
      '&lt;',
      '&quot;',
      '&QUOT;',
      '&#39;',
      '&#38;',
      '&#0123;',
      '&#x0130;',
      '&raquo;',
      '&constructor;',
      '&#NaN;'
    ];

    // when
    parser.parse('<root xmlns="http://ns" encoded="' + specialChars.join('') + '" />');

    // then
    assert.ok(counter === 1, 'parsed one node');
  });

});