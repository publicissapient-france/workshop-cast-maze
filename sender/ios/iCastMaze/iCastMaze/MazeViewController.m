//
//  MazeViewController.m
//  iCastMaze
//
//  Created by JC on 5/3/14.
//  Copyright (c) 2014 xebia. All rights reserved.
//

#import "MazeViewController.h"

#import "MazeChannel.h"
#import "DeviceViewController.h"

#define APP_ID @"8D7FEAA1"

@interface MazeViewController ()
@property(nonatomic, strong)GCKDeviceScanner       *deviceScanner;
@property(nonatomic, strong)GCKDeviceManager       *deviceManager;
@property(nonatomic, strong)MazeChannel            *mazeChannel;

@property(nonatomic, strong)IBOutlet UIButton      *castBtn;

@end

@implementation MazeViewController

- (id)initWithCoder:(NSCoder *)aDecoder {
   if (!(self = [super initWithCoder:aDecoder]))
      return nil;

   self.deviceScanner = [[GCKDeviceScanner alloc] init];

   [self.deviceScanner addListener:self];

   return self;
}

- (void)viewDidLoad {
   self.view.delegate = self;
   self.castBtn.hidden = YES;

   [self.deviceScanner startScan];
}

#pragma mark - Cast delegates

- (void)deviceDidComeOnline:(GCKDevice *)device {
   NSLog(@"Device <%@> found", device.friendlyName);

   self.castBtn.hidden = NO;
}

- (void)deviceDidGoOffline:(GCKDevice *)device {
   self.castBtn.hidden = (self.deviceScanner.devices.count == 0);
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

#pragma mark - View delegate

- (void)mazeView:(MazeView *)view selectedMove:(MazeMove)movment {
   [self.mazeChannel move:movment];
}

#pragma mark - Listener

- (IBAction)onChooseCastDevice:(UIButton *)sender {
   DeviceViewController *controller = [DeviceViewController new];
   UINavigationController *nav = [[UINavigationController alloc] initWithRootViewController:controller];

   controller.devices = self.deviceScanner.devices;

   [self presentViewController:nav animated:YES completion:nil];
}

- (void)onConnectToCastDevice:(NSNotification *)notification {
   GCKDevice *device = notification.userInfo[@"device"];
   NSBundle *bundle = [NSBundle mainBundle];

   self.deviceManager = [[GCKDeviceManager alloc]  initWithDevice:device
                                                clientPackageName:bundle.bundleIdentifier];

   self.deviceManager.delegate = self;

   [self.deviceManager connect];
   [self dismissViewControllerAnimated:YES completion:nil];
}

@end
