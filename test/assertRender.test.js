// jsx-test
var jsx = require('../index');
var React = require('react');
var assert = require('assert');

describe('#assertRender', function() {
    var Alert = React.createClass({
        displayName: 'Alert',
        render: function () {
            return React.createElement('div', {
                className: 'alert ' + this.props.className
            }, this.props.message);
        }
    });

    it('renders the exact HTML', function () {
        jsx.assertRender(Alert, {
            className: 'notice',
            message: 'Looks good'
        }, '<div class="alert notice">Looks good</div>');

        jsx.assertRender(Alert, {
            className: 'warning',
            message: 'Looks weird'
        }, '<div class="alert warning">Looks weird</div>');
    });

    it('includes some expecific content on the rendered HTML', function () {
        var props = {
            className: 'notice',
            message: 'Looks good'
        };

        jsx.assertRender(Alert, props, 'Looks good');
        jsx.assertRender(Alert, props, 'class="alert notice"');
        jsx.assertRender(Alert, props, 'div');
    });

    it('matches a regex on the rendered HTML', function () {
        var props = {
            className: 'notice',
            message: 'Looks good'
        };

        // use + to match atributes of a tag
        jsx.assertRender(Alert, props, '<div+>Looks good</div>');
        jsx.assertRender(Alert, props, '<div +>Looks good</div>');
        jsx.assertRender(Alert, props, '<+>Looks good</+>');

        // use * to match anything
        jsx.assertRender(Alert, props, '<div*Looks good*div>');
        jsx.assertRender(Alert, props, '<div*Looks good*div>');
        jsx.assertRender(Alert, props, '<div class="alert notice">*</div>');

        // use + and * just to show off
        jsx.assertRender(Alert, props, '<div+>* good</div>');
    });
});