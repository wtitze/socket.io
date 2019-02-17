// Realizzazione di una chat con socket.io

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){ // alla richiesta della homepage
  res.sendFile(__dirname + '/index.html'); // restituisce il file index.html che contiene quanto necessario per la chat
});

io.on('connection', function(socket){ // gestisce le connessioni
  
  console.log('a user connected');  
  
  socket.on('chat message', function(msg){ // quando viene ricevuto l'evento 'chat message'
    console.log('message: ' + msg); // viene visualizzato il messaggio ricevuto sulal console
    io.emit('chat message', msg); // viene rispedito a tutti i client connessi
  });
  
  socket.on('disconnect', function(){ // quando viene ricevuto l'evento 'disconnect'
    console.log('user disconnected'); // viene visualizzato il messaggio che un utente si è disconnesso sulla console del server
  });
  
});

http.listen(3000, function(){ // Attenzione: non app.listen() ma http.listen() perché socket.io è utilizza il server http
  console.log('listening on port 3000');
});
