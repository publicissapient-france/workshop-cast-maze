//
//  MazeChannel.m
//  iCastMaze
//
//  Created by JC on 5/4/14.
//  Copyright (c) 2014 xebia. All rights reserved.
//

#import "MazeChannel.h"

#define MAZE_NAMESPACE @"urn:x-cast:fr.xebia.workshop.cast.maze"

@implementation MazeChannel

- (id)init {
   if (!(self = [super initWithNamespace:MAZE_NAMESPACE]))
      return nil;

   return self;
}

- (void)move:(MazeMove)movment {
   NSString *movmentMsg = nil;

   switch (movment) {
      case MazeMoveDown:
         movmentMsg = @"down";
         break;

      case MazeMoveUp:
         movmentMsg = @"up";
         break;

      case MazeMoveLeft:
         movmentMsg = @"left";
         break;

      case MazeMoveRight:
         movmentMsg = @"right";
         break;

      default:
         break;
   }

   if (movmentMsg)
      [self sendTextMessage:movmentMsg];
}

@end
