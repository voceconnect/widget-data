<?php
/*
  Plugin Name: Widget Data - Setting Import/Export Plugin
  Description: Adds functionality to export and import widget data
  Author: Voce Communications - Kevin Langley, Sean McCafferty, Mark Parolisi
  Author URI: http://vocecommunications.com
  Version: 1.2
 * ******************************************************************
  Copyright 2011-2011 Voce Communications

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 * ******************************************************************
 */

define( "WIDGET_DATA_MIN_PHP_VER", '5.3.0' );

register_activation_hook( __FILE__, 'widget_data_activation' );

function widget_data_activation() {
	if ( version_compare( phpversion(), WIDGET_DATA_MIN_PHP_VER, '<' ) ) {
		die( sprintf( "The minimum PHP version required for this plugin is %s", WIDGET_DATA_MIN_PHP_VER ) );
	}
}

if ( version_compare( phpversion(), WIDGET_DATA_MIN_PHP_VER, '>=' ) ) {
	require( __DIR__ . '/class-widget-data.php' );
	add_action( 'init', array( 'Widget_Data', 'init' ) );
}