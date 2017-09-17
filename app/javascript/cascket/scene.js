import { SutachooAnime, BigsightAnime, TengokuAnime, FlowerAnime, StoryAnime } from 'anime';
import Map from './map';
import MySuta from './my_suta';
import { Network } from 'lib';
import SutaWait from './suta_wait';
import PlayerSuta from './player_suta';

export default class CascketScene extends enchant.Scene {
  constructor() {
    super();

    let map = new Map();
    this.addChild(map);

    let players = {};

    this.id = Date.now();
    let network = new Network(this.id, (id, message) => {
      console.log('speak:' + message);
    }, (id, x, y) => {
      if (this.id == id) { return; }
      if (players[id] == undefined) {
        players[id] = new PlayerSuta();
        players[id].x = 750;
        players[id].y = 550;
        map.addChild(players[id]);
      }
      let player = players[id];

      let diffX = player.x - x;
      let diffY = (player.y - y) * 1.5;
      let diff = Math.sqrt(diffX * diffX + diffY * diffY);
      let time = Math.abs(diff)/2;
      player.clear();
      for (let i = 0; i < (time/43) - 1; i++) {
        player.walking();
      }

      console.log('walk:' + x + ", " + y);
      player.tl.tween({x: x, y: y - 130, time: time});
    });

    let suta = new MySuta();
    suta.x = 400;
    suta.y = 400;
    this.addChild(suta);

    // this.netSuta = new SutaWait();
    // map.addChild(this.netSuta);
    // this.netSuta.x = 10;
    // this.netSuta.y = 10;

    this.addEventListener('enterframe', () => {
      if (enchant.Core.instance.input.a) {
        suta.oxox();
      } else if (enchant.Core.instance.input.b) {
        suta.jakajan();
      }
    });

    map.addEventListener('touchstart', (e) => {
      console.log(e.localX + "," + e.localY);

      if (suta.isMoving()) { return; }

      network.walk(e.localX, e.localY);
      
      let diffX = map.x - (400 - e.localX);
      let diffY = (map.y - (540 - e.localY)) * 1.5;
      let diff = Math.sqrt(diffX * diffX + diffY * diffY);

      let time = Math.abs(diff)/2;
      suta.clear();
      for (let i = 0; i < (time/43) - 1; i++) {
        suta.walking();
      }

      map.tl
        .clear()
        .tween({x: 400 - e.localX, time: diff/3})
        .and()
        .tween({y: 540 - e.localY, time: diff/3});
    });
  }

  // onWalk(id, x, y) {
  //   console.log("id:" + id + " x:" + x + " y:" + y);
  //   // this.netSuta.x = x;
  //   // this.netSuta.y = y;
  //   // this.netSuta.tl.tween({x: x, y: y, time: 100});
  //   let netSuta = new SutaWait();
  //   map.addChild(netSuta);
  //   netSuta.x = x;
  //   netSuta.y = y;
  // }

  // onSpeak(id, message) {
  //   console.log("id:" + id + " message:" + message);
  // }
}
