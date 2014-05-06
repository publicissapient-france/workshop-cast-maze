//
//  MazeChannel.m
//  iCastMaze
//
//  Created by JC on 5/4/14.
//  Copyright (c) 2014 xebia. All rights reserved.
//

#import "MazeChannel.h"
#import "MazePlayer.h"
#import "UIColor+Hex.h"

#define MAZE_NAMESPACE @"urn:x-cast:fr.xebia.workshop.cast.maze"

@interface MazeChannel ()
@property(nonatomic, strong)MazePlayer  *player;
@end

@implementation MazeChannel

- (id)initWithPlayer:(MazePlayer *)player {
   // @TODO
   // @FIXME use workshop namespace
   if (!(self = [super initWithNamespace:@""]))
        return nil;

    self.player = player;

    return self;
}

- (void)didReceiveTextMessage:(NSString *)message {
    NSDictionary *data = [GCKJSONUtils parseJSON:message];

   // @TODO update player color
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

   if (movmentMsg) {
      NSLog(@"Sending move %@", movmentMsg);
      [self sendTextMessage:movmentMsg];
   }
}

@end
