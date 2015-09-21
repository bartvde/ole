/*
** Olé - Integration of OpenLayers 3 and Esri ArcGIS REST services
** Copyright 2015 Boundless Spatial, Inc.
** License: https://raw.githubusercontent.com/boundlessgeo/ole/master/LICENSE
** Version: v0.4.0
*/

(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.ole = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
"use strict";function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function t(t,e){for(var i=0;i<e.length;i++){var r=e[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,i,r){return i&&t(e.prototype,i),r&&t(e,r),e}}(),LayerGenerator=function(){function t(e){_classCallCheck(this,t),this._config=e.config,this._url=e.url,this._resolutions=this._getResolutions(),this._projection=this._getProjection(),this._attribution=this._getAttribution(),this._fullExtent=this._getFullExtent()}return _createClass(t,[{key:"getFullExtent",value:function(){return this._fullExtent}},{key:"_getFullExtent",value:function(){return[this._config.fullExtent.xmin,this._config.fullExtent.ymin,this._config.fullExtent.xmax,this._config.fullExtent.ymax]}},{key:"getResolutions",value:function(){return this._resolutions}},{key:"_getResolutions",value:function(){var t=this._config.tileInfo;if(t){for(var e=[],i=0,r=t.lods.length;r>i;++i)e.push(t.lods[i].resolution);return e}}},{key:"_getProjection",value:function(){var t="EPSG:"+this._config.spatialReference.wkid,e="esriMeters"===this._config.units?"m":"degrees",i=ol.proj.get(t)?ol.proj.get(t):new ol.proj.Projection({code:t,units:e});return i}},{key:"getProjection",value:function(){return this._projection}},{key:"_getAttribution",value:function(){return new ol.Attribution({html:this._config.copyrightText})}},{key:"createArcGISRestSource",value:function(){return new ol.source.TileArcGISRest({url:this._url,attributions:[this._attribution]})}},{key:"createXYZSource",value:function(){var t,e=this._config.tileInfo,i=[e.width||e.cols,e.height||e.rows],r=[e.origin.x,e.origin.y],n="/tile/{z}/{y}/{x}";if(this._config.tileServers){t=this._config.tileServers;for(var o=0,l=t.length;l>o;++o)t[o]+=n}else t=[this._url+=n];var s,u,c,a=i[0]*this._resolutions[0],f=i[1]*this._resolutions[0];return"EPSG:4326"===this._projection.getCode()?s=function(e){var i=1===t.length?t[0]:t[Math.floor(Math.random()*(t.length-0+1))+0];return i.replace("{z}",(e[0]-1).toString()).replace("{x}",e[1].toString()).replace("{y}",(-e[2]-1).toString())}:(u=[r[0],r[1]-f,r[0]+a,r[1]],c=new ol.tilegrid.TileGrid({origin:r,extent:u,resolutions:this._resolutions})),new ol.source.XYZ({attributions:[this._attribution],projection:this._projection,tileSize:i,tileGrid:c,tileUrlFunction:s,urls:t})}},{key:"createLayer",value:function(){var t=new ol.layer.Tile;return this._config.tileInfo?t.setSource(this.createXYZSource()):t.setSource(this.createArcGISRestSource()),t}}]),t}();exports["default"]=LayerGenerator,module.exports=exports["default"];
},{}],2:[function(_dereq_,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function e(e,t){for(var l=0;l<t.length;l++){var n=t[l];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,l,n){return l&&e(t.prototype,l),n&&e(t,n),t}}(),_Util=_dereq_("./Util"),_Util2=_interopRequireDefault(_Util),StyleGenerator=function(){function e(){_classCallCheck(this,e),this._converters={},this._converters.esriPMS=e._convertEsriPMS,this._converters.esriSFS=e._convertEsriSFS,this._converters.esriSLS=e._convertEsriSLS,this._converters.esriSMS=e._convertEsriSMS,this._converters.esriTS=e._convertEsriTS,this._renderers={},this._renderers.uniqueValue=this._renderUniqueValue,this._renderers.simple=this._renderSimple,this._renderers.classBreaks=this._renderClassBreaks}return _createClass(e,[{key:"_convertLabelingInfo",value:function(e,t){for(var l=[],n=0,r=e.length;r>n;++n){var o=e[n].labelExpression,i=o.substr(o.indexOf("[")+1,o.indexOf("]")-1),s=e[n].symbol,a=e[n].maxScale,u=e[n].minScale,c=null;0!==a&&(c=_Util2["default"].getResolutionForScale(a,t));var f=null;0!==u&&(f=_Util2["default"].getResolutionForScale(u,t));var v=this._converters[s.type].call(this,s);l.push(function(){return function(e,t){var l=!0;if(null!==this.minResolution&&null!==this.maxResolution?l=t<this.maxResolution&&t>=this.minResolution:null!==this.minResolution?l=t>=this.minResolution:null!==this.maxResolution&&(l=t<this.maxResolution),l){var n=e.get(this.field);return this.style.getText().setText(n),[this.style]}}}().bind({minResolution:c,maxResolution:f,field:i,style:v}))}return l}},{key:"_renderSimple",value:function(e){var t=this._converters[e.symbol.type].call(this,e.symbol);return function(){return function(){return[t]}}()}},{key:"_renderClassBreaks",value:function(e){for(var t=e.defaultSymbol,l=this._converters[t.type].call(this,t),n=e.field,r=[],o=0,i=e.classBreakInfos.length;i>o;++o){var s,a=e.classBreakInfos[o];s=null===a.classMinValue||void 0===a.classMinValue?0===o?e.minValue:e.classBreakInfos[o-1].classMaxValue:a.classMinValue;var u=a.classMaxValue,c=a.symbol,f=this._converters[c.type].call(this,c);r.push({min:s,max:u,style:f})}return function(){return function(e){var t=e.get(n);for(o=0,i=r.length;i>o;++o){var s;if(s=0===o?t>=r[o].min&&t<=r[o].max:t>r[o].min&&t<=r[o].max)return[r[o].style]}return[l]}}()}},{key:"_renderUniqueValue",value:function(e){var t=e.defaultSymbol,l=[];t&&(l=[this._converters[t.type].call(this,t)]);var n=e.field1,r=e.uniqueValueInfos,o=this;return function(){for(var e={},t=0,i=r.length;i>t;++t){var s=r[t],a=s.symbol;e[s.value]=[o._converters[a.type].call(o,a)]}return function(t){var r=e[t.get(n)];return r?r:l}}()}},{key:"generateStyle",value:function(e,t){var l=e.drawingInfo,n=[],r=this._renderers[l.renderer.type].call(this,l.renderer);if(void 0!==r&&n.push(r),e.labelingInfo){var o=this._convertLabelingInfo(e.labelingInfo,t);n=n.concat(o)}return 1===n.length?n[0]:function(){return function(e,t){for(var l=[],r=0,o=n.length;o>r;++r){var i=n[r].call(null,e,t);i&&(l=l.concat(i))}return l}}()}}],[{key:"_convertPointToPixel",value:function(e){return e/.75}},{key:"_transformColor",value:function(e){return[e[0],e[1],e[2],e[3]/255]}},{key:"_convertEsriTS",value:function(t){var l=_Util2["default"].isDefinedAndNotNull(t.angle)?e._transformAngle(t.angle):void 0,n=_Util2["default"].isDefinedAndNotNull(t.text)?t.text:void 0;return new ol.style.Style({text:new ol.style.Text({fill:new ol.style.Fill({color:e._transformColor(t.color)}),font:t.font.style+" "+t.font.weight+" "+t.font.size+" px "+t.font.family,textBaseline:t.verticalAlignment,textAlign:t.horizontalAlignment,offsetX:e._convertPointToPixel(t.xoffset),offsetY:e._convertPointToPixel(t.yoffset),rotation:l,text:n})})}},{key:"_convertEsriPMS",value:function(t){var l=Math.ceil(e._convertPointToPixel(t.width)),n=document.createElement("img");n.src="data:"+t.contentType+";base64, "+t.imageData;var r=_Util2["default"].isDefinedAndNotNull(t.angle)?e._transformAngle(t.angle):void 0;return new ol.style.Style({image:new ol.style.Icon({img:n,imgSize:[n.width,n.height],scale:l/n.width,rotation:r})})}},{key:"_convertEsriSFS",value:function(t){var l=new ol.style.Fill({color:e._transformColor(t.color)}),n=t.outline?e._convertOutline(t.outline):void 0;return new ol.style.Style({fill:l,stroke:n})}},{key:"_convertOutline",value:function(t){var l,n=e._transformColor(t.color);return"esriSLSDash"===t.style?l=[5]:"esriSLSDashDot"===t.style?l=[5,5,1,2]:"esriSLSDashDotDot"===t.style?l=[5,5,1,2,1,2]:"esriSLSDot"===t.style?l=[1,2]:"esriSLSNull"===t.style&&(n[3]=0),new ol.style.Stroke({color:n,lineDash:l,width:e._convertPointToPixel(t.width)})}},{key:"_convertEsriSLS",value:function(t){return new ol.style.Style({stroke:e._convertOutline(t)})}},{key:"_transformAngle",value:function(e){var t=e*Math.PI/180,l=-t+Math.PI/2;return 0>l?2*Math.PI+l:l}},{key:"_convertEsriSMS",value:function(t){var l=new ol.style.Fill({color:e._transformColor(t.color)}),n=t.outline?e._convertOutline(t.outline):void 0,r=e._convertPointToPixel(t.size)/2,o=_Util2["default"].isDefinedAndNotNull(t.angle)?e._transformAngle(t.angle):void 0;return"esriSMSCircle"===t.style?new ol.style.Style({image:new ol.style.Circle({radius:r,fill:l,stroke:n})}):"esriSMSCross"===t.style?new ol.style.Style({image:new ol.style.RegularShape({fill:l,stroke:n,points:4,radius:r,radius2:0,angle:0,rotation:o})}):"esriSMSDiamond"===t.style?new ol.style.Style({image:new ol.style.RegularShape({fill:l,stroke:n,points:4,radius:r,rotation:o})}):"esriSMSSquare"===t.style?new ol.style.Style({image:new ol.style.RegularShape({fill:l,stroke:n,points:4,radius:r,angle:Math.PI/4,rotation:o})}):"esriSMSX"===t.style?new ol.style.Style({image:new ol.style.RegularShape({fill:l,stroke:n,points:4,radius:r,radius2:0,angle:Math.PI/4,rotation:o})}):"esriSMSTriangle"===t.style?new ol.style.Style({image:new ol.style.RegularShape({fill:l,stroke:n,points:3,radius:r,angle:0,rotation:o})}):void 0}}]),e}();exports["default"]=StyleGenerator,module.exports=exports["default"];
},{"./Util":3}],3:[function(_dereq_,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var utils={isDefinedAndNotNull:function(e){return void 0!==e&&null!==e},getResolutionForScale:function(e,t){var o=25.4/.28,r=ol.proj.METERS_PER_UNIT[t],l=39.37;return parseFloat(e)/(r*l*o)}};exports["default"]=utils,module.exports=exports["default"];
},{}],4:[function(_dereq_,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function e(e,t){for(var r=0;r<t.length;r++){var l=t[r];l.enumerable=l.enumerable||!1,l.configurable=!0,"value"in l&&(l.writable=!0),Object.defineProperty(e,l.key,l)}}return function(t,r,l){return r&&e(t.prototype,r),l&&e(t,l),t}}(),_StyleGenerator=_dereq_("./StyleGenerator"),_StyleGenerator2=_interopRequireDefault(_StyleGenerator),_Util=_dereq_("./Util"),_Util2=_interopRequireDefault(_Util),VectorLayerModifier=function(){function e(){_classCallCheck(this,e)}return _createClass(e,null,[{key:"modifyLayer",value:function(e,t,r){var l=new _StyleGenerator2["default"],a=e.drawingInfo.transparency;_Util2["default"].isDefinedAndNotNull(a)&&t.setOpacity((100-a)/100);var n=r.getUnits();t.setStyle(l.generateStyle(e,n)),e.minScale&&t.setMaxResolution(_Util2["default"].getResolutionForScale(e.minScale,n)),e.maxScale&&t.setMinResolution(_Util2["default"].getResolutionForScale(e.maxScale,n))}}]),e}();exports["default"]=VectorLayerModifier,module.exports=exports["default"];
},{"./StyleGenerator":2,"./Util":3}],5:[function(_dereq_,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}var _LayerGenerator=_dereq_("./LayerGenerator"),_LayerGenerator2=_interopRequireDefault(_LayerGenerator),_StyleGenerator=_dereq_("./StyleGenerator"),_StyleGenerator2=_interopRequireDefault(_StyleGenerator),_VectorLayerModifier=_dereq_("./VectorLayerModifier"),_VectorLayerModifier2=_interopRequireDefault(_VectorLayerModifier);module.exports={LayerGenerator:_LayerGenerator2["default"],StyleGenerator:_StyleGenerator2["default"],VectorLayerModifier:_VectorLayerModifier2["default"]};
},{"./LayerGenerator":1,"./StyleGenerator":2,"./VectorLayerModifier":4}]},{},[5])(5)
});