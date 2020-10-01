//  Ciblage du DOM et référence globales
var txtCodecli          = document.getElementById('txtCodecli');
var btnValid            = document.getElementById('btnValid');
var virtualKb           = document.getElementById('virtualKb');
var passwdBox           = document.getElementById('passwdBox');
var infoBox             = document.getElementById('infoBox');
var btnSwitch           = document.getElementsByClassName('btnSwitch')[0];
var btnInfo             = document.getElementsByClassName('btnInfo')[0];
const PASSWD_MAX_LEN    =  6;
var numbers             = [0,1,2,3,4,5,6,7,8,9];
var padding             = ['','','','','','',''];
var keyValuesInit       = numbers.concat(padding);
var keyValues           = [...keyValuesInit];//create new [] w/spread.op w/ KeyValuesInit values
var boxIndex            = 0;

function init() {
    txtCodecli.addEventListener('keyup', checkConditions);
    btnValid.addEventListener('click', initVirtualKb);
    btnSwitch.addEventListener('click', triggerSwitch);
    btnInfo.addEventListener('click', () => {
        infoBox.classList.toggle('hide');
    });
}

function checkConditions(e) {
    var cond = e.target.value.length === 8 && Number.isInteger(+e.target.value);
    
    btnValid.disabled = !cond; //  btnValid turns clickable

    if (cond) {
        e.target.style.borderBottomColor = '#00c796';
    } else {
        e.target.style.borderBottomColor = 'red';
        resetVirtualKb();
        resetPasswd();
    }
}

/** initVirtualKb
 *  append the virtual keyboard to the dom and the passwordBoxes
*/
function initVirtualKb() {
    if (virtualKb.children.length === 0) {
        virtualKb.appendChild(buildVirtualKb());
        buildPasswdBoxes();
    }
}

/** buildVirtualKb
* Create virtual Keyboard
*/
function buildVirtualKb() {
    var keys = document.createElement('div');

    // create 4 lines
    for (let i = 0; i < 4; i++) {
        var row = document.createElement('div');
        row.classList.add('row');
        
        for (let j = 0; j < 4; j++) {
            row.appendChild(buildKey());
        }
        keys.appendChild(row);
    }
    return keys;
}

/** buildKey
 * Create a key of the virtual keyboard
 * (called on callback on row.appenChild() l.43)
*/
function buildKey() {
    var key = document.createElement('div');
    key.innerText = pickValue();
    key.classList.add('key');

    if (key.innerText !== '') {
        key.addEventListener('click', selectKey);
    }
    return key;
}

function pickValue() { 
    var max = keyValues.length;
    // return values between 0 and max
    return keyValues.splice(randomIndex(max), 1)[0];
    // since splice() return an array, [0] index return value 
}

function randomIndex(max) {
    return Math.floor(Math.random() * max);
}

function buildPasswdBoxes() {
    for( let i = 0; i < PASSWD_MAX_LEN; i++) {
        let box = document.createElement('div');
        box.classList.add('box');
        box.innerText = '-';
        passwdBox.appendChild(box);
    }
}

function selectKey(e) {
    if (boxIndex < PASSWD_MAX_LEN) {
        passwdBox.children[boxIndex].innerText = '*';
        boxIndex++;
    }

    if (boxIndex ===  PASSWD_MAX_LEN && passwdBox.children.length === PASSWD_MAX_LEN) {
        var reset = document.createElement('div');
        reset.classList.add('box', 'close', 'pointer');
        reset.innerText = 'x';
        reset.addEventListener('click', () => {
            resetPasswd();
            buildPasswdBoxes();
        });
        passwdBox.appendChild(reset);
    }
}

function resetVirtualKb() {
    virtualKb.innerHTML = '';
    keyValues = [...keyValuesInit];
}

function resetPasswd() {
    passwdBox.innerHTML = '';
    boxIndex = 0;
}

function triggerSwitch(e) {
    var list = e.target.classList;
    e.target.innerText = list.contains('yes') ? 'non' : 'oui';
    e.target.classList.toggle('yes');
}

init();
