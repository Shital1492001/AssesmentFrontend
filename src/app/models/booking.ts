export class Booking {
        constructor(
            public _id='',
            public userId='',
            public slotId='',
            public vehicleType="" ,
            public timeFrom=new Date(),
            public timeTo=new Date(),
            public totalAmount= 0,
            public paymentStatus=''
              ){}
     
}
