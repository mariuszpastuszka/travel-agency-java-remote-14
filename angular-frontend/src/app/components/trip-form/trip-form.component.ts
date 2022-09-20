import {Component, OnInit} from '@angular/core';
import {TripService} from "../../services/trip-service/trip-service.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {tripsUrl} from "../../models/urls";
import {TripDto} from "../../models/trips";

@Component({
  selector: 'app-trip-form',
  templateUrl: './trip-form.component.html',
  styleUrls: ['./trip-form.component.css']
})
export class TripFormComponent implements OnInit {

  transportTypes = [
    'BUS',
    'TRAIN',
    'PLANE',
    'FERRY']

  paymentTypes = [
    'CASH',
    'CARD',
    'TRANSFER',
    'APPLE_PAY',
    'GOOGLE_PAY',
    'PAYPAL',
    'INSTALLMENT_PAYMENT'
  ]

  mealTypes = [
    'BREAKFAST',
    'LUNCH',
    'DINNER',
    'SNACKS',
    'DRINKS',
    'HB',
    'ALL_INCLUSIVE'
  ]
  tripForm = new FormGroup({
    tripStartDate: new FormControl(''),
    tripEndDate: new FormControl(''),
    destination: new FormGroup({
      country: new FormControl(''),
      city: new FormControl(''),
      hotelName: new FormControl('')
    }),
    cost: new FormControl(0),
    currency: new FormControl(''),
    typeOfTransport: new FormControl(''),
    paymentType: new FormControl(''),
    mealType: new FormControl(''),
    securityRules: new FormGroup({
      travelRestrictions: new FormControl(''),
      insurance: new FormControl('')
    })
  })

  onSubmitData() {
    const trip = this.createTripDto()
    console.log("form value: " + JSON.stringify(this.tripForm.value, null, 2))
    console.log("sending data: " + JSON.stringify(trip))
    this.tripService.createNewTrip(trip)
      .subscribe(
        () => this.router.navigate([tripsUrl])
      )
  }

  constructor(
    private router: Router,
    private tripService: TripService) {
  }

  ngOnInit(): void {
  }

  private createTripDto(): TripDto {
    return {
      tripStartDate: this.tripForm.value.tripStartDate || '',
      tripEndDate: this.tripForm.value.tripEndDate || '',
      destination: {
        country: this.tripForm.value.destination?.country || '',
        city: this.tripForm.value.destination?.city || '',
        hotelName: this.tripForm.value.destination?.hotelName || '',
      },
      cost: this.tripForm.value.cost || 0,
      currency: this.tripForm.value.currency || '',
      typeOfTransport: this.tripForm.value.typeOfTransport || '',
      securityRules: {
        insurance: this.tripForm.value.securityRules?.insurance || '',
        travelRestrictions: this.tripForm.value.securityRules?.travelRestrictions || ''
      },
      paymentType: this.tripForm.value.paymentType || '',
      mealType: this.tripForm.value.mealType || '',
      hotelFacilities: {
        apartmentFacilities: [],
        attractions: []
      },
      photos: []
    }
  }
}
