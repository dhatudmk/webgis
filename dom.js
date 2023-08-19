console.log('Hello uthad!');
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
const photoErrorText = document.getElementById('errorPhoto');
const peta = document.getElementById("mapContainer");
const foto = document.getElementById("foto");

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

// let a = document.getElementById("radioInput1");
// console.log(a.parentElement);
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
        photoErrorText.innerHTML = '* Lengkapi form dengan foto lahan';
        document.querySelector('.boxphoto').classList.add('errorBorder');
  }
});

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

// foto.addEventListener('select', (evnt) => {})
foto.addEventListener('change', (evnt) => {
  const imageFiles = evnt.target.files;
  const parentElement = document.getElementById('photoContainer');

  if (imageFiles.length > 3){
    evnt.preventDefault();
    // parentElement.removeChild(node);
    document.getElementById('errorPhoto').innerHTML = '* Maksimal 3 file foto';
  } else {
    // parentElement.removeChild(node);
    document.getElementById('errorPhoto').innerHTML = '';}
    for(let i = 0; i < 3; i++){
      let size = bytesToSize(imageFiles[i].size);
      let node = document.createElement('div');
      node.classList.add('preview');
      node.innerHTML =`<img class="imagePreview" src="${URL.createObjectURL(imageFiles[i])}" id="photo1">
      <p class="photoName">${imageFiles[i].name}</p>
      <p class="photoSize">${size}</p>
      <i class="material-icons" style="font-size:23px; padding-right: 10px;">delete_forever</i>`
      parentElement.appendChild(node);
    }
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

// console.log(imagePreview);


// let byte = 15276991;
// let byte1 = 39117;


// console.log(bytesToSize(byte));
// console.log(bytesToSize(byte1));