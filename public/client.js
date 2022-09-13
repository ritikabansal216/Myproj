const socket = io()
let Aname;
let button = document.getElementById("myButton");
let textarea = document.getElementById("editor");
let messageArea = document.querySelector('.message__area')
do {
    Aname = prompt('Please enter your name: ')
} while(!Aname)

button.addEventListener('click', (e) => {
    let delta = quill.root.innerHTML;
    console.log(delta);
    sendMessage(delta);
}) 

function sendMessage(message) {
    let msg = {
        user: Aname,
        message: message
    }
    // Append 
    appendMessage(msg, 'outgoing')
    quill.setContents([{ insert: '\n' }]);
    scrollToBottom()

    // Send to server 
    socket.emit('message', msg)

}

function appendMessage(msg, type) {
    let mainDiva = document.createElement('div')
    let className = type
    mainDiva.classList.add(className, 'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiva.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

// Recieve messages 
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
    scrollToBottom()
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}