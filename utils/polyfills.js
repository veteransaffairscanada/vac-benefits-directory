/* eslint no-extend-native: 0 */

// Add polyfills here. Check all available here: https://github.com/zloirock/core-js
// This files runs at the very beginning (even before React and Next.js core)

// FOLLOWING IS THE IMPORT NEEDED FOR IE 11, 10
import "core-js/fn/object/assign";
import "core-js/fn/object/entries";
import "core-js/fn/set";
