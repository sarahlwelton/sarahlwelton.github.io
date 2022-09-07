# External callouts for Asciidoctor

## Description

An [Asciidoc](https://asciidoctor.org/) extension which adds support for callout tags added outside the listing block.

## Motivation

Aside from getting little practice around  Ruby and JavaScript, I decided to have a crack at this to help with a problem that comes up at work every so often.

The [callout mechanism](https://docs.asciidoctor.org/asciidoc/latest/verbatim/callouts/) for Asciidoc works extremely well in 99% of the cases I run into:

```asciidoc
[source,ruby]
----
require 'sinatra' #<1>

get '/hi' do #<2> #<3>
  "Hello World!"
end
----
<1> Library import
<2> URL mapping
<3> Response block
```

Great, but it does mean you have to add commented to the tags to the source code to register the callout in the following block. As I've said, this is fine, 99% of the time, but I've run across a few occasions when adding tags to the source code (either in-line or an included file) can be a little problematic:

1. Restricted access to the source code: as a humble tech-writer, you might not have access to the included source code to add your own tags.
2. The source code has to remain runnable, but doesn't have a commenting mechanism that works well with Asciidoc (shell scripts and Json files spring to mind.)

## A possible Solution
And that's where this extension comes in: it adds support adding tags outside the source listing block, like this:


```asciidoc
[source,ruby]
----
require 'sinatra'

get '/hi' do
  "Hello World!"
end
----
. Library import @3
. URL mapping @5
. Response block @5
```

Rather than tagging the code, you add a location token at the end of a list item, which will then add the tag at the specified line number. Run the source text through Asciidoctor{plus}extension, and it'll spit the same source block complete with callouts.

Two types of location token are supported:

**@_number_** – This format takes a numeric value indicating the line in the source block where the callout should appear. The callouts will appear at the end of the line. Multiple callouts on the same line will have a single space between them.

**@/_text_/** – The text between the two slashes will be used in a regex search. A callout will be placed at the end of the first matching line.
If you have a large listing then it may be preferable to use the text search rather than counting all the lines. It may also be preferable to use a smaller listing, as a long listing might mean that your description is a bit too general.
Using the text search method means that the location of the callout will move with the line; handy if you're referencing a source file that might get the occasional tweak outside your control.

**@/_text_/g**
: Works the same as the standard text search; the `g` flag means that callouts willl be added to _all_ the lines that match the search string, instead of just the first one.

**@/_text_/i**
: This is a case-insensitive search.

**@/_text_/gi**
: And of course, you can combine the two, though I'm not sure why you'd want to.

You can have multiple callouts on the same line.
You can also mix and match numeric and text callout tokens on the same list item. (Though I'm not sure why you would).

## Standalone callout lists
You can create a standalone callout list by adding the `calloutlist` role to an ordered list. This simply styles the list to make it look like a list of callouts so you can use it as a reference to annoted images etc.
```asciidoc
[calloutlist]
. This list can be used to add references to annotated images
. The list will look like a standard callout list.
```


## Installation

### Node module

You can include the extension as part of a Node project by running the `npm install`command.

`npm install asciidoctor-external-callout`

To call it as part of an Asciidoctor conversion, then register the module then register before calling a `convert` function:

```javascript
const asciidoctor = require('@asciidoctor/core')()
const registry = asciidoctor.Extensions.create()
require('asciidoctor-external-callout')(registry)

asciidoctor.convertFile('./sample.adoc', {safe: 'safe', standalone: true, extension_registry: registry})
```

### Antora

Install the callout extension as part of the Antora installation. The Node setup is usually the same directory from where you run the `antora` script.

`npm install asciidoctor-external-callout`

You will also need to register the extension in the playbook used to generate the site:

```yaml
  extensions:
    - asciidoctor-external-callout

```

## Formatting

By default, the callout extension will put a single space between callouts that occur on the same line. If you want to adjust this, then you need to create a style that puts a horizontal margin between the callouts:

```css
div.external-callout-block i.conum {
    margin-left: 10px;
    margin-right: 10px;
}
```
The callout attaches a class called `external-callout-block` to each source listing it processes. You can use this to differentiate between standard callouts, and callouts written by the extension.

The extension also adds a class called `external-callout-list` to the list of definitions at the bottom of the source block. (There's probably no need to adjust the styling for this.)