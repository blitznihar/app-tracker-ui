import { Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { TableDataSource, ValidatorService } from 'angular4-material-table';
import {MatSnackBar} from '@angular/material/snack-bar';
import { RemittanceValidatorService } from './remittance-validator.service';
import { Person } from './person';

import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';

@Component({
  selector: 'app-remittance-list',
  templateUrl: './remittance-list.component.html',
    providers: [
    {provide: ValidatorService, useClass: RemittanceValidatorService }
  ],
  styleUrls: ['./remittance-list.component.scss']
})
export class RemittanceListComponent implements OnInit {
 public showSelected = true;
  constructor(private personValidator: ValidatorService) { 
    this.showSelected = true;
    }
    ShowButton() {
        this.showSelected = true;
    }
    HideButton() {
        this.showSelected = false;
    }
  displayedColumns = ['policyno', 'name', 'employeeid', 'payment', 'actionsColumn'];

  @Input() personList = [ 
    { policyno: '123124', name: 'Mark Smith', employeeid: 'FG675', payment: 2500.54},
    { policyno: '123123', name: 'Brad Johnson', employeeid: 'MU546', payment: 3200.62 },
        { policyno: '123123', name: 'Oliver Williams', employeeid: 'PG645', payment: 3200.88 },
            { policyno: '123126', name: 'Harry Jones', employeeid: 'UN489', payment: 3200.16 },
                { policyno: '123128', name: 'Jack Davis', employeeid: 'RT345', payment: 3200.25 },
    ] ;
  @Output() personListChange = new EventEmitter<Person[]>();

  dataSource: TableDataSource<Person>;


  ngOnInit() {
    this.dataSource = new TableDataSource<any>(this.personList, Person, this.personValidator);

    this.dataSource.datasourceSubject.subscribe(personList => this.personListChange.emit(personList));
        WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });
  }
  getTotalCost() {
    return this.personList.map(t => t.payment).reduce((acc, value) => acc + value, 0);
  }

@Output()
  public pictureTaken = new EventEmitter<WebcamImage>();

  // toggle webcam on/off
  public showWebcam = false;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  public videoOptions: MediaTrackConstraints = {
    // width: {ideal: 1024},
    // height: {ideal: 576}
  };
  public errors: WebcamInitError[] = [];

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();

  // public ngOnInit(): void {
  //   WebcamUtil.getAvailableVideoInputs()
  //     .then((mediaDevices: MediaDeviceInfo[]) => {
  //       this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
  //     });
  // }

  public triggerSnapshot(): void {
    this.trigger.next();
    this.showWebcam = false;
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public showNextWebcam(directionOrDeviceId: boolean|string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
    this.pictureTaken.emit(webcamImage);

  }

  public cameraWasSwitched(deviceId: string): void {
    console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean|string> {
    return this.nextWebcam.asObservable();
  }

public webcamImage: WebcamImage = null;



}