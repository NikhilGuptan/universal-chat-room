
// getting socket data
const socket = io()
let userName;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')

// loop to enter an mane for user
do {
    userName = prompt('Please enter your name: ')
} while(!userName)

textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})

// setting userName
function settingTheName(){
    document.getElementById("userName").innerHTML = userName;
}
settingTheName();


// sending the messages which are present in socket.io
function sendMessage(message) {
    let msg = {
        user: userName,
        message: message.trim()
    }
    appendMessage(msg, 'outgoing')
    textarea.value = ''
    scrollToBottom()
    socket.emit('message', msg)

}

// function to append data
function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

// Recieving messages from socket.io
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
    scrollToBottom()
})


// function so every new message view.
function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}



