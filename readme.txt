=== Widget Settings Importer/Exporter ===
Contributors: kevinlangleyjr, smccafferty, markparolisi, voceplatforms
Tags: widget, import, export
Requires at least: 2.8
Tested up to: 3.5.2
Stable tag: 1.2

Allows you to export and import widgets settings.

== Description ==

Gives the user the ability to export the current widget settings and states as a json file. You can then import those settings on a different server or installation of WordPress so you have the same widgets within the same sidebars as the export. The import will not overwrite any data currently within the sidebars, but instead will increment the widgets and add a new instance of the widget instead.

** Please note that the plugin currently does not import anything if that particular sidebar is unavailable during the import.

*** This plugin requires at least PHP 5.3.0

== Installation ==

1. Upload entire widget-data directory to the `/wp-content/plugins/` directory
2. Activate the plugin through the 'Plugins' menu in WordPress

== Screenshots ==

1. Choose which widgets to export
2. Upload JSON export file

== Changelog ==

= 1.2 =
* Adding PHP version check to avoid errors upon activation.
* Using locally uploaded file instead of url to retreive uploaded json

= 1.1 =
* Refactoring for performance / integrating changes made by Automattic
* Better styles for wp-admin

= 1.0 =
* Refactoring for performace.
* Documentation
* Better styles for wp-admin

= 0.4 =
* Fixing headers already sent error

= 0.3 =
* Fixing export of empty file by instead of creating temp file, it will just output the json

= 0.2 =
* Fixing blank redirect with WP installed within sub directory

= 0.1 =
* First Version