import './style.css';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import {Map, View} from 'ol';
import {fromLonLat, transform} from 'ol/proj';
import GeoJSON from 'ol/format/GeoJSON';
import Feature from 'ol/Feature';
import VectorSource from 'ol/source/Vector';
import VectorLayerImage from 'ol/layer/VectorImage';
import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';
import CircleStyle from 'ol/style/Circle';
import Icon from 'ol/style/Icon';
import Point from 'ol/geom/Point';
import {circular} from 'ol/geom/Polygon';
import Draw from 'ol/interaction/Draw';
import Geolocation from 'ol/Geolocation';
import VectorLayer from 'ol/layer/Vector';
import Control from 'ol/control/Control';
// import {ZoomToExtent, defaults as defaultControls} from 'ol/control';
import ZoomToExtent from 'ol/control/ZoomToExtent';
import FullScreen from 'ol/control/FullScreen';
import { scale } from 'ol/size';



// Base map
const baseMapsOSM = new TileLayer({
  source: new OSM(),
});

// Layer untuk RDTR_Sawah
const vectorStyle = new Style({
  stroke: new Stroke({
    color: 'rgba(20, 20, 20, 0.1)',
    width: 0,
  }),
  fill: new Fill({
    color: 'rgba(255, 61, 61, 0.5)',
  }),
});

const vectorSource = new VectorSource({
  maxZoom: 10,
  format: new GeoJSON(),
  url: './data/sayegan.geojson',
});

const vectorLayer = new VectorLayerImage({
  source: vectorSource,
  style: 
    function (feature) {
    const fillColor = feature.get("Color");
    vectorStyle.getFill().setColor(fillColor);
    return vectorStyle;
  },
});

const view = new View({
  center: //vectorSource.getExtent(),
  fromLonLat ([110.298, -7.730]),
  zoom: 13,
});

const map = new Map({
  target: 'map',
  layers: [baseMapsOSM, vectorLayer],
  view: view,
});

// Layer untuk titik pelaporan
const pointVectorSource = new VectorSource({
  wrapX: false,
});

const pointVectorLayer = new VectorLayerImage({
  source: pointVectorSource,
  style: 
    new Style({
      image: new Icon({
        anchor: [0.5, 30],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: './data/pin (1).png',
        scale: 1.3,
      }),
    }),
  // {
  //   'circle-radius': 4,
  //   'circle-fill-color': 'black',
  // },
});

map.addLayer(pointVectorLayer);

// Fungsi menggambar titik pelaporan
var lastFeature, geomType;
geomType = 'Point';

const pointReport = new Draw({
  type: geomType,
  source: pointVectorSource,
  condition: function (e){
    let coord = e.coordinate;
    let feature = vectorSource.getFeaturesAtCoordinate(coord);
    if (feature.length > 0) {
      let a = transform(coord, "EPSG:3857", "EPSG:4326");
      let lon = a[0];
      let lat = a[1];
      let b = feature[0];
      // let c = 'Lon: '+lon;
      let d = 'Koordinat '+'&emsp;'+'Lat: '+lat+'&emsp;'+'Lon: '+lon;
      let koordinat = document.getElementById("koordinat");
      let status = document.getElementById("status");
      // document.getElementById("longitude").innerHTML =c;
      document.getElementById("coord").innerHTML =d;
      koordinat.setAttribute('Value', lat+', '+lon);
      status.setAttribute('Value', b.get('Sawah_RDTR'));
      document.getElementById("mapContainer").classList.remove("errorBorder");
    return true;
    } else {
      return false;
    };
  },
});

// map.on('click', function(evnt) {
//   let point = map.getCoordinateFromPixel(evnt.pixel)
//   console.log('ESPG 4326', transform(point, "EPSG:3857", "EPSG:4326"));
//   console.log('ESPG 3857',point);
// })

// remove the last feature from the pointVectorSource
const removeLastFeature = function(){
  if (lastFeature)
    pointVectorSource.removeFeature(lastFeature);
};

pointReport.on('drawstart', function (e) {
  if (geomType !== 'Point') {
    pointVectorSource.clear();
  };
});

pointReport.on('drawend', function(e) {
  if (geomType === 'Point') {
    removeLastFeature()
  }
  lastFeature = e.feature;
})

map.addInteraction(pointReport);


// Menampilkan koordinat titik pelaporan
// document.getElementById('SelesaiGambar')
//   .addEventListener('click', function (){
//     map.removeInteraction(pointReport);
//     let a = pointVectorSource.getFeatures();
//     let b = a[0].getGeometry().getFlatCoordinates();
//     let c = new transform(b, "EPSG:3857", "EPSG:4326");
//     // console.log(c);
//     // let value = 'Ganti ini';
//     let koordinat = document.getElementById("Koordinat");
//     koordinat.setAttribute('Value', c);
//     console.log(pointVectorSource);
//     console.log(pointVectorLayer);
//     // document.getElementById("Koordinat").innerHTML = value;
// });




/* ************************************************************

// percobaan user location


// Get user location
const userLocationSource = new VectorSource();
const userLocationLayer = new VectorLayer({
  source: userLocationSource,
  style: {
    'stroke-color': '#37b9ed',
    'circle-radius': 4,
    'fill-color': 'rgba(171, 231, 255, 0.4)',
  },
});

navigator.geolocation.watchPosition(
  function (pos) {
    const coords = [pos.coords.longitude, pos.coords.latitude];
    const accuracy = circular(coords, pos.coords.accuracy);
    userLocationSource.clear(true);
    userLocationSource.addFeatures([
      new Feature(
        accuracy.transform('EPSG:4326', map.getView().getProjection())
      ),
      new Feature(new Point(fromLonLat(coords))),
    ]);
  },
  function (error) {
    alert(`ERROR: ${error.message}`);
  },
  {
    enableHighAccuracy: true,
  }
);


// const locate1 = document.getElementsByClassName('Locate');
const locate = document.createElement('div');
locate.className = 'ol-control ol-unselectable locate';
locate.innerHTML = '<button title="Locate me">◎</button>';
locate.addEventListener('click', function () {
  if (!userLocationSource.isEmpty()) {
    map.getView().fit(userLocationSource.getExtent(), {
      maxZoom: 18,
      duration: 500,
    });
  }
});

map.addLayer(userLocationLayer);

map.addControl(
  new Control({
    element: locate,
  })
);


// Batas percobaan user location

**********************************************************  */ 



// Percobaan user location 

const geolocation = new Geolocation({
  // enableHighAccuracy must be set to true to have the heading value.
  tracking: true,
  trackingOptions: {
    enableHighAccuracy: true,
  },
  projection: view.getProjection(),
});

const accuracyFeature = new Feature();
geolocation.on('change:accuracyGeometry', function () {
  accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
});

const positionFeature = new Feature();
positionFeature.setStyle(
  new Style({
    image: new CircleStyle({
      radius: 6,
      fill: new Fill({
        color: '#3399CC',
      }),
      stroke: new Stroke({
        color: '#fff',
        width: 2,
      }),
    }),
  })
);

geolocation.on('change:position', function () {
  const coordinates = geolocation.getPosition();
  positionFeature.setGeometry(coordinates ? new Point(coordinates) : null);
});

const userLocationLayer = new VectorLayer({
  source: new VectorSource({
    features: [accuracyFeature, positionFeature],
  })
});

map.addLayer(userLocationLayer);


// **************************************
// Tombol user location

const buttonLocate = document.createElement('div');
buttonLocate.id = 'location';
buttonLocate.className = 'ol-control ol-unselectable locate';
buttonLocate.innerHTML = '<button title="Locate me">◎</button>';

map.addControl(
  new Control({
    element: buttonLocate,
  })
);

document.getElementById('location')
  .addEventListener('click', function (){
    let a = userLocationLayer.getSource();
    map.getView().fit(a.getExtent(), {
      maxZoom: 18,
      duration: 500,
    });
  });

// Zoom to Extent
map.addControl(new ZoomToExtent({
  extent: [12273081.259, -867899.356, 12283553.131, -858344.728,],
}));

// Full Screen
map.addControl(new FullScreen());

// confirmation button
const confirmationButton = document.createElement('div');
confirmationButton.id = 'confirmation';
confirmationButton.className = 'ol-controlA ol-unselectable confirm';
confirmationButton.innerHTML = '<button title="Confirm your point">Konfirmasi titik</button>';

map.addControl(
  new Control({
    element: confirmationButton,
  })
);

// change point button
const changePoint = document.createElement('div');
changePoint.id = 'changePoint';
changePoint.className = 'ol-controlA ol-unselectable changePoint';
changePoint.innerHTML = '<button title="Change point">Ubah titik</button>';

// const disable = document.getElementById('changePoint').disabled = true;

map.addControl(
  new Control({
    element: changePoint,
  })
); 

Function
document.getElementById('confirmation')
  .addEventListener('click', function (){
    map.removeInteraction(pointReport);
    // let a = pointVectorSource.getFeatures();
    // let b = a[0].getGeometry().getFlatCoordinates();
    // let c = new transform(b, "EPSG:3857", "EPSG:4326");
    // let longitude = c[0];
    // let latitude = c[1];
    // // let value = 'Ganti ini';
    // let koordinat = document.getElementById("Koordinat");
    // koordinat.setAttribute('Value', latitude+', '+longitude);
    // disable = false;
  }
);

document.getElementById('changePoint')
  .addEventListener('click', function(){
    map.addInteraction(pointReport);
  }
);


// *********************************************
// button zoom extent
// const buttonZoomExtent = document.createElement('div');
// buttonZoomExtent.id = 'zoom';
// buttonZoomExtent.className = 'zoomExtent'
// buttonZoomExtent.innerHTML = '<button tittle="Extent"></button>'






// *****************************************************************************************
// DOM Buatan sendiri
// *****************************************************************************************

const form = document.getElementById("form1");
const radioOption = document.querySelectorAll('input[type="radio"]');
const textRadio = document.getElementById("textRadio");
const jenisAlihFungsi = document.getElementById("jenisAlihFungsi");
const linnyaAlihFungsi = document.getElementById("linnyaAlihFungsi"); 
const checkBox = document.getElementById('checkboxID');
const radioErrorBorder = document.querySelectorAll('div.radio');
const radioErrorText = document.getElementById("errorRadio");
const mapErrorText = document.getElementById("errorMap");
const peta = document.getElementById("mapContainer");

let radio2 = radioOption[2];

radioOption.forEach(radioOption =>{
  radioOption.addEventListener('change', () => {
    // console.log(textRadio)
    if(radio2.checked){
      textRadio.style.display='block';
      textRadio.disabled = false;
      textRadio.focus();
      radioErrorBorder.forEach(b => {
        b.classList.remove('errorBorder');
      })
      radioErrorText.innerHTML = "";
      
    } else {
      textRadio.style.display='none';
      textRadio.disabled = true;
      radioErrorBorder.forEach(b => {
        b.classList.remove('errorBorder');
      })
      radioErrorText.innerHTML = "";
    }
  })
})

textRadio.addEventListener('input', () => {
  textRadio.classList.remove('errorBorder');
  document.getElementById("errorRadio").innerHTML = "";
})

// for(let i = 0; i < radioOption.length; i++){
//   radioOption[i].addEventListener('change', () => {
//     let selectedRadio = document.querySelector('input[type="radio"]:checked').value;
//     jenisAlihFungsi.setAttribute('value', selectedRadio);
//     if(radioOption[2].checked){
//       textRadio.style.display='block';
//       textRadio.focus();
//       linnyaAlihFungsi.setAttribute('value', textRadio.value);
//       textRadio.addEventListener('input', ()=>{
//         linnyaAlihFungsi.setAttribute('value', textRadio.value)
//       });
//     } else {
//       textRadio.style.display='none';
//       linnyaAlihFungsi.setAttribute('value', "");
//     }
//   });
// };

// console.dir(checkBox);

checkBox.addEventListener('click', () => {
  if(checkBox.checked) {
    document.querySelector('.section-identitas').style.display ='block';
    document.getElementById("nama").disabled = false;
    document.getElementById("noHp").disabled = false;
    document.getElementById("alamat").disabled = false;
    document.getElementById("nama").focus();
  } else {
    document.querySelector('.section-identitas').style.display ='none';
    document.getElementById("nama").disabled = true;
    document.getElementById("noHp").disabled = true;
    document.getElementById("alamat").disabled = true;
  }
});

// let noHP = document.getElementById("noHp");
// noHP.addEventListener('input', () => {
//   let noHpValidation = (nomor) => {
//     let pattern = /^(\+62|62|0)8[1-9][0-9]{6,9}$/;
//     return pattern.test(nomor);
//   };
//   let result = noHpValidation(noHp.value);
//   return (console.log(result));
// })

let a = document.getElementById("radioInput1");
console.log(a.parentElement);
// console.log('div radio', b)


form.addEventListener('submit', (e) => {
  let radio1 = document.getElementById("radioInput1");
  let radio2 = document.getElementById("radioInput2");
  let radio3 = document.getElementById("radioInput3");
  let geom = document.getElementById("koordinat");
  let foto = document.getElementById("foto");

  if (!radio1.checked && !radio2.checked && !radio3.checked){
    e.preventDefault();
    radioErrorText.innerHTML = '* Pilih bentuk perubahan lahan yang terjadi';
    radioErrorBorder.forEach(b => {
      b.classList.add('errorBorder');
      // b.scrollIntoView(false);
    })
    // radio1.scrollIntoView(false);

  }
  if (radio3.checked && !textRadio.value) {
    e.preventDefault();
    radioErrorText.innerHTML = "* Tuliskan bentuk perubahan lahan yang terjadi";
    textRadio.classList.add('errorBorder');
    textRadio.focus();
    // textRadio.scrollIntoView(false);
    // console.log('bulan september');
  } 
  if (geom.value === "") {
    e.preventDefault();
    peta.classList.add("errorBorder");
    // peta.scrollIntoView(true);
    mapErrorText.innerHTML = "* Klik pada peta di lokasi terjadinya alih fungsi lahan";
    // map.scrollIntoView();
  }
  if (!foto.value) {
    e.preventDefault();
  }
});

// let noHp = document.getElementById("noHP");
// let noHpValidation = (nomor)=> {
//   let pattern = /^(\+62|62|0)8[1-9][0-9]{6,9}$/;
//   return pattern.test(nomor);
// }

// console.log(noHpValidation("0148299371"));