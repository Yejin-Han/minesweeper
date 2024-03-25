class MineSweeper extends Phaser.Scene {
  constructor() {
    super('MineSweeper');
  }

  init(data)
  {
    this.width = data.width;
    this.height = data.height;
    this.bombs = data.bombs;
  }

  create()
  {
    this.add.image(0, 0, 'win95').setOrigin(0);

    this.grid = new Grid(this, this.width, this.height, this.bombs);
  }
}