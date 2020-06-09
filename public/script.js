let socket = io();
let forgetIntrvl = null;

let qs = sel => document.querySelector(sel);

let messageInp = qs('#message');
let nameInp = qs('#name');
let sendBttn = qs('#sendButton');
let messageBox = qs('#messageBox');
let typingMsg = qs('#typingMsg');

let emitData = () => {
   socket.emit('chat', {
      name: nameInp.value,
      message: messageInp.value
   });

   messageInp.value = "";
};

////////////////// DOM Events ///////////////////

sendBttn.onclick = () => {
   emitData();
};

messageInp.onkeydown = event => {
   event.key == "Enter" ? emitData() : socket.emit('typing', nameInp.value);
};

nameInp.onkeydown = event => {
   event.key == "Enter" ? messageInp.focus() : {};
};

nameInp.onblur = () => {
   nameInp.value ? nameInp.disabled = true : {}
}

////////////////// WebSocket Events ///////////////////

socket.on('chat', ({ name, message })=>{
   typingMsg.innerHTML = "";
   
   messageBox.insertAdjacentHTML('beforeend', `
      <div class="headCont">
         <b class="name">${name}:</b>
      </div>
      <div class="message">${message}</div>
      <hr />
   `); // add timestamp maybe?
   
   qs('#messageBox > div:last-of-type').scrollIntoView({
      behavior: 'smooth'
   });
});

socket.on('typing', name =>{
   typingMsg.innerHTML = `${name} is typing...`;
   
   clearTimeout(forgetIntrvl);
   
   forgetIntrvl = setTimeout(()=>{
      typingMsg.innerHTML = "";
   },1000);
   
   typingMsg.scrollIntoView({
      behavior: 'smooth'
   });
});