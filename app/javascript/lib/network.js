export default class Network {
  constructor(onSpeak, onWalk) {
    App.room = App.cable.subscriptions.create("RoomChannel", {
      connected: () => {},
      disconnected: () => {},
      received: (receivedData) => {
        let data = receivedData['message'];
        console.log('received:' + data.type);
        if (data.type == 'speak') {
          onSpeak(data.id, data.message);
        } else if (data.type == 'walk') {
          onWalk(data.id, data.x, data.y);
        }
            // this.received(data);
      }
    });
    // App.room.perform('speak', {message: 'aaaaaaa'});
    console.log('Network');
    this.onSpeak = onSpeak;
    this.onWalk = onWalk;
  }

  // received(receivedData) {
  //   let data = receivedData['message'];
  //   if (data.type == 'speak') {
  //     this.onSpeak(data.id, data.message);
  //   } else if (data.type == 'walk') {
  //     this.onWalk(data.id, data.x, data.y);
  //   }
  // }

  speak(message) {
    console.log('send: speak');
    App.room.perform('speak', {message: {type: 'speak', id: 1234, message: message}});
  }

  walk(x, y) {
    console.log('send: walk');
    App.room.perform('speak', {message: {type: 'walk', id: 1234, x: x, y: y}});
  }
}