console.log('Hello uthad!');
// *****************************************************************************************
// DOM Buatan sendiri
// *****************************************************************************************
import {validation} from './objValidation';

const form = document.getElementById("form1");
const radioOption = document.querySelectorAll('input[type="radio"]');
const textRadio = document.getElementById("textRadio");
const jenisAlihFungsi = document.getElementById("jenisAlihFungsi");
const linnyaAlihFungsi = document.getElementById("linnyaAlihFungsi"); 
const checkBox = document.getElementById('checkboxID');
const radioErrorBorder = document.querySelectorAll('div.radio');
const radioErrorText = document.getElementById("errorRadio");
const mapErrorText = document.getElementById("errorMap");
const photoErrorText = document.getElementById('errorPhoto');
const peta = document.getElementById("mapContainer");
const foto = document.getElementById("foto");
const warning = document.getElementById("warning");

console.log(validation);


let radio2 = radioOption[2];

radioOption.forEach(radioOption =>{
    radioOption.addEventListener('change', () => {
    // console.log(textRadio)
    validation.radio = 0;
    if(validation.radio === 0 &&
      validation.textRadio === 0 &&
      validation.peta === 0 &&
      validation.foto === 0) {warning.style.display = 'none'}
    if(radio2.checked){
        textRadio.style.display='block';
        textRadio.disabled = false;
        textRadio.focus();
        validation.textRadio = 1;
        radioErrorBorder.forEach(b => {
            b.classList.remove('errorBorder');
        })
        radioErrorText.innerHTML = "";
    
    } else {
        textRadio.style.display='none';
        // warning.style.display = 'none';
        // if (validation.radio = 0){warning.style.display = 'none'};
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
    validation.textRadio = 0;
    if(validation.radio === 0 &&
      validation.textRadio === 0 &&
      validation.peta === 0 &&
      validation.foto === 0) {warning.style.display = 'none'}
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

// let a = document.getElementById("radioInput1");
// console.log(a.parentElement);
// console.log('div radio', b)


form.addEventListener('submit', (e) => {
  let radio1 = document.getElementById("radioInput1");
  let radio2 = document.getElementById("radioInput2");
  let radio3 = document.getElementById("radioInput3");
  let geom = document.getElementById("koordinat");
  let foto = document.getElementById("foto");
  let warning = document.getElementById("warning");
  let section = document.getElementsByClassName('section');

  if (!foto.value) {
    e.preventDefault();
    warning.style.display = "block";
    photoErrorText.innerHTML = '* Lengkapi form dengan foto lahan';
    document.querySelector('.boxphoto').classList.add('errorBorder');
    validation.foto = 1;
    section[3].scrollIntoView(true);
  }
  if (geom.value === "") {
    e.preventDefault();
    warning.style.display = "block";
    peta.classList.add("errorBorder");
    mapErrorText.innerHTML = "* Klik pada peta di lokasi terjadinya alih fungsi lahan";
    validation.peta = 1;
    peta.scrollIntoView(true);
  }
  if (radio3.checked && !textRadio.value) {
    e.preventDefault();
    warning.style.display = "block";
    radioErrorText.innerHTML = "* Tuliskan bentuk perubahan lahan yang terjadi";
    textRadio.classList.add('errorBorder');
    textRadio.focus();
    validation.textRadio = 1;
    section[1].scrollIntoView(true);
  }
  if (!radio1.checked && !radio2.checked && !radio3.checked){
    e.preventDefault();
    radioErrorText.innerHTML = '* Pilih bentuk perubahan lahan yang terjadi';
    warning.style.display = "block";
    validation.radio = 1;
    section[1].scrollIntoView(true);
    radioErrorBorder.forEach(b => {
        b.classList.add('errorBorder');
    })
  }
});


warning.addEventListener('click', () => {
  let section = document.getElementsByClassName('section');
  console.log(validation);
  if(validation.foto === 1){section[3].scrollIntoView(true)};
  if(validation.peta === 1){peta.scrollIntoView(true)};
  if(validation.textRadio === 1){section[1].scrollIntoView(true)};
  if(validation.radio === 1){section[1].scrollIntoView(true)};
})


// let section = document.getElementsByClassName('section');
// console.log(section);
// ********************************** nomor HP **************************************** //
// let noHp = document.getElementById("noHP");
// let noHpValidation = (nomor)=> {
  //   let pattern = /^(\+62|62|0)8[1-9][0-9]{6,9}$/;
  //   return pattern.test(nomor);
  // }
  
  // console.log(noHpValidation("0148299371"));
  
// ********************************** nomor HP **************************************** //


function bytesToSize(bytes) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (bytes === 0) return 'n/a'
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
  if (i === 0) return `${bytes} ${sizes[i]})`
  return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`
}

const parentElement = document.getElementById('photoContainer');

for(let i = 0; i < 3; i++){
	let node = document.createElement('div');
	node.classList.add('preview');
	node.innerHTML =`<img class="imagePreview" src="">
	<p class="photoName"></p>
	<p class="photoSize"></p>
	<i class="material-icons" style="font-size:23px; padding-right: 10px;">delete_forever</i>`
	parentElement.appendChild(node);
}


// let c = abc[3].setAttribute('src', './data/logo-stpn');


// console.log(document.querySelector('img'));
// console.dir(document.querySelector('.photoName'));
		
// console.log(parentElement.querySelector('div.preview'));

// foto.addEventListener('select', (evnt) => {})
foto.addEventListener('change', (evnt) => {
  const imageFiles = evnt.target.files;
  validation.foto = 0;
  document.querySelector('.boxphoto').classList.remove('errorBorder');
  document.getElementById('errorPhoto').innerHTML = '';
  // console.log('file image', imageFiles);

	let preview = parentElement.querySelectorAll('div.preview');
	let image = parentElement.querySelectorAll('img');
	let imageName = parentElement.querySelectorAll('p.photoName');
	let imageSize = parentElement.querySelectorAll('p.photoSize');
	let imageRemove = parentElement.querySelectorAll('i');

  if(validation.radio === 0 &&
    validation.textRadio === 0 &&
    validation.peta === 0 &&
    validation.foto === 0) {warning.style.display = 'none'}
	
	for(let i = 0; i < 3; i++){
		let size = bytesToSize(imageFiles[i].size); 
		preview[i].style.display = 'inline-flex';
		image[i].setAttribute('src', URL.createObjectURL(imageFiles[i]));
		imageName[i].innerHTML = imageFiles[i].name
		imageSize[i].innerHTML = size;
		imageRemove[i].addEventListener('click', () =>{
      let photo = document.getElementById('foto');
      let file = Array.from(photo.files);
      file.splice(1, 2);
      console.log('ga tahu', file);
      console.log('aslinya', imageFiles[i]);
      console.log('luarnya', imageFiles);
      
      // imageFiles[i].remove;
    })
	}

	if (imageFiles.length > 3){
		evnt.preventDefault();
    // parentElement.removeChild(node);
    document.getElementById('errorPhoto').innerHTML = '* Hanya dapat melapirkan 3 file foto';
    document.getElementById('errorPhoto').style.color = 'black';
		// document.querySelector('div.boxphoto').style.display = 'none'
		// return;
  } 
	// if (imageFiles.length < 3) {
  //   document.getElementById('errorPhoto').innerHTML = '* apa aja deh';
	// }
  
  // if () {
  //   document.querySelector('.boxphoto').classList.remove('errorBorder');
  // }
	// let photo = URL.createObjectURL(imageFiles[0]);
	// console.log('abc ',abc[2]);
	// ${URL.createObjectURL(imageFiles[i])}, ${imageFiles[i].name}, ${size}
	
	// console.log(document.querySelector('.photoContainer'));
})

// foto.addEventListener('change', (evnt) => {
//   let imageFiles = evnt.target.files;
//   // if (imageFiles.length > 3){
//   //   evnt.preventDefault();
//   //   document.getElementById('errorPhoto').innerHTML = '* Maksimal 3 file foto';
//   // }
  
//   for(let i = 0; i < imageFiles.length; i++){
//     let parentElement = document.getElementById('photoContainer');
//     // console.log(imageFiles[i].name);
//     let fileSize = bytesToSize(imageFiles[i].size)
//     let photo = URL.createObjectURL(imageFiles[i])
//     // console.log(fileSize);
//     let node =document.createElement('div')
//     node.className = 'preview';
//     node.innerHTML = `<img class="imagePreview" src="${photo}">`
//     // let preview = document.createElement('p');
//     // preview.className = 'preview';
//     // preview.innerHTML = `file size: ${fileSize}`;
//     parentElement.appendChild(node);
//   }



//   // if (imageFilesLength > 0) {
//   //   let imageScr = URL.createObjectURL(imageFiles[0]);
//   //   let imagePreview = document.querySelector('.imagePreview');
//   //   imagePreview.src = imageScr;
//   // }
// })
