import React , {Component} from "react";
import "./App.css";
import * as L from 'leaflet';
import 'leaflet-dvf';
import { render, findDOMNode} from 'react-dom';
import * as citieData from "./data/cities.json";
import $ from 'jquery';





 class App extends Component{

      componentDidMount() {
        this.map();
      }

      map() {
          //  create our Map
            var map = L.map(findDOMNode(this)).setView([54.525963, 15.255119], 4);    
            L.tileLayer('https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png', {
            maxZoom:12,
            minZoom:3,  
            attribution: '&copy; <a href="http://osm.org/copyright">'
            }).addTo(map); 

          //==========   Color Functions   ========
            var HSLHue =new L.HSLHueFunction(new L.Point(0, 120), new L.Point(100, 20));
            var Blue =new L.RGBBlueFunction(new L.Point(0, 120), new L.Point(100, 20));
            var Green =new L.RGBGreenFunction(new L.Point(0, 120), new L.Point(100, 20));
            var Blend =new L.RGBColorBlendFunction(new L.Point(0, 120), new L.Point(100, 20));
            var uminosity =new L.HSLLuminosityFunction(new L.Point(0, 120), new L.Point(100, 20));
            var Red =new L.RGBRedFunction(new L.Point(0, 120), new L.Point(100, 20));
            var Saturation =new L.HSLSaturationFunction(new L.Point(0, 120), new L.Point(100, 20));
          // ====================== Fetch Data && Markers ==================================
            citieData.features.forEach(citie => {
              //====== MapMarker ====
               var marker = new L.MapMarker(new L.LatLng(citie.geometry.coordinates[0], citie.geometry.coordinates[1]), {
                                                radius: 10,
                                           });
               // map.addLayer(marker);

               //========== RegularPolygonMarker =====
              //  var RegularPolygonMarker = new L.RegularPolygonMarker(new L.LatLng(citie.geometry.coordinates[0], citie.geometry.coordinates[1]), {
              //   numberOfSides: 6,
              //   color: '#FFE702',
              //   opacity: 1,
              //   rotation: 60,
              //   radius: 10
              // });
              // map.addLayer(RegularPolygonMarker);
               
              // ============== Example using arcedPolyline ,RegularPolygonMarker,StarMarker
              var arcedPolyline = new L.ArcedPolyline([[citie.geometry.coordinates[0], citie.geometry.coordinates[1]],[55.75222, 37.61556]],{
                distanceToHeight: new L.LinearFunction([0, 5], [800, 200]),
                color: 'blue',
                weight: 1
              });
              // map.addLayer(arcedPolyline);

              var RegularPolygonMarker = new L.RegularPolygonMarker(new L.LatLng(55.75222, 37.61556), {
                numberOfSides: 5,
                color: '#FFE702',
                opacity: 1,
                rotation: 60,
                radius: 15
              });  
              // map.addLayer(RegularPolygonMarker);

              if(citie.geometry.coordinates[0] !== 55.75222 &&  citie.geometry.coordinates[1] !== 37.61556){
              var StarMarker = new L.StarMarker(new L.LatLng(citie.geometry.coordinates[0], citie.geometry.coordinates[1]), {
                numberOfSides: 3,
                color: HSLHue.evaluate(10),
                opacity: 1,
                rotation: 60,
                radius: 15
              });
              // map.addLayer(StarMarker);
              }

              // ======== ChartMarkers =======

              var options = {
                data: {
                  'dataPoint1': Math.random() * 20,
                  'dataPoint2': Math.random() * 20,
                  'dataPoint3': Math.random() * 20,
                  'dataPoint4': Math.random() * 20
                },
                chartOptions: {
                  'dataPoint1': {
                    fillColor: Blue.evaluate(10),
                    minValue: 0,
                    maxValue: 20,
                    maxHeight: 30,
                    displayText: function (value) {
                      return value.toFixed(6);
                    }
                  },
                  'dataPoint2': {
                    fillColor: Green.evaluate(10),
                    minValue: 0,
                    maxValue: 20,
                    maxHeight: 30,
                    displayText: function (value) {
                      return value.toFixed(6);
                    }
                  },
                  'dataPoint3': {
                    fillColor: HSLHue.evaluate(10),
                    minValue: 0,
                    maxValue: 20,
                    maxHeight: 30,
                    displayText: function (value) {
                      return value.toFixed(6);
                    }
                  },
                  'dataPoint4': {
                    fillColor: Saturation.evaluate(10),
                    minValue: 0,
                    maxValue: 20,
                    maxHeight: 30,
                    displayText: function (value) {
                      return value.toFixed(6);
                    }
                  }
                },
                weight: 0.5,
                color: '#04EFFF',
                opacity: 1,
                size:40
              }
              var barChartMarker = new L.BarChartMarker(new L.LatLng(citie.geometry.coordinates[0], citie.geometry.coordinates[1]), options);
              // map.addLayer(barChartMarker);
              var radialBarChartMarker = new L.RadialBarChartMarker(new L.LatLng(citie.geometry.coordinates[0], citie.geometry.coordinates[1]), options);
              // map.addLayer(radialBarChartMarker);
              var stackedRegularPolygonMarker = new L.StackedRegularPolygonMarker(new L.LatLng(citie.geometry.coordinates[0], citie.geometry.coordinates[1]), options);  
              // map.addLayer(stackedRegularPolygonMarker);
              var pieChartMarker = new L.PieChartMarker(new L.LatLng(citie.geometry.coordinates[0], citie.geometry.coordinates[1]), options); 
              // map.addLayer(pieChartMarker);
              var coxcombChartMarker = new L.CoxcombChartMarker(new L.LatLng(citie.geometry.coordinates[0], citie.geometry.coordinates[1]), options); 
              // map.addLayer(coxcombChartMarker);
              var radialMeterMarker = new L.RadialMeterMarker(new L.LatLng(citie.geometry.coordinates[0], citie.geometry.coordinates[1]), options);
              // map.addLayer(radialMeterMarker);

            });

            // =========== Custom SVG Markers ===========
         
            var marker = new L.SVGMarker(new L.LatLng(54.525963, 15.255119), {
              svg: '/SVG/MapMarker_Flag1_Right_Orange.svg',
              setStyle: function (svg) {
                 // Do something with the SVG element here
                 $(svg).find('rect').attr('fill', '#f32');
              }
            }).addTo(map);


           
}
  render(){
    
 
  return (  <div id='leaflet-container'></div>
    )

  }
 
   

         
  }

export default App;