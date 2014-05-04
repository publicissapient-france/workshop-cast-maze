//
//  MazeViewController.m
//  iCastMaze
//
//  Created by JC on 5/3/14.
//  Copyright (c) 2014 xebia. All rights reserved.
//

#import "MazeViewController.h"

#import "MazeChannel.h"

#define APP_ID @"8D7FEAA1"

@interface MazeViewController ()
@property(nonatomic, strong)GCKDeviceScanner       *deviceScanner;
@property(nonatomic, strong)GCKDeviceManager       *deviceManager;
@property(nonatomic, strong)MazeChannel            *mazeChannel;

@end

@implementation MazeViewController

- (id)initWithCoder:(NSCoder *)aDecoder {
   if (!(self = [super initWithCoder:aDecoder]))
      return nil;

   self.deviceScanner = [[GCKDeviceScanner alloc] init];

   [self.deviceScanner addListener:self];
   [self.deviceScanner startScan];

   return self;
}

- (void)viewDidLoad {
   self.view.delegate = self;
}

- (void)deviceDidComeOnline:(GCKDevice *)device {
   NSBundle *bundle = [NSBundle mainBundle];
   NSLog(@"Device <%@> found", device.friendlyName);
   self.deviceManager = [[GCKDeviceManager alloc]  initWithDevice:device
                                                clientPackageName:bundle.bundleIdentifier];

   self.deviceManager.delegate = self;

   [self.deviceManager connect];
}

- (void)deviceManagerDidConnect:(GCKDeviceManager *)deviceManager {
   NSLog(@"Connected to device!");

   [self.deviceManager launchApplication:APP_ID];
}

- (void)deviceManager:(GCKDeviceManager *)deviceManager
didConnectToCastApplication:(GCKApplicationMetadata *)applicationMetadata
            sessionID:(NSString *)sessionID
  launchedApplication:(BOOL)launchedApp {
   NSLog(@"Joined <%@>. Enjoy!", applicationMetadata.applicationName);

   self.mazeChannel = [MazeChannel new];

   [self.deviceManager addChannel:self.mazeChannel];
}

- (void)mazeView:(MazeView *)view selectedMove:(MazeMove)movment {
   [self.mazeChannel move:movment];
}

@end
