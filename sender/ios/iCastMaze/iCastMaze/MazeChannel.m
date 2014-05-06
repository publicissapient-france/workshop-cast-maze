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
    if (!(self = [super initWithNamespace:MAZE_NAMESPACE]))
        return nil;

    self.player = player;

    return self;
}

- (void)didReceiveTextMessage:(NSString *)message {
    NSDictionary *data = [GCKJSONUtils parseJSON:message];

    if (data[@"color"])
        self.player.color = [UIColor colorFromHexString:data[@"color"]];
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
