class Intro extends Phaser.Scene {
  constructor() {
    super('Intro');
  }

  preload()
  {
    this.load.setPath('./images/');

    this.load.image('botBg', 'bot-bg.png');
    this.load.image('botLeft', 'bot-left.png');
    this.load.image('botRight', 'bot-right.png');
    this.load.image('intro', 'intro.png');
    this.load.image('left', 'left.png');
    this.load.image('right', 'right.png');
    this.load.image('topBg', 'top-bg.png');
    this.load.image('topLeft', 'top-left.png');
    this.load.image('topRight', 'top-right.png');
    this.load.image('win95', 'win95.png');

    this.load.spritesheet('digits', 'digits.png', { frameWidth: 13, frameHeight: 23, endFrame: 9 });
    this.load.spritesheet('buttons', 'digits.png', { frameWidth: 26, frameHeight: 26, startFrame: 5 });
    // startFrame, endFrame은 해당 key에서 지정한 frameWidth, frameHeight를 반영하여 계산되는 듯 하다.
    this.load.spritesheet('tiles', 'tiles.png', { frameWidth: 16, frameHeight: 16 });
  }

  create()
  {
    this.input.mouse.disableContextMenu(); // 오른쪽 마우스 메뉴 안뜨게

    this.highlight = this.add.rectangle(0, 334, 800, 70, 0x0182fb).setOrigin(0).setAlpha(0.75);

    this.intro = this.add.image(0, 0, 'intro').setOrigin(0);


    const zone1 = this.add.zone(0, 334, 800, 70).setOrigin(0).setInteractive({ cursor: 'pointer' });
    const zone2 = this.add.zone(0, 409, 800, 70).setOrigin(0).setInteractive({ cursor: 'pointer' });
    const zone3 = this.add.zone(0, 484, 800, 70).setOrigin(0).setInteractive({ cursor: 'pointer' });

    zone1.on('pointerover', () => {
      this.highlight.y = zone1.y;
    });
    zone2.on('pointerover', () => {
      this.highlight.y = zone2.y;
    });
    zone3.on('pointerover', () => {
      this.highlight.y = zone3.y;
    });

    zone1.on('pointerdown', () => {
      this.startGame(9, 9, 10);
    });
    zone2.on('pointerdown', () => {
      this.startGame(16, 16, 40);
    });
    zone3.on('pointerdown', () => {
      this.startGame(30, 16, 99);
    });
  }

  startGame(width, height, bombs) {
    this.scene.start('MineSweeper', { width, height, bombs });
  }
}