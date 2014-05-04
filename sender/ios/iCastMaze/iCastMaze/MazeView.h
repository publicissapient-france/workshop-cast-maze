//
//  MazeView.h
//  iCastMaze
//
//  Created by JC on 5/3/14.
//  Copyright (c) 2014 xebia. All rights reserved.
//

#import <UIKit/UIKit.h>

@class MazeView;

@protocol MazeViewDelegate <NSObject>

- (void)mazeView:(MazeView *)view selectedMove:(MazeMove)movment;

@end

@interface MazeView : UIView

@property(nonatomic, weak)id<MazeViewDelegate>  delegate;

@end
