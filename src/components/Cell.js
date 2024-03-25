class Cell {
  constructor(grid, index, x, y)
  {
    this.grid = grid;

    this.index = index; // 셀의 고유 인덱스
    this.x = x;
    this.y = y;

    this.open = false; // 사용자가 해당 셀을 클릭했는지
    this.bomb = false; // 셀에 지뢰가 있는지

    this.flagged = false; // 사용자가 셀에 깃발을 표시했는지 (오른쪽 마우스 한 번)
    this.query = false; // 사용자가 셀에 질문 표시를 했는지 (오른쪽 마우스 두 번)
    this.exploded = false; // 지뢰가 있는 셀을 열었을 때 폭발했는지 (사용자가 클릭하지 않으면 지뢰가 있어도 터지지는 않음)

    /**
     * 0 = empty,
     * 1 ~ 8 = number of adjacent bombs
     */
    this.value = 0; // 셀 주변의 지뢰 수

    this.tile = grid.scene.make.image({ // make.image: 특정 키와 프레임을 가진 이미지 객체 생성
      key: 'tiles',
      frame: 0,
      x: grid.offset.x + x * 16,
      y: grid.offset.y + y * 16,
      origin: 0
    }); 

    grid.board.add(this.tile);

    this.tile.setInteractive();
    this.tile.on('pointerdown', this.onPointerDown, this);
    this.tile.on('pointerup', this.onPointerUp, this);
  }

  reset()
  {
    this.open = false;
    this.bomb = false;

    this.flagged = false;
    this.query = false;
    this.exploded = false;

    this.value = 0;

    this.tile.setFrame(0);
  }

  onPointerDown(pointer)
  {
    if(!this.grid.populated) {
      this.grid.generate(this.index);
    }

    if(this.open || !this.grid.playing) return;

    if(pointer.rightButtonDown()) {
      if(this.query)
      {
        this.query = false;
        this.tile.setFrame(0);
      }
      else if(this.flagged)
      {
        this.flagged = false;
        this.query = true;
        this.tile.setFrame(3);
        this.grid.updateBombs(-1);
      }
      else if(!this.flagged)
      {
        this.flagged = true;
        this.tile.setFrame(2);
        this.grid.updateBombs(1);
        this.grid.checkWinState();
      }
    } else if(!this.flagged && !this.query) {
      this.onClick();
    }
  }

  onClick()
  {
    if(this.bomb) {
      this.exploded = true;

      this.grid.gameOver();
    } else {
      if(this.value === 0) {
        this.grid.floodFill(this.x, this.y);
      } else {
        this.show();
      }

      this.grid.button.setFrame(2);
      this.grid.checkWinState();
    }
  }

  onPointerUp()
  {
    if(this.grid.button.frame.name === 2) {
      this.grid.button.setFrame(0);
    }
  }

  reveal() // 결과 공개
  {
    if(this.exploded) // 눌러서 터졌을 때
    {
      this.tile.setFrame(6);
    }
    else if(!this.bomb && (this.flagged || this.query)) // 지뢰가 아닌데 지뢰/? 표시했을 때
    {
      this.tile.setFrame(7);
    }
    else if(this.bomb) // 지뢰일 때
    {
      this.tile.setFrame(5);
    }
    else // 정답 공개
    {
      this.show();
    }
  }

  show() 
  {
    const values = [ 1, 8, 9, 10, 11, 12, 13, 14, 15 ];

    this.tile.setFrame(values[this.value]);

    this.open = true;
  }

  debug()
  {
    const values = [ '⬜️', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣' ];

    if(this.bomb) {
      return '💣';
    } else {
      return values[this.value];
    }
  }
}