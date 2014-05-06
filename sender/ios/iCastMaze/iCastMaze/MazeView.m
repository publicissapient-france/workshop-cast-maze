//
//  MazeView.m
//  iCastMaze
//
//  Created by JC on 5/3/14.
//  Copyright (c) 2014 xebia. All rights reserved.
//

#import "MazeView.h"

@interface MazeView ()
@property(nonatomic, strong)IBOutlet UIButton   *upBtn;
@property(nonatomic, strong)IBOutlet UIButton   *downBtn;
@property(nonatomic, strong)IBOutlet UIButton   *leftBtn;
@property(nonatomic, strong)IBOutlet UIButton   *rightBtn;
@end

@implementation MazeView

- (void)awakeFromNib {
   // For TP only
   // You should do custom classes in that case
   self.upBtn.tag = MazeMoveUp;
   self.downBtn.tag = MazeMoveDown;
   self.leftBtn.tag = MazeMoveLeft;
   self.rightBtn.tag = MazeMoveRight;
}

- (IBAction)onPadTouched:(UIButton *)sender {
   [self.delegate mazeView:self selectedMove:sender.tag];
}

@end
