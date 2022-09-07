# Changelog

Record of bug fixes, enhancements, and changes.

## [1.2.0] – 2022-07-30

### Added
- If you add the role `[calloutlist]` to an ordered list then it will be styled to look like a callout list. This allows you to add callouts to annotated images etc.

## [1.1.3] – 2022-07-07-16

### Fixed

- The global and case-insensitive flags (ig) are now parsing correctly: using ii or gg will cause prevent the callout block from being processed. Thanks to Hakim Cassimally for finding the bug.
- Escaped slash characters were not being processed in the search.  Thanks to Hakim Cassimally for finding the bug.
- 
## [1.1.1] – 2022-06-23

### Fixed
- Fixed regular expression to correctly detect new flags.

## [1.1.0] – 2022-06-23

### Added
- The text search now supports a global flag (`@/text/g`). The `g` flag will add the callout to all the lines that match the search criteria. Use wisely.
- Added the `i` flag for case-insensitive searches: (`@/text/i`). Again, don't go mad.

## [1.0.0] – 2022-06-16

### Added
- Added roles to the source block and the callout list so that CSS folk can pick them out to make style changes (For example, adjusting the gap between callout items in the source code block.)

## [0.0.6-beta6] – 2022-06-11

### Changed
- Ordered lists were only processes if they occurred directly beneath a source listing block. This turns out to be quite restrictive, and doesn't follow Asciidoc's stance on processing standard callouts, which allows for intermediate blocks to separate the source list from the attached callout list.\
The processor will now allow intermediate blocks to separate the source listing from the ordered list containing callouts.
- Fixed  a few spelling mistakes and a code line where I was picking up a formatted item, rather than a raw item.

