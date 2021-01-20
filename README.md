Booking App
============

Müşteri ve işletme şeklinde iki farklı rolün olduğu mobil uygulmadır. Belli sayfalara müşteriler dışındaki belli sayfalara da işletmeler dışındaki üyelere giremiyor ve bunun kontrolü CustomerGuard ve [BussinessGuard](https://github.com/celilkurt/booking-app/blob/main/src/app/route-guard/bussiness.guard.ts) class'larından sağlanıyor. Backend tarafında Firebase Authentication, Firestore ve Firebase Storage kullanıldı.

Müşteri rolüne sahip bir üye aşağıdaki işlemleri yapılabilir:
  * Randevu oluşturabilir.
  
  ![Randevu oluşturabilir](https://github.com/celilkurt/booking-app/blob/main/image/make-appointment.png?raw=true)
  * Randevularını silebilir.
  * Randevularını düzenleyebilir.
  
  ![Randevularını düzenleyebilir](https://github.com/celilkurt/booking-app/blob/main/image/edit-appointment.png?raw=true)
* Randevularını görüntüleyebilir.

![Randevularını görüntüleyebilir](https://github.com/celilkurt/booking-app/blob/main/image/appointment-list.png?raw=true)

İşletme rolündeki kullanıcı email, şifre ve rol ile kayıt yapması kullanıcıların bu işletmeden 
randevu alabilmeleri için yeterli değildir. Bu işleme ek olarak 'profile' sayfasından adres, tip 
ve işletme ismini girmeleri gerekmektedir.

Randevu oluşturma

![Randevularını görüntüleyebilir](https://github.com/celilkurt/booking-app/blob/main/image/registration.png?raw=true)

Profil sayfası. İşletmenin randevuya açılması için ek bilgileri tanımlaması gerekmektedir.

![Randevularını görüntüleyebilir](https://github.com/celilkurt/booking-app/blob/main/image/bussiness-profile.png?raw=true)


Firebase Ekran görüntüleri:

Firestore: users collection'ınında rolleri ile birlikte üyelik bilgileri bulunuyor, bussiness collection'ınında da işletmelere özel bilgiler (İşletme ismi, adres, işletme tipi) tutuluyor.

![Firestore](https://github.com/celilkurt/booking-app/blob/main/image/firestore.png?raw=true)

Firebase Realtime Database: Randevu bilgileri tutuluyor.

![Firestore](https://github.com/celilkurt/booking-app/blob/main/image/fire-real-db.png?raw=true)

Firebase Authentication: Üyelik oluşturma ve üyelik açma işlemlerinden sorumlu ve uid, email ve password bilgilerini saklıyor.

![Firestore](https://github.com/celilkurt/booking-app/blob/main/image/fire-auth.png?raw=true)
