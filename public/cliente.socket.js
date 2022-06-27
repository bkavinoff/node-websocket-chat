const socket = io()

const messageForm = document.querySelector('#messageForm')
const userInput = document.querySelector('#userInput')
const messageInput = document.querySelector('#messageInput')
const submitInput = document.querySelector('#submitInput')
const messagePool = document.querySelector('#messagePool')

function SendMessage(messageInfo){
    socket.emit('client:message', messageInfo)
}

function RenderMessages(messagesInfo){
    const html = messagesInfo.map((msg) => {
        return (`<div>
        <strong>${msg.username}</strong>: 
        <em>${msg.message}</em>
        </div>`)
    }).join(' ')
    messagePool.innerHTML=html
}

messageForm.addEventListener('submit', event => {
    event.preventDefault()
    const messageInfo = {username:userInput.value, message:messageInput.value}
    SendMessage(messageInfo)
})

socket.on('server:messages', RenderMessages)