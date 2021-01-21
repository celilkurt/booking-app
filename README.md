Booking App
============

Müşteri ve işletme şeklinde iki farklı rolün olduğu mobil uygulmadır. Belli sayfalara müşteriler dışındaki belli sayfalara da işletmeler dışındaki üyelere giremiyor ve bunun kontrolü CustomerGuard ve [BussinessGuard](https://github.com/celilkurt/booking-app/blob/main/src/app/route-guard/bussiness.guard.ts) class'larından sağlanıyor. Backend tarafında Firebase Authentication, Firestore ve Firebase Storage kullanıldı.

Bir kullanıcının kayıt, giriş ve ana sayfa dışındaki herhangi bir sayfaya ulaşabilmesi için giriş yapması gerekmektedir.

### Login

![Giriş sayfası](https://github.com/celilkurt/booking-app/blob/main/image/login.png?raw=true)



Müşteri rolüne sahip bir üye aşağıdaki işlemleri yapılabilir:
  * Randevu oluşturabilir.
  * Randevularını silebilir.
  * Randevularını düzenleyebilir.
  * Randevularını görüntüleyebilir.
  
  ### Randevu oluşturma 
  Randevu oluşturma sayfasına ulaşmak için kullanılacak buton eğer 'customer' rolüne sahipseniz görünüyor ve sayfanın controller'ı [make-appointment.page.ts](https://github.com/celilkurt/booking-app/blob/main/src/app/make-appointment/make-appointment.page.ts) dır. 'custormer' rolüne sahip olmayan birinin erişimini engellemek için [CustomerGuard](https://github.com/celilkurt/booking-app/blob/main/src/app/route-guard/customer.guard.ts) kullanılıyor.
  
   ```typescript
   {
    path: 'make-appointment/:name',
    loadChildren: () => import('./make-appointment/make-appointment.module').then( m => m.MakeAppointmentPageModule),
    canActivate: [CustomerGuard]
  }
   ```


  ![Randevu oluşturabilir](https://github.com/celilkurt/booking-app/blob/main/image/make-appointment.png?raw=true)
  
  
  
  
  
  
 ### Randevu düzenleme
 İlgili sayfaya randevu listesinde her bir randevunın karşısında oluşan düzenle butonu ile ulaşılabilir. class'ın constructor'ında düzenlenmek istenen randevu bilgileri çekiliyor ve düzenlenmek üzere form'a yerleştiriliyor.
  
  ```
    this.aptService.getBooking(this.id).valueChanges().subscribe(res => {
      this.updateBookingForm.setValue(res);
    });
  ```
  
 
  
  ![edit-appointment](https://github.com/celilkurt/booking-app/blob/main/image/edit-appointment.png?raw=true)
  
  
  
  

### Randevu listeleme
Randevu listesi sayfasında giriş yapmış olan kullanıcının randevuları listeleniyor.


![appointment-list](https://github.com/celilkurt/booking-app/blob/main/image/appointment-list.png?raw=true)




### Kayıt işlemi
İşletme rolündeki kullanıcı email, şifre ve rol ile kayıt yapması kullanıcıların bu işletmeden 
randevu alabilmeleri için yeterli değildir. Bu işleme ek olarak 'profile' sayfasından adres, tip 
ve işletme ismini girmeleri gerekmektedir. 

![Randevularını görüntüleyebilir](https://github.com/celilkurt/booking-app/blob/main/image/registration.png?raw=true)


### İşletme Profili Sayfası

Profil sayfası. İşletmenin randevuya açılması için ek bilgileri tanımlaması gerekmektedir.

![Randevularını görüntüleyebilir](https://github.com/celilkurt/booking-app/blob/main/image/bussiness-profile.png?raw=true)






### Firebase Ekran görüntüleri

#### Firestore
users collection'ınında rolleri ile birlikte üyelik bilgileri bulunuyor, bussiness collection'ınında da işletmelere özel bilgiler (İşletme ismi, adres, işletme tipi) tutuluyor.

![Firestore](https://github.com/celilkurt/booking-app/blob/main/image/firestore.png?raw=true)





#### Firebase Realtime Database
Randevu bilgileri tutuluyor.

![firebase-realtime-database](https://github.com/celilkurt/booking-app/blob/main/image/fire-real-db.png?raw=true)




#### Firebase Authentication
Üyelik oluşturma ve üyelik açma işlemlerinden sorumlu ve uid, email ve password bilgilerini saklıyor.

![firebasu-authentication](https://github.com/celilkurt/booking-app/blob/main/image/fire-auth.png?raw=true)
