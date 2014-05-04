//
//  MazeChannel.h
//  iCastMaze
//
//  Created by JC on 5/4/14.
//  Copyright (c) 2014 xebia. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface MazeChannel : GCKCastChannel

- (id)initWithNamespace:(NSString *)protocolNamespace UNAVAILABLE_ATTRIBUTE;

- (void)move:(MazeMove)movment;

@end
