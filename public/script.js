let socket = io();

let qs = sel => document.querySelector(sel);

let emitData = () => {
   socket.emit('chat', {
      name: qs('#name').value,
      message: qs('#message').value
   });

   qs('#message').value = "";
};

qs('#sendButton').onclick = () => {
   emitData();
};

qs('#message').onkeydown = event => {
   event.key == "Enter" ? emitData() : {};
   socket.emit('typing', qs('#name').value);
};

socket.on('chat', data=>{
   qs('#main').insertAdjacentHTML('beforeend', `
      <div><b>${data.name}:</b> ${data.message}</div>
      <hr />
   `);

   qs('#main > div:last-of-type').scrollIntoView({
      behavior: 'smooth'
   });

   qs('#typingMsg').innerHTML = "";
});

let forgetIntrvl = null;

socket.on('typing', data=>{
   qs('#typingMsg').innerHTML = `${data} is typing...`;

   clearTimeout(forgetIntrvl);

   forgetIntrvl = setTimeout(()=>{
      qs('#typingMsg').innerHTML = "";
   },1000);

   qs('#typingMsg').scrollIntoView({
      behavior: 'smooth'
   });
});