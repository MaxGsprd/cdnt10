const inputClientNum      = document.getElementById('inputClientNum');
const validateBtn         = document.getElementById('validateBtn');
const wrongIdSpan         = document.getElementById('wrongIdSpan');
const deleteBtn           = document.getElementById('deleteBtn');
const validNumIcon        = document.getElementById('validNumIcon');
let isNumValid          = false;


validateBtn.addEventListener('click', (e) => {
    if (!isNumValid) {
        wrongIdSpan.style.display = 'block';
    } else {
        console.log('codeisvalid');
    }
});



inputClientNum.addEventListener('keydown', (e) =>{
    let clientId = parseInt(inputClientNum.value);
    console.log(inputClientNum.value);

    if (inputClientNum.value.length == 8 && !isNaN(clientId)) {
        deleteBtn.style.display = 'none';
        validNumIcon.style.display = 'inline';
        isNumValid = true;

        
    } else {
        validNumIcon.style.display = 'none';
        deleteBtn.style.display = 'inline';
        isNumValid = false;


    }
});