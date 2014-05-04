//
//  DeviceViewController.m
//  iCastMaze
//
//  Created by JC on 5/4/14.
//  Copyright (c) 2014 xebia. All rights reserved.
//

#import "DeviceViewController.h"

#import "DeviceViewCell.h"

#define DEVICE_CELL_ID  @"deviceId"

@interface DeviceViewController ()

@end

@implementation DeviceViewController

- (void)viewDidLoad
{
    [super viewDidLoad];

   self.edgesForExtendedLayout = UIRectEdgeNone;
   self.title = @"Choose your device";

   [self.tableView registerNib:[UINib nibWithNibName:@"DeviceViewCell" bundle:nil] forCellReuseIdentifier:DEVICE_CELL_ID];
 
    // Uncomment the following line to display an Edit button in the navigation bar for this view controller.
    // self.navigationItem.rightBarButtonItem = self.editButtonItem;
}

#pragma mark - Table view data source

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView
{
    return 1;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section
{
    // Return the number of rows in the section.
    return self.devices.count;
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    DeviceViewCell *cell = [tableView dequeueReusableCellWithIdentifier:DEVICE_CELL_ID forIndexPath:indexPath];

   //   if (!cell)
   //   cell = [[UITableViewCell alloc] initWithStyle:UITableViewCellStyleSubtitle reuseIdentifier:DEVICE_CELL_ID];
    
   cell.device = self.devices[indexPath.row];

    return cell;
}

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath {
   GCKDevice *device = self.devices[indexPath.row];
}

- (CGFloat)tableView:(UITableView *)tableView heightForFooterInSection:(NSInteger)section {
   // This will avoid extra separators to fill empty space
   return 0.01f;
}

@end
