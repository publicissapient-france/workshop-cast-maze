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

@interface MazeViewController ()<UIActionSheetDelegate>
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

   [self.deviceScanner startScan];
   [self reloadNavbar];
}

#pragma mark - Cast delegates

- (void)deviceDidComeOnline:(GCKDevice *)device {
   NSLog(@"Device <%@> found", device.friendlyName);

   [self reloadNavbar];
}

- (void)deviceDidGoOffline:(GCKDevice *)device {
   [self reloadNavbar];
}

- (void)deviceManagerDidConnect:(GCKDeviceManager *)deviceManager {
   NSLog(@"Connected to device!");

   [self.deviceManager launchApplication:APP_ID];
   [self reloadNavbar];
}

- (void)deviceManager:(GCKDeviceManager *)deviceManager
didConnectToCastApplication:(GCKApplicationMetadata *)applicationMetadata
            sessionID:(NSString *)sessionID
  launchedApplication:(BOOL)launchedApp {
   NSLog(@"Joined <%@>. Enjoy!", applicationMetadata.applicationName);

   self.mazeChannel = [MazeChannel new];

   [self.deviceManager addChannel:self.mazeChannel];
}

- (void)deviceManager:(GCKDeviceManager *)deviceManager didDisconnectWithError:(NSError *)error {
   [self reloadNavbar];
   self.deviceManager = nil;
}

- (void)deviceManager:(GCKDeviceManager *)deviceManager didFailToConnectWithError:(NSError *)error {
   [self reloadNavbar];
   self.deviceManager = nil;
}

#pragma mark - View

- (void)mazeView:(MazeView *)view selectedMove:(MazeMove)movment {
   [self.mazeChannel move:movment];
}

- (void)reloadNavbar {
   self.castBtn.hidden = (self.deviceScanner.devices.count == 0);
   self.castBtn.selected = self.deviceManager.isConnected;
}

#pragma mark - ActionSheet delegate

- (void)actionSheet:(UIActionSheet *)actionSheet clickedButtonAtIndex:(NSInteger)buttonIndex {
   if (!self.deviceManager.device) {
      if (buttonIndex < self.deviceScanner.devices.count)
         [self onConnectToCastDevice:self.deviceScanner.devices[buttonIndex]];
   }
   else {
      if (buttonIndex == 0)
         [self onDisconnectToDevice];
   }
}

#pragma mark - Listener

- (IBAction)onCast:(id)sender {
   if (!self.deviceManager.device)
      [self onChooseCastDevice:sender];
   else
      [self onShowSelectedDevice:sender];
}

- (void)onChooseCastDevice:(UIButton *)sender {
   UIActionSheet *devicesSheet = [[UIActionSheet alloc] initWithTitle:@"Choose your device"
                                                             delegate:self
                                                    cancelButtonTitle:nil
                                               destructiveButtonTitle:nil
                                                    otherButtonTitles:nil];


   for (GCKDevice *device in self.deviceScanner.devices) {
      [devicesSheet addButtonWithTitle:device.friendlyName];
   }

   // Add Cancel button at the very end
   [devicesSheet addButtonWithTitle:@"Cancel"];
   devicesSheet.cancelButtonIndex = devicesSheet.numberOfButtons - 1;

   [devicesSheet showInView:self.view];
}

- (void)onShowSelectedDevice:(id)sender {
   UIActionSheet *sheet = [[UIActionSheet alloc] initWithTitle:self.deviceManager.device.friendlyName
                                                             delegate:self
                                                    cancelButtonTitle:nil
                                               destructiveButtonTitle:nil
                                                    otherButtonTitles:nil];

   [sheet addButtonWithTitle:@"Disconnect"];
   sheet.destructiveButtonIndex = 0;

   [sheet addButtonWithTitle:@"Cancel"];
   sheet.cancelButtonIndex = 1;

   [sheet showInView:self.view];
}

- (void)onConnectToCastDevice:(GCKDevice *)device {
   NSBundle *bundle = [NSBundle mainBundle];

   self.deviceManager = [[GCKDeviceManager alloc]  initWithDevice:device
                                                clientPackageName:bundle.bundleIdentifier];

   self.deviceManager.delegate = self;

   [self.deviceManager connect];
}

- (void)onDisconnectToDevice {
   [self.deviceManager leaveApplication];
   [self.deviceManager disconnect];
}

@end
