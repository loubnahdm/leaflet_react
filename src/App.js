import React , {Component} from "react";
import "./App.css";
import * as L from 'leaflet';
import 'leaflet-dvf';
import { render, findDOMNode} from 'react-dom';
import $ from 'jquery';
import 'leaflet-arrowheads';
import 'leaflet-polylinedecorator';
import * as SimportantData from "./data/stationImportant.json";





 class App extends Component{

      componentDidMount() {
        this.map();
      }

      map() {
          //  create our Map
            var map = L.map(findDOMNode(this)).setView( [51.39202,10.32477],6);    
            L.tileLayer('https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png', {
            maxZoom:6,
            minZoom:6,  
            attribution: '&copy; <a href="http://osm.org/copyright">'
            }).addTo(map); 

          //==========   Color Functions   ========
            var HSLHue =new L.HSLHueFunction(new L.Point(0, 120), new L.Point(100, 20));
            var Green =new L.RGBBlueFunction(new L.Point(0, 120), new L.Point(100, 20));
            var Blue =new L.RGBGreenFunction(new L.Point(0, 120), new L.Point(100, 20));
            var Blend =new L.RGBColorBlendFunction(new L.Point(0, 120), new L.Point(100, 20));
            var uminosity =new L.HSLLuminosityFunction(new L.Point(0, 120), new L.Point(100, 20));
            var Red =new L.RGBRedFunction(new L.Point(0, 120), new L.Point(100, 20));
            var Saturation =new L.HSLSaturationFunction(new L.Point(0, 120), new L.Point(100, 20));
           
          // ==================================================================
  
 
            SimportantData.stations.forEach(station => {
              var marker = new L.MapMarker(new L.LatLng(station.coordinates[1], station.coordinates[0]), {
                radius: 10,
            
              }).bindTooltip(station.properties.NAME+ station.coordinates);
              // map.addLayer(marker);

              var myVector =  L.polyline([[51.39202,10.32477],[(51+station.coordinates[1])/2,(11+station.coordinates[0])/2],new L.LatLng(station.coordinates[1], station.coordinates[0])],{color:Green.evaluate(10),weight: 2, opacity: 1}).arrowheads( {yawn: 40,fill: true,frequency: 'endonly', size: '13%'} );
              myVector.addTo(map);
              myVector.deleteArrowheads();

              
              var decorator = L.polylineDecorator(myVector, {
                  patterns: [
                      // defines a pattern of 10px-wide dashes, repeated every 20px on the line
                      {endOffset:1,offset: 0, repeat: 20, symbol: L.Symbol.dash({pixelSize: 5})}
                      // {offset: 0, repeat: 20, symbol: L.Symbol.arrowHead({pixelSize: 10,pathOptions: { color: Blue.evaluate(10) }})}
                      // {offset: 0, repeat: 50, symbol: L.Symbol.arrowHead({pixelSize: 15, polygon: false, pathOptions: {stroke: true}})}
                  ]
          
              });
              decorator.addTo(map);
    
              var options = {
                    data: {
                      'dataPoint1': Math.random() * 20,
                      'dataPoint2': Math.random() * 20,
                      'dataPoint3': Math.random() * 20,
                      'dataPoint4': Math.random() * 20
                    },
                    chartOptions: {
                      'dataPoint1': {
                        fillColor: Saturation.evaluate(10),
                        minValue: 0,
                        maxValue: 20,
                        maxHeight: 20,
                        displayText: function (value) {
                          return value.toFixed(2);
                        }
                      },
                      'dataPoint2': {
                        fillColor: Green.evaluate(10),
                        minValue: 0,
                        maxValue: 20,
                        maxHeight: 20,
                        displayText: function (value) {
                          return value.toFixed(2);
                        }
                      },
                      'dataPoint3': {
                        fillColor: Red.evaluate(10),
                        minValue: 0,
                        maxValue: 20,
                        maxHeight: 20,
                        displayText: function (value) {
                          return value.toFixed(2);
                        }
                      },
                      'dataPoint4': {
                        fillColor: HSLHue.evaluate(10),
                        minValue: 0,
                        maxValue: 20,
                        maxHeight: 20,
                        displayText: function (value) {
                          return value.toFixed(2);
                        }
                      }
                    },
                    weight: 1,
                    color: Saturation.evaluate(10) ,
                    opacity: 1
                    
              }
     
              if (station.coordinates[1] !== 51.39202 && station.coordinates[0] !== 10.32477 && station.coordinates[1] !== 52.85203 && station.coordinates[0] !== 13.6906) {
                var PieChartMarker = new L.PieChartMarker(new L.LatLng(station.coordinates[1], station.coordinates[0]), options); 
                // map.addLayer(PieChartMarker);
                var RadialBarChartMarker = new L.RadialBarChartMarker(new L.LatLng(station.coordinates[1], station.coordinates[0]), options);
                // map.addLayer(RadialBarChartMarker);
                var RadialMeterMarker = new L.RadialMeterMarker(new L.LatLng(station.coordinates[1], station.coordinates[0]), options);
                // map.addLayer(RadialMeterMarker);



                var marker = new L.SVGMarker(new L.LatLng(station.coordinates[1], station.coordinates[0]), {
                  svg: '/SVG/f1.svg',
                  setStyle: function (svg) {
                     // Do something with the SVG element here
                     $(svg).find('path').attr('fill', station.transformation.color);
                     $(svg).find('path').attr('transform', 'translate('+station.transformation.X+','+station.transformation.Y+') rotate('+station.transformation.ANGLE+')');
                     
                  }
                 
                }).bindTooltip(station.properties.NAME + ': '+ station.properties.DESCRIPTION).addTo(map);
              }
              else{
                var RegularPolygonMarker = new L.RegularPolygonMarker(new L.LatLng(51.39202, 10.32477), {
                      numberOfSides: 4,
                      color: '#FFE702',
                      opacity: 1,
                      rotation: 0,
                      radius: 10
                });
      
                map.addLayer(RegularPolygonMarker);
                RegularPolygonMarker.bindTooltip("GasPool", {permanent: true, direction:"center"}).openTooltip();
               
               
                var marker = new L.SVGMarker(new L.LatLng(52.85203, 13.6906), {
                  svg: '/SVG/station.svg', 
                }).bindTooltip(station.properties.NAME + ': '+ station.properties.DESCRIPTION).addTo(map);
               
             
              }
    

    
            });

            


           
      }
  render(){
      return (  <div id='leaflet-container'></div>)

  }
 
   

         
}

export default App;