!function(t){"object"==typeof exports&&"object"==typeof module?t(require("$(TOPDIR)/feeds/packages/lib/codemirror"),require("./foldcode")):"function"==typeof define&&define.amd?define(["$(TOPDIR)/feeds/packages/lib/codemirror","./foldcode"],t):t(CodeMirror)}(function(t){"use strict";t.defineOption("foldGutter",!1,function(o,e,r){r&&r!=t.Init&&(o.clearGutter(o.state.foldGutter.options.gutter),o.state.foldGutter=null,o.off("gutterClick",a),o.off("changes",d),o.off("viewportChange",u),o.off("fold",l),o.off("unfold",l),o.off("swapDoc",d)),e&&(o.state.foldGutter=new function(t){this.options=t,this.from=this.to=0}(function(t){!0===t&&(t={});null==t.gutter&&(t.gutter="CodeMirror-foldgutter");null==t.indicatorOpen&&(t.indicatorOpen="CodeMirror-foldgutter-open");null==t.indicatorFolded&&(t.indicatorFolded="CodeMirror-foldgutter-folded");return t}(e)),f(o),o.on("gutterClick",a),o.on("changes",d),o.on("viewportChange",u),o.on("fold",l),o.on("unfold",l),o.on("swapDoc",d))});var o=t.Pos;function e(t,e){for(var r=t.findMarks(o(e,0),o(e+1,0)),n=0;n<r.length;++n)if(r[n].__isFold){var i=r[n].find(-1);if(i&&i.line===e)return r[n]}}function r(t){if("string"==typeof t){var o=document.createElement("div");return o.className=t+" CodeMirror-guttermarker-subtle",o}return t.cloneNode(!0)}function n(t,n,f){var a=t.state.foldGutter.options,d=n-1,u=t.foldOption(a,"minFoldSize"),l=t.foldOption(a,"rangeFinder"),c="string"==typeof a.indicatorFolded&&i(a.indicatorFolded),s="string"==typeof a.indicatorOpen&&i(a.indicatorOpen);t.eachLine(n,f,function(n){++d;var i=null,f=n.gutterMarkers;if(f&&(f=f[a.gutter]),e(t,d)){if(c&&f&&c.test(f.className))return;i=r(a.indicatorFolded)}else{var p=o(d,0),m=l&&l(t,p);if(m&&m.to.line-m.from.line>=u){if(s&&f&&s.test(f.className))return;i=r(a.indicatorOpen)}}(i||f)&&t.setGutterMarker(n,a.gutter,i)})}function i(t){return new RegExp("(^|\\s)"+t+"(?:$|\\s)\\s*")}function f(t){var o=t.getViewport(),e=t.state.foldGutter;e&&(t.operation(function(){n(t,o.from,o.to)}),e.from=o.from,e.to=o.to)}function a(t,r,n){var i=t.state.foldGutter;if(i){var f=i.options;if(n==f.gutter){var a=e(t,r);a?a.clear():t.foldCode(o(r,0),f)}}}function d(t){var o=t.state.foldGutter;if(o){var e=o.options;o.from=o.to=0,clearTimeout(o.changeUpdate),o.changeUpdate=setTimeout(function(){f(t)},e.foldOnChangeTimeSpan||600)}}function u(t){var o=t.state.foldGutter;if(o){var e=o.options;clearTimeout(o.changeUpdate),o.changeUpdate=setTimeout(function(){var e=t.getViewport();o.from==o.to||e.from-o.to>20||o.from-e.to>20?f(t):t.operation(function(){e.from<o.from&&(n(t,e.from,o.from),o.from=e.from),e.to>o.to&&(n(t,o.to,e.to),o.to=e.to)})},e.updateViewportTimeSpan||400)}}function l(t,o){var e=t.state.foldGutter;if(e){var r=o.line;r>=e.from&&r<e.to&&n(t,r,r+1)}}});