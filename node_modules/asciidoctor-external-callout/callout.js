const asciidoctor = require('@asciidoctor/core')()
const registry = asciidoctor.Extensions.create()
require('./asciidoctor-external-callout.js')(registry)

asciidoctor.convertFile('./sample.adoc', {safe: 'safe',
    attributes: {'stylesheet': './callout.css'},
    standalone: true,
    extension_registry: registry})

