//
//  DeviceViewCell.m
//  iCastMaze
//
//  Created by JC on 5/4/14.
//  Copyright (c) 2014 xebia. All rights reserved.
//

#import "DeviceViewCell.h"

@interface DeviceViewCell ()
@property(nonatomic, strong)IBOutlet UILabel *deviceName;
@property(nonatomic, strong)IBOutlet UILabel *deviceState;
@end

@implementation DeviceViewCell

- (void)setDevice:(GCKDevice *)device {
   if (device == _device)
      return;

   _device = device;
   [self reload];
}

- (void)reload {

}

@end
