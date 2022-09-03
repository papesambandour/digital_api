const app = new Vue({
  el: '#app',
  data: {
    title: 'NestJS Chat Real Time',
    name: '',
    text: '',
    messages: [],
    socket: null,
    room: '766144307',
    roomIsActive: false,
  },
  methods: {
    sendMessage() {
      if (this.validateInput()) {
        const message = {
          name: this.name,
          text: this.text,
          room: this.room,
        };
        this.socket.emit('msgToPhone', message);
        this.text = '';
      }
    },
    receivedMessage(message) {
      this.messages.push(message);
    },
    validateInput() {
      return this.name.length > 0 && this.text.length > 0;
    },
    validateName() {
      return this.name.length > 0;
    },
    Connecte() {
      this.socket.emit('joinRoom', this.room);
      this.roomIsActive = true;
    },
    DisConnecte() {
      this.socket.emit('leftRoom', this.room);
      this.roomIsActive = false;
    },
  },
  computed: {},
  created() {
    this.socket = io('http://192.168.1.8:3000/phone?device=WebClient');
    // this.socket = io('https://monetic.pdg-dev.com/phone?device=WebClient');
    this.socket.on('msgToPhone', (message) => {
      console.log(message);
      this.receivedMessage(message);
    });

    this.socket.on('connect', () => {
      this.socket.emit('joinRoom', this.room);
      this.roomIsActive = true;
      console.log('Tu viens de te connectee au serveur ');
    });
    this.socket.on('disconnect', () => {
      this.socket.emit('leftRoom', this.room);
      this.roomIsActive = false;
      console.log('Tu viens de te deconnectee au serveur ');
    });

    this.socket.on('joinedRoom', (room) => {
      console.log('Tu viens de joindre le room =>' + room);
      this.roomIsActive = true;
    });

    this.socket.on('leftRoom', (room) => {
      console.log('Tu viens de quitter le room =>' + room);
      this.roomIsActive = false;
    });
  },
});
/*
{
  "name": "Pape Ndour",
      "text": "Bonjour",
    "room": "777293282"
}*/
